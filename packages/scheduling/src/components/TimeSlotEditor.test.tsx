import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { profilesMock } from '@ppe/profiles';
import { vi } from 'vitest';
import { scheduleMock } from '../data/mocks/schedule.mock';
import { timeSlotsMock } from '../data/mocks/timeslots.mock';
import { mockedDataSource } from '../data/sources/mocked';
import { getScheduleHydrated } from '../utils/getScheduleHydrated';
import { getTimeSlotsHydrated } from '../utils/getTimeSlotsHydrated';
import { renderForTesting } from '../utils/renderForTesting';
import { TimeSlotEditor } from './TimeSlotEditor';

const timeslot = getTimeSlotsHydrated(timeSlotsMock.data)[0];
const schedule = getScheduleHydrated(scheduleMock.data);
const site = {
  coordinates: { lat: '-33.41654276319499', lng: '-70.60699091481932' },
  storage: [],
  active: true,
  name: 'Costanera Center',
  secondaryResponsible: [],
  id: '62ae330f3e83340a928636e7',
};
const userFullName = 'John Doe';
const calledDataSaveThis = [
  {
    ...timeslot,
    assigned: [
      {
        address: {
          coordinates: { lat: '-33.454156', lng: '-70.61763619999999' },
          country: 'Chile',
          region: 'Región Metropolitana',
          city: 'Santiago',
          locality: 'Ñuñoa',
          unit: '508',
          route: 'José Manuel Infante',
          streetNumber: '2520',
          formattedAddress: 'José Manuel Infante 2520, Ñuñoa, Región Metropolitana, Chile',
          description: 'José Manuel Infante 2520, Ñuñoa, Chile',
        },
        team: { id: '62abfc1189d5bc0ffc129123', name: 'Providencia' },
        languages: ['Spanish'],
        maritalStatus: 'Married',
        gender: 'Male',
        appointedCapacity: 'Elder',
        serviceCapacity: 'Publisher',
        birthDate: '1979-10-31',
        mobilePhone: '56991288096',
        landlinePhone: '',
        baptismDate: '1993-12-12',
        lastName: 'Müller',
        firstName: 'Enrique',
        email: 'muller.enrique@gmail.com',
        id: '62abfc6a89d5bc0ffc129124',
      },
    ],
    shift: { id: timeslot.shift.id },
  },
];

vi.mock('@ppe/sites', async () => {
  const modules = await vi.importActual<typeof import('@ppe/sites')>('@ppe/sites');
  return {
    ...modules,
    SiteMap: () => <div>{`${site.coordinates.lat}, ${site.coordinates.lng}`}</div>,
  };
});

