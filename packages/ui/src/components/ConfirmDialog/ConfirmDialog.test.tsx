import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderForTesting from '../../utils/renderForTesting';
import { ConfirmDialog } from './ConfirmDialog';
import { vi } from 'vitest';

describe('ConfirmDialog', () => {
  it('should render ok with no children', () => {
    renderForTesting(<ConfirmDialog open={true} onAccept={() => {}} title="Test title" onClose={() => {}} />);

    screen.getByText('Test title');
    screen.getByText('Are you sure?');
    screen.getByText('No, cancel');
    screen.getByText('Yes, I am sure');
  });

  it('should render ok with children', () => {
    renderForTesting(
      <ConfirmDialog open={true} onAccept={() => {}} title="Test title" onClose={() => {}}>
        Test content
      </ConfirmDialog>
    );

    screen.getByText('Test title');
    screen.getByText('No, cancel');
    screen.getByText('Yes, I am sure');
    screen.getByText('Test content');
    expect(screen.queryByText('Are you sure?')).toBeNull();
  });

  it('should not render on closed', () => {
    renderForTesting(<ConfirmDialog open={false} onAccept={() => {}} title="Test title" onClose={() => {}} />);

    expect(screen.queryByText('Test title')).toBeNull();
    expect(screen.queryByText('Are you sure?')).toBeNull();
    expect(screen.queryByText('No, cancel')).toBeNull();
    expect(screen.queryByText('Yes, I am sure')).toBeNull();
  });

  it('should call function on close', () => {
    const callbackAccept = vi.fn();
    const callbackCancel = vi.fn();
    renderForTesting(<ConfirmDialog open={true} onAccept={callbackAccept} onClose={callbackCancel} />);

    userEvent.click(screen.getByText('No, cancel'));
    expect(callbackCancel).toBeCalledTimes(1);
    expect(callbackAccept).toBeCalledTimes(0);
  });

  it('should call function on accept', () => {
    const callbackAccept = vi.fn();
    const callbackCancel = vi.fn();
    renderForTesting(<ConfirmDialog open={true} onAccept={callbackAccept} onClose={callbackCancel} />);

    userEvent.click(screen.getByText('Yes, I am sure'));
    expect(callbackAccept).toBeCalledTimes(1);
    expect(callbackCancel).toBeCalledTimes(0);
  });
});
