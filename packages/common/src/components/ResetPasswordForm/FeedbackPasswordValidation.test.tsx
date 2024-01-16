import { screen } from '@testing-library/react';
import renderForTesting from '../../utils/renderForTesting';
import { FeedbackPasswordValidation } from './FeedbackPasswordValidation';

describe('FeedbackPasswordValidation', () => {
  it('should render all feedback as error', () => {
    renderForTesting(<FeedbackPasswordValidation isValidLength={false} isValidNumber={false} isValidUppercase={false} isValidLowercase={false} />);

    screen.getByText('8 characters minimum');
    screen.getByText('At least one number');
    screen.getByText('At least one uppercase letter');
    screen.getByText('At least one lowercase letter');
    screen.getAllByTestId('CloseIcon');
    expect(screen.getAllByTestId('CloseIcon').length).toBe(4);

    for (const icon of screen.getAllByTestId('CloseIcon')) {
      expect(icon.classList.contains('MuiSvgIcon-colorError')).toBeTruthy();
    }
  });

  it('should render all feedback as success', () => {
    renderForTesting(<FeedbackPasswordValidation isValidLength isValidNumber isValidUppercase isValidLowercase />);

    screen.getByText('8 characters minimum');
    screen.getByText('At least one number');
    screen.getByText('At least one uppercase letter');
    screen.getByText('At least one lowercase letter');
    screen.getAllByTestId('CheckIcon');
    expect(screen.getAllByTestId('CheckIcon').length).toBe(4);

    for (const icon of screen.getAllByTestId('CheckIcon')) {
      expect(icon.classList.contains('MuiSvgIcon-colorSuccess')).toBeTruthy();
    }
  });

  it('should render only two conditions as success', () => {
    renderForTesting(<FeedbackPasswordValidation isValidLength isValidNumber isValidUppercase={false} isValidLowercase={false} />);

    screen.getByText('8 characters minimum');
    screen.getByText('At least one number');
    screen.getByText('At least one uppercase letter');
    screen.getByText('At least one lowercase letter');
    screen.getAllByTestId('CheckIcon');
    expect(screen.getAllByTestId('CheckIcon').length).toBe(2);
    screen.getAllByTestId('CloseIcon');
    expect(screen.getAllByTestId('CloseIcon').length).toBe(2);

    for (const checkIcon of screen.getAllByTestId('CheckIcon')) {
      expect(checkIcon.classList.contains('MuiSvgIcon-colorSuccess')).toBeTruthy();
    }
    expect(screen.getAllByTestId('CheckIcon')[0].closest('span')!.textContent).toContain('8 characters minimum');
    expect(screen.getAllByTestId('CheckIcon')[1].closest('span')!.textContent).toContain('At least one number');

    for (const closeIcon of screen.getAllByTestId('CloseIcon')) {
      expect(closeIcon.classList.contains('MuiSvgIcon-colorError')).toBeTruthy();
    }
    expect(screen.getAllByTestId('CloseIcon')[0].closest('span')!.textContent).toContain('At least one uppercase letter');
    expect(screen.getAllByTestId('CloseIcon')[1].closest('span')!.textContent).toContain('At least one lowercase letter');
  });
});