describe.skip('TimeSlotEditor', () => {
  it('should render form with data and isException as false', async () => {
    renderForTesting(<TimeSlotEditor timeSlot={timeslot} userFullName={userFullName} isPast={false} dataSource={mockedDataSource} />);
    screen.getAllByText('Profiles');
    screen.getAllByText('Notes');
    screen.getByText('01 Oct 2022 - 31 Oct 2022');
    screen.getAllByLabelText('Profiles');
    screen.getByText('Search');
    screen.getByLabelText('Filter');
    screen.getByText('-33.41654276319499, -70.60699091481932');
    screen.getByText('Results: 0');
    screen.getByText('Selected: 3');
    screen.getByText('Juan Medina');
    screen.getAllByText('Team: Inglesa Viña del Mar');
    screen.getByText('Paul Zoulin');
    screen.getByText('Enrique Müller');
    screen.getByText('Team: Providencia');
    screen.getByText('Save this');
    expect(screen.queryByText('Report')).toBeNull();
    expect(screen.getByText('Save this')).toHaveProperty('disabled', true);
  });

  it('should render button report when isPast', async () => {
    renderForTesting(<TimeSlotEditor timeSlot={timeslot} userFullName={userFullName} isPast dataSource={mockedDataSource} />);

    screen.getByText('Report');
  });

  it('should render form with data and isException as true', async () => {
    renderForTesting(
      <TimeSlotEditor timeSlot={{ ...timeslot, isException: true }} userFullName={userFullName} isPast dataSource={mockedDataSource} />
    );

    expect(screen.queryByText('Save this')).toBeNull();
    screen.getByText('Save');
  });

  it('should render userFullName in new note', async () => {
    renderForTesting(<TimeSlotEditor timeSlot={timeslot} userFullName={userFullName} isPast dataSource={mockedDataSource} />);

    userEvent.click(screen.getByText('Notes'));
    userEvent.type(screen.getByLabelText('New note'), 'My note');
    userEvent.click(screen.getByText('Add'));

    screen.getByText(userFullName);
  });

  it('should render single save button when is exception', async () => {
    renderForTesting(
      <TimeSlotEditor timeSlot={{ ...timeslot, isException: true }} userFullName={userFullName} isPast dataSource={mockedDataSource} />
    );

    screen.getByText('Save');
  });

  it('should filter profiles by name', async () => {
    renderForTesting(<TimeSlotEditor timeSlot={timeslot} userFullName={userFullName} isPast dataSource={mockedDataSource} />);

    userEvent.click(screen.getAllByLabelText('Profiles')[1]);
    userEvent.click(screen.getByRole('option', { name: 'All' }));
    await act(async () => await act(() => userEvent.click(screen.getByText('Search'))));

    userEvent.type(screen.getByLabelText('Filter'), 'rojas');

    const allProfiles = screen.getAllByTestId('PersonAddAlt1Icon');
    expect(allProfiles.length).toBe(3);
  });

  it.skip('should filter profiles by team', async () => {
    const getProfiles = () => Promise.resolve({ data: { ...profilesMock.data, profiles: profilesMock.data.profiles.slice(0, 10) } });
    renderForTesting(<TimeSlotEditor timeSlot={timeslot} userFullName={userFullName} isPast dataSource={{ ...mockedDataSource, getProfiles }} />);

    userEvent.click(screen.getAllByLabelText('Profiles')[1]);
    userEvent.click(screen.getByRole('option', { name: 'All' }));
    await act(async () => await act(() => userEvent.click(screen.getByText('Search'))));

    userEvent.type(screen.getByLabelText('Filter'), 'olimpica');

    const allProfiles = screen.getAllByTestId('PersonAddAlt1Icon');
    expect(allProfiles.length).toBe(3);
  });

  it('should call onFinish and setScheduleException function when click on single save button', async () => {
    const onFinish = vi.fn();
    const setScheduleException = vi.fn(() => Promise.resolve());

    renderForTesting(
      <TimeSlotEditor
        timeSlot={{ ...timeslot, isException: true }}
        userFullName={userFullName}
        isPast
        dataSource={{ ...mockedDataSource, setScheduleException }}
        onFinish={onFinish}
      />
    );

    const removeButtons = screen.getAllByTestId('BackspaceIcon');
    userEvent.click(removeButtons[0]);
    userEvent.click(removeButtons[1]);

    userEvent.click(screen.getByText('Save'));

    await waitFor(() => screen.getByText('Saved successfully'));
    expect(onFinish).toBeCalledTimes(1);
    expect(setScheduleException).toBeCalledTimes(1);
    expect(setScheduleException).toBeCalledWith({ shiftId: timeslot.shift.id, data: [{ ...calledDataSaveThis[0], isException: true }] });
  });

  it('should call onFinish and setScheduleException function when click on save this button', async () => {
    const onFinish = vi.fn();
    const setScheduleException = vi.fn(() => Promise.resolve());

    renderForTesting(
      <TimeSlotEditor
        timeSlot={timeslot}
        userFullName={userFullName}
        isPast
        dataSource={{ ...mockedDataSource, setScheduleException }}
        onFinish={onFinish}
      />
    );

    const removeButtons = screen.getAllByTestId('BackspaceIcon');
    userEvent.click(removeButtons[0]);
    userEvent.click(removeButtons[1]);

    userEvent.click(screen.getByText('Save this'));

    await waitFor(() => screen.getByText('Saved successfully'));
    expect(onFinish).toBeCalledTimes(1);
    expect(setScheduleException).toBeCalledTimes(1);
    expect(setScheduleException).toBeCalledWith({ shiftId: timeslot.shift.id, data: calledDataSaveThis });
  });

  it('should call onFinish and updateSchedule function when click save all series', async () => {
    const onFinish = vi.fn();
    const updateSchedule = vi.fn(() => Promise.resolve());

    renderForTesting(
      <TimeSlotEditor
        timeSlot={timeslot}
        userFullName={userFullName}
        isPast
        dataSource={{ ...mockedDataSource, updateSchedule }}
        onFinish={onFinish}
      />
    );

    const removeButtons = screen.getAllByTestId('BackspaceIcon');
    userEvent.click(removeButtons[0]);
    userEvent.click(removeButtons[1]);

    userEvent.click(screen.getAllByTestId('ArrowDropDownIcon')[1]);
    userEvent.click(screen.getByText('Save serie'));
    userEvent.click(screen.getAllByText('Save serie')[0]);

    await waitFor(() => screen.getByText('Saved successfully'));
    expect(onFinish).toBeCalledTimes(1);
    expect(updateSchedule).toBeCalledTimes(1);
    expect(updateSchedule).toBeCalledWith({ shiftId: timeslot.shift.id, data: [{ ...schedule, assigned: calledDataSaveThis[0].assigned }] });
  });

  it('should call onFinish and restoreScheduleException functions when click on reset', async () => {
    const restoreScheduleException = vi.fn(() => Promise.resolve());
    const onFinish = vi.fn();
    renderForTesting(
      <TimeSlotEditor
        timeSlot={{ ...timeslot, isException: true }}
        onFinish={onFinish}
        userFullName={userFullName}
        isPast
        dataSource={{ ...mockedDataSource, restoreScheduleException }}
      />
    );

    userEvent.click(screen.getByText('Reset'));
    await waitFor(() => expect(restoreScheduleException).toBeCalledTimes(1));
    expect(onFinish).toBeCalledTimes(1);
  });
});
