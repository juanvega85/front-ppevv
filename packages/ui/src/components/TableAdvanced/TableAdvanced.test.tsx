import { screen, waitFor } from '@testing-library/react';
import renderForTesting from '../../utils/renderForTesting';
import { TableAdvanced } from './TableAdvanced';

const users = [
  {
    firstName: 'John',
    lastName: 'Doe',
  },
  {
    firstName: 'Isaac',
    lastName: 'Brock',
  },
];

const columns = [
  {
    header: 'Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
  },
];

describe('TableAdvanced', () => {
  it('should render table with data', async () => {
    renderForTesting(<TableAdvanced data={users} columns={columns} />);

    for (const column of columns) {
      await waitFor(() => screen.getByText(column.header));
    }

    for (const user of users) {
      screen.getByText(user.firstName);
      screen.getByText(user.lastName);
    }
  });

  it('should render table only headers', async () => {
    renderForTesting(<TableAdvanced data={[]} columns={columns} />);

    for (const column of columns) {
      await waitFor(() => screen.getByText(column.header));
    }

    screen.getByText(/No records to display/i);
  });
});
