import { screen, waitFor } from '@testing-library/react';
import { mockedDataSource } from '../data/sources/mocked';
import { ITeam } from '../types/ITeam';
import userEvent from '@testing-library/user-event';
import { TeamForm } from './TeamForm';
import { describe, it, vi } from 'vitest';
import { renderForTesting } from '../utils/renderForTesting';

describe('TeamForm', () => {
  it('should render create mode', () => {
    renderForTesting(<TeamForm dataSource={mockedDataSource} />);
    screen.getByLabelText(/name/i);
    screen.getByText(/create/i);
  });

  it('should missing field warning on create', async () => {
    renderForTesting(<TeamForm dataSource={mockedDataSource} />);

    userEvent.click(screen.getByText(/create/i));
    await waitFor(() => screen.getByText(/required/i));
  });

  it('should call create', async () => {
    const createTeams = vi.fn(() => Promise.resolve({ data: [] }));
    const callbackOnFinish = vi.fn();
    renderForTesting(<TeamForm dataSource={{ ...mockedDataSource, createTeams }} onFinish={callbackOnFinish} />);

    userEvent.type(screen.getByLabelText(/name/i), 'Nombre');
    userEvent.click(screen.getByText(/create/i));

    await waitFor(() => screen.getAllByText('Created successfully'));
    expect(createTeams).toBeCalledTimes(1);
    expect(createTeams).toBeCalledWith([{ name: 'Nombre' }]);
    expect(callbackOnFinish).toBeCalledTimes(1);
  });

  const data: ITeam = {
    id: '1234567890',
    name: 'Test team',
  };

  it('should render update mode', () => {
    renderForTesting(<TeamForm dataSource={mockedDataSource} defaultValues={data} />);
    screen.getByLabelText(/name/i);
    screen.getByDisplayValue('Test team');
    screen.getByText(/update/i);
  });

  it('should missing field warning on update', async () => {
    renderForTesting(<TeamForm dataSource={mockedDataSource} defaultValues={data} />);

    userEvent.clear(screen.getByLabelText(/name/i));
    userEvent.click(screen.getByText(/update/i));
    await waitFor(() => screen.getByText(/required/i));
  });

  it('should call update', async () => {
    const updateTeams = vi.fn(() => Promise.resolve({ data: [] }));
    const callbackOnFinish = vi.fn();
    renderForTesting(<TeamForm dataSource={{ ...mockedDataSource, updateTeams }} defaultValues={data} onFinish={callbackOnFinish} />);

    userEvent.clear(screen.getByLabelText(/name/i));
    userEvent.type(screen.getByLabelText(/name/i), 'changed');
    userEvent.click(screen.getByText(/update/i));

    await waitFor(() => screen.getAllByText('Updated successfully'));
    expect(updateTeams).toBeCalledTimes(1);
    expect(updateTeams).toBeCalledWith([{ id: '1234567890', name: 'changed' }]);
    expect(callbackOnFinish).toBeCalledTimes(1);
  });
});
