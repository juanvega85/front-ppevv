import { vi } from 'vitest';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getSitesHydrated, sitesMock } from '@ppe/sites';
import { mockedDataSource } from '../data/sources/mocked';
import { renderForTesting } from '../utils/renderForTesting';
import { ScheduleForm } from './ScheduleForm';
import { profilesMock } from '@ppe/profiles';

const site = getSitesHydrated(sitesMock.data)[0];
const userFullName = 'John Doe';

vi.mock('@ppe/sites', async () => {
  const modules = await vi.importActual<typeof import('@ppe/sites')>('@ppe/sites');
  return {
    ...modules,
    SiteMap: () => <div>{`${site.coordinates.lat}, ${site.coordinates.lng}`}</div>,
  };
});

describe('ScheduleForm', () => {
  it('should render form', async () => {
    renderForTesting(<ScheduleForm dataSource={mockedDataSource} site={site} userFullName={userFullName} />);

    screen.getAllByText('Profiles');
    screen.getByText('Notes');
    screen.getByText('Results: 0');
    screen.getByText('Selected: 0');
    screen.getByText('Search');
    screen.getByText('Save');
    screen.getByLabelText('From');
    screen.getByLabelText('To');
    screen.getByLabelText('Day of the week');
    screen.getByLabelText('Shift');
    screen.getAllByLabelText('Profiles');
    screen.getByLabelText('Filter');
    expect(screen.getByText('Search')).toHaveProperty('disabled', true);
    expect(screen.getByText('Save')).toHaveProperty('disabled', true);
    expect(screen.getByLabelText('Day of the week').getAttribute('aria-disabled')).toBeTruthy();
    expect(screen.getByLabelText('Shift').getAttribute('aria-disabled')).toBeTruthy();
    expect(screen.getAllByLabelText('Profiles')[1].getAttribute('aria-disabled')).toBeTruthy();
  });

  it('should render site coordinates', async () => {
    renderForTesting(<ScheduleForm dataSource={mockedDataSource} site={site} userFullName={userFullName} />);

    screen.getByText(`${site.coordinates.lat}, ${site.coordinates.lng}`);
  });

  it('should render userFullName in new note', async () => {
    renderForTesting(<ScheduleForm dataSource={mockedDataSource} site={site} userFullName={userFullName} />);

    userEvent.click(screen.getByText('Notes'));
    userEvent.type(screen.getByLabelText('New note'), 'My note');
    userEvent.click(screen.getByText('Add'));

    screen.getByText(userFullName);
  });

  it('should show error message when there are coincidences', async () => {
    renderForTesting(<ScheduleForm dataSource={mockedDataSource} site={site} userFullName={userFullName} />);

    await act(async () => await act(() => userEvent.type(screen.getByLabelText('From'), '2022-08-01')));
    await act(async () => await act(() => userEvent.type(screen.getByLabelText('To'), '2022-08-31')));

    expect(screen.getByLabelText('Day of the week').getAttribute('aria-disabled')).toBeFalsy();

    await act(async () => await act(() => userEvent.click(screen.getByLabelText('Day of the week'))));
    await act(async () => await act(() => userEvent.click(screen.getByRole('option', { name: 'Monday' }))));

    await act(async () => await act(() => userEvent.click(screen.getAllByLabelText('Shift')[0])));
    await act(async () => await act(() => userEvent.click(screen.getByRole('option', { name: '08:00' }))));

    screen.getByText('There are coincidences');
  });

  it('should show error when the To date is earlier than the From date', async () => {
    renderForTesting(<ScheduleForm dataSource={mockedDataSource} site={site} userFullName={userFullName} />);

    await act(async () => await act(() => userEvent.type(screen.getByLabelText('From'), '2022-08-01')));
    await act(async () => await act(() => userEvent.type(screen.getByLabelText('To'), '2022-07-31')));

    expect(screen.getByLabelText('To').closest('div')!.classList.contains('Mui-error')).toBeTruthy();
    expect(screen.getByLabelText('Day of the week').getAttribute('aria-disabled')).toBeTruthy();
    expect(screen.getAllByLabelText('Profiles')[1].getAttribute('aria-disabled')).toBeTruthy();
    expect(screen.getByText('Search')).toHaveProperty('disabled', true);
    expect(screen.getByText('Save')).toHaveProperty('disabled', true);
  });

  it('should search profiles with this preference', async () => {
    const getScheduleOverlapping = () => Promise.resolve({ data: { count: 0 } });
    const getProfilesByPreferences = () => Promise.resolve({ data: { ...profilesMock.data, profiles: profilesMock.data.profiles.slice(0, 1) } });
    renderForTesting(
      <ScheduleForm dataSource={{ ...mockedDataSource, getScheduleOverlapping, getProfilesByPreferences }} site={site} userFullName={userFullName} />
    );

    await act(async () => await act(() => userEvent.type(screen.getByLabelText('From'), '2023-02-01')));
    await act(async () => await act(() => userEvent.type(screen.getByLabelText('To'), '2023-02-28')));

    expect(screen.getByLabelText('Day of the week').getAttribute('aria-disabled')).toBeFalsy();

    await act(async () => await act(() => userEvent.click(screen.getByLabelText('Day of the week'))));
    await act(async () => await act(() => userEvent.click(screen.getByRole('option', { name: 'Monday' }))));

    await act(async () => await act(() => userEvent.click(screen.getAllByLabelText('Shift')[0])));
    await act(async () => await act(() => userEvent.click(screen.getByRole('option', { name: '08:00' }))));

    await act(async () => await act(() => userEvent.click(screen.getAllByLabelText('Profiles')[1])));
    await act(async () => await act(() => userEvent.click(screen.getByRole('option', { name: 'With this preference' }))));
    await act(async () => await act(() => userEvent.click(screen.getByText('Search'))));

    screen.getByText('Results: 1');
    screen.getByText('Selected: 0');
    screen.getByText('Paul Zoulin');
    screen.getByText('Team: Inglesa Viña del Mar');
  });

  it('should search all profiles', async () => {
    const getScheduleOverlapping = () => Promise.resolve({ data: { count: 0 } });
    const getProfiles = () => Promise.resolve({ data: { ...profilesMock.data, profiles: profilesMock.data.profiles.slice(0, 1) } });
    renderForTesting(
      <ScheduleForm dataSource={{ ...mockedDataSource, getScheduleOverlapping, getProfiles }} site={site} userFullName={userFullName} />
    );

    await act(async () => await act(() => userEvent.type(screen.getByLabelText('From'), '2023-02-01')));
    await act(async () => await act(() => userEvent.type(screen.getByLabelText('To'), '2023-02-28')));

    expect(screen.getByLabelText('Day of the week').getAttribute('aria-disabled')).toBeFalsy();

    await act(async () => await act(() => userEvent.click(screen.getByLabelText('Day of the week'))));
    await act(async () => await act(() => userEvent.click(screen.getByRole('option', { name: 'Monday' }))));

    await act(async () => await act(() => userEvent.click(screen.getAllByLabelText('Shift')[0])));
    await act(async () => await act(() => userEvent.click(screen.getByRole('option', { name: '08:00' }))));

    await act(async () => await act(() => userEvent.click(screen.getAllByLabelText('Profiles')[1])));
    await act(async () => await act(() => userEvent.click(screen.getByRole('option', { name: 'All' }))));
    await act(async () => await act(() => userEvent.click(screen.getByText('Search'))));

    screen.getByText('Results: 1');
    screen.getByText('Selected: 0');
    screen.getByText('Paul Zoulin');
    screen.getByText('Team: Inglesa Viña del Mar');
  });

  it('should filter profiles by name', async () => {
    const getScheduleOverlapping = () => Promise.resolve({ data: { count: 0 } });
    const getProfiles = () => Promise.resolve({ data: { ...profilesMock.data, profiles: profilesMock.data.profiles.slice(0, 3) } });
    renderForTesting(
      <ScheduleForm dataSource={{ ...mockedDataSource, getScheduleOverlapping, getProfiles }} site={site} userFullName={userFullName} />
    );

    await act(async () => await act(() => userEvent.type(screen.getByLabelText('From'), '2023-02-01')));
    await act(async () => await act(() => userEvent.type(screen.getByLabelText('To'), '2023-02-28')));

    expect(screen.getByLabelText('Day of the week').getAttribute('aria-disabled')).toBeFalsy();

    await act(async () => await act(() => userEvent.click(screen.getByLabelText('Day of the week'))));
    await act(async () => await act(() => userEvent.click(screen.getByRole('option', { name: 'Monday' }))));

    await act(async () => await act(() => userEvent.click(screen.getAllByLabelText('Shift')[0])));
    await act(async () => await act(() => userEvent.click(screen.getByRole('option', { name: '08:00' }))));

    await act(async () => await act(() => userEvent.click(screen.getAllByLabelText('Profiles')[1])));
    await act(async () => await act(() => userEvent.click(screen.getByRole('option', { name: 'All' }))));
    await act(async () => await act(() => userEvent.click(screen.getByText('Search'))));

    userEvent.type(screen.getByLabelText('Filter'), 'paul');

    const allProfiles = screen.getAllByTestId('PersonAddAlt1Icon');
    expect(allProfiles.length).toBe(1);
  });

  it('should filter profiles by team', async () => {
    const getScheduleOverlapping = () => Promise.resolve({ data: { count: 0 } });
    const getProfiles = () => Promise.resolve({ data: { ...profilesMock.data, profiles: profilesMock.data.profiles.slice(0, 3) } });
    renderForTesting(
      <ScheduleForm dataSource={{ ...mockedDataSource, getScheduleOverlapping, getProfiles }} site={site} userFullName={userFullName} />
    );

    await act(async () => await act(() => userEvent.type(screen.getByLabelText('From'), '2023-02-01')));
    await act(async () => await act(() => userEvent.type(screen.getByLabelText('To'), '2023-02-28')));

    expect(screen.getByLabelText('Day of the week').getAttribute('aria-disabled')).toBeFalsy();

    await act(async () => await act(() => userEvent.click(screen.getByLabelText('Day of the week'))));
    await act(async () => await act(() => userEvent.click(screen.getByRole('option', { name: 'Monday' }))));

    await act(async () => await act(() => userEvent.click(screen.getAllByLabelText('Shift')[0])));
    await act(async () => await act(() => userEvent.click(screen.getByRole('option', { name: '08:00' }))));

    await act(async () => await act(() => userEvent.click(screen.getAllByLabelText('Profiles')[1])));
    await act(async () => await act(() => userEvent.click(screen.getByRole('option', { name: 'All' }))));
    await act(async () => await act(() => userEvent.click(screen.getByText('Search'))));

    userEvent.type(screen.getByLabelText('Filter'), 'Providencia');

    const allProfiles = screen.getAllByTestId('PersonAddAlt1Icon');
    expect(allProfiles.length).toBe(1);
  });

  it.skip('should call onFinish and createSchedule function', async () => {
    const onFinish = vi.fn();
    const getScheduleOverlapping = () => Promise.resolve({ data: { count: 0 } });
    const getProfiles = () => Promise.resolve({ data: { ...profilesMock.data, profiles: profilesMock.data.profiles.slice(0, 1) } });
    const createSchedule = vi.fn(() => Promise.resolve());

    renderForTesting(
      <ScheduleForm
        dataSource={{ ...mockedDataSource, getScheduleOverlapping, getProfiles, createSchedule }}
        site={site}
        userFullName={userFullName}
        onFinish={onFinish}
      />
    );

    await act(async () => await act(() => userEvent.type(screen.getByLabelText('From'), '2023-02-01')));
    await act(async () => await act(() => userEvent.type(screen.getByLabelText('To'), '2023-02-28')));

    expect(screen.getByLabelText('Day of the week').getAttribute('aria-disabled')).toBeFalsy();

    await act(async () => await act(() => userEvent.click(screen.getByLabelText('Day of the week'))));
    await act(async () => await act(() => userEvent.click(screen.getByRole('option', { name: 'Monday' }))));

    await act(async () => await act(() => userEvent.click(screen.getAllByLabelText('Shift')[0])));
    await act(async () => await act(() => userEvent.click(screen.getByRole('option', { name: '08:00' }))));

    await act(async () => await act(() => userEvent.click(screen.getAllByLabelText('Profiles')[1])));
    await act(async () => await act(() => userEvent.click(screen.getByRole('option', { name: 'All' }))));
    await act(async () => await act(() => userEvent.click(screen.getByText('Search'))));

    const addButtons = screen.getAllByTestId('PersonAddAlt1Icon');
    userEvent.click(addButtons[0]);
    userEvent.click(screen.getByText('Save'));

    const data = [
      {
        periodStartDay: '2023-02-01',
        periodEndDay: '2023-02-28',
        assigned: [{ id: '62abdd8e89d5bc0ffc129116' }],
        notes: [],
      },
    ];

    await waitFor(() => screen.getByText('Created successfully'));
    expect(onFinish).toBeCalledTimes(1);
    expect(createSchedule).toBeCalledTimes(1);
    expect(createSchedule).toBeCalledWith({ shiftId: '631a2f25d227da0f33eb1f76', data });
  });
});
