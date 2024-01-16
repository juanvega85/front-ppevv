import { screen } from '@testing-library/react';
import { renderForTesting } from '../utils/renderForTesting';
import { EventTitle } from './EventTitle';

describe('EventTitle', () => {
  it('should render ok', () => {
    renderForTesting(<EventTitle siteName="Costanera Center" date="2022/10/03" time="12:30:00" />);

    screen.getByText(/costanera center/i);
    screen.getByText(/12:30/i);
    screen.getByText(/monday 3 Oct 2022/i);
  });
});
