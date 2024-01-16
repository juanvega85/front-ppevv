import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReplacementAvailabilitySwitcher } from './ReplacementAvailabilitySwitcher';
import { vi } from 'vitest';
import { renderForTesting } from '../utils/renderForTesting';
import { mockedDataSource } from '../data/sources/mocked';

describe('PreferencesReplacementPage', () => {
  it('should render availability enabled', async () => {
    renderForTesting(<ReplacementAvailabilitySwitcher userId="1234567890" dataSource={mockedDataSource} />);

    await waitFor(() => expect(screen.getByLabelText('Enabled')));
  });

  it('should disable availability', async () => {
    const getGeneralPreferences = vi.fn(() => Promise.resolve({ data: { enableForReplacements: true } }));
    const updateGeneralPreferences = vi.fn(() => Promise.resolve({ data: { enableForReplacements: false } }));
    renderForTesting(
      <ReplacementAvailabilitySwitcher userId="1234567890" dataSource={{ ...mockedDataSource, getGeneralPreferences, updateGeneralPreferences }} />
    );

    await waitFor(() => expect(screen.getByLabelText('Enabled')));

    userEvent.click(screen.getByLabelText('Enabled'));

    await waitFor(() => screen.getByLabelText('Disabled'));

    await waitFor(() => screen.getByText('Updated successfully'));
    expect(updateGeneralPreferences).toBeCalledTimes(1);
    expect(updateGeneralPreferences).toBeCalledWith({
      userId: '1234567890',
      values: {
        enableForReplacements: false,
      },
    });
  });

  it('should enable availability', async () => {
    const getGeneralPreferences = vi.fn(() => Promise.resolve({ data: { enableForReplacements: false } }));
    const updateGeneralPreferences = vi.fn(() => Promise.resolve({ data: { enableForReplacements: true } }));
    renderForTesting(
      <ReplacementAvailabilitySwitcher userId="1234567890" dataSource={{ ...mockedDataSource, getGeneralPreferences, updateGeneralPreferences }} />
    );

    await waitFor(() => expect(screen.getByLabelText('Disabled')));

    userEvent.click(screen.getByLabelText('Disabled'));

    await waitFor(() => screen.getByLabelText('Enabled'));

    await waitFor(() => screen.getByText('Updated successfully'));
    expect(updateGeneralPreferences).toBeCalledTimes(1);
    expect(updateGeneralPreferences).toBeCalledWith({
      userId: '1234567890',
      values: {
        enableForReplacements: true,
      },
    });
  });

  it('should display an error message when an update error occurs', async () => {
    const updateGeneralPreferences = vi.fn(() => Promise.reject(new Error('Error')));
    renderForTesting(<ReplacementAvailabilitySwitcher userId="1234567890" dataSource={{ ...mockedDataSource, updateGeneralPreferences }} />);
    await waitFor(() => expect(screen.getByLabelText('Enabled')));

    userEvent.click(screen.getByText('Enabled'));

    await waitFor(() => screen.getByText('Error'));
    screen.getByLabelText('Enabled');
  });
});
