import { fireEvent, screen, waitFor } from '@testing-library/react';
import renderForTesting from '../../utils/renderForTesting';
import { showToast, ToastsProvider } from './Toasts';

const Button = ({ type = 'info' }: { type?: 'info' | 'success' | 'warning' | 'error' | 'default' }) => {
  return (
    <>
      <ToastsProvider />
      <button onClick={() => showToast('Rendered successfully', type)}>Click Me!</button>;
    </>
  );
};

describe('Toasts', () => {
  it('should render toast message type info', async () => {
    const { container } = renderForTesting(<Button />);

    fireEvent.click(screen.getByText('Click Me!'));

    await waitFor(() => screen.getByText('Rendered successfully'));

    const toastInfo = container.querySelector('.Toastify__toast--info');
    expect(toastInfo).not.toBeNull();
  });

  it('should render toast message type error', async () => {
    const { container } = renderForTesting(<Button type="error" />);

    fireEvent.click(screen.getByText('Click Me!'));

    await waitFor(() => screen.getByText('Rendered successfully'));

    const toastInfo = container.querySelector('.Toastify__toast--error');
    expect(toastInfo).not.toBeNull();
  });

  it('should render toast message type success', async () => {
    const { container } = renderForTesting(<Button type="success" />);

    fireEvent.click(screen.getByText('Click Me!'));

    await waitFor(() => screen.getByText('Rendered successfully'));

    const toastInfo = container.querySelector('.Toastify__toast--success');
    expect(toastInfo).not.toBeNull();
  });

  it('should render toast message type warning', async () => {
    const { container } = renderForTesting(<Button type="warning" />);

    fireEvent.click(screen.getByText('Click Me!'));

    await waitFor(() => screen.getByText('Rendered successfully'));

    const toastInfo = container.querySelector('.Toastify__toast--warning');
    expect(toastInfo).not.toBeNull();
  });

  it('should render toast message type default', async () => {
    const { container } = renderForTesting(<Button type="default" />);

    fireEvent.click(screen.getByText('Click Me!'));

    await waitFor(() => screen.getByText('Rendered successfully'));

    const toastInfo = container.querySelector('.Toastify__toast--default');
    expect(toastInfo).not.toBeNull();
  });
});
