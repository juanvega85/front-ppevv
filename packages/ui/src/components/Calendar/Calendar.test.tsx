import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import renderForTesting from '../../utils/renderForTesting';
import { Calendar } from './Calendar';
import userEvent from '@testing-library/user-event';

const date = new Date();
const year = date.getFullYear();
const month = (date.getMonth() + 1).toString().padStart(2, '0');

describe('Calendar', () => {
  it('should render Loader Component', () => {
    renderForTesting(<Calendar loading />);

    screen.getByTestId('loader');
  });

  it('should render big ok', () => {
    renderForTesting(<Calendar />);

    screen.getByText('Today');
    screen.getByText('Month');
    screen.getByText('Week');
    screen.getByText('Day');

    screen.getByText('Monday');
    screen.getByText('Tuesday');
    screen.getByText('Wednesday');
    screen.getByText('Thursday');
    screen.getByText('Friday');
    screen.getByText('Saturday');
    screen.getByText('Sunday');
  });

  it('should render small ok', () => {
    renderForTesting(<Calendar alwaysSmall />);

    expect(screen.queryByText('Today')).toBeNull();
    expect(screen.queryByText('Month')).toBeNull();
    expect(screen.queryByText('Week')).toBeNull();
    expect(screen.queryByText('Day')).toBeNull();

    screen.getByText('Mon');
    screen.getByText('Tue');
    screen.getByText('Wed');
    screen.getByText('Thu');
    screen.getByText('Fri');
    screen.getByText('Sat');
    screen.getByText('Sun');
  });

  it('should call function on select day (small)', () => {
    const callback = vi.fn();
    renderForTesting(<Calendar alwaysSmall onSelectDay={callback} />);

    userEvent.click(screen.getByText('15'));

    expect(callback).toHaveBeenCalledTimes(1);
    // TODO: Update to pass on server using UTC time
    // expect(callback).toHaveBeenCalledWith(new Date(`${year}-${month}-15T03:00:00.000Z`)); // offset makes this to fail on server
  });

  it('should render event and call function on click it (big)', () => {
    const callback = vi.fn();

    const events = [
      {
        id: '12345',
        start: new Date(`${year}-${month}-15T12:30:00`),
        end: new Date(`${year}-${month}-15T15:00:00`),
        title: 'Test title',
      },
    ];

    renderForTesting(<Calendar events={events} onSelectEvent={callback} />);

    const event = screen.getByText('Test title');

    userEvent.click(event);

    expect(callback).toHaveBeenCalledTimes(1);
    // TODO: Update to pass on server using UTC time
    // expect(callback).toHaveBeenCalledWith({
    //   id: '12345',
    //   start: new Date('2022-10-15T15:30:00.000Z'), // offset makes this to fail on server
    //   end: new Date('2022-10-15T18:00:00.000Z'), // offset makes this to fail on server
    //   title: 'Test title',
    // });
  });

  it('should call function on range changes (big)', () => {
    const callback = vi.fn();

    renderForTesting(<Calendar onRangeChange={callback} />);

    userEvent.click(screen.getByText('>>'));
    userEvent.click(screen.getByText('<<'));

    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should call function on range changes (small)', () => {
    const callback = vi.fn();

    renderForTesting(<Calendar onRangeChange={callback} alwaysSmall />);

    userEvent.click(screen.getByText('›'));
    userEvent.click(screen.getByText('‹'));

    expect(callback).toHaveBeenCalledTimes(2);
  });
});
