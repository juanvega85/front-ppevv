import { fireEvent, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import renderForTesting from '../../utils/renderForTesting';
import { TenantSelector } from './TenantSelector';

const data = [
  {
    name: 'Default',
    id: 'tenantId',
  },
  {
    name: 'Taller Don Mario',
    id: 'marioId',
  },
  {
    name: 'Cooperativa de Aguas Limache',
    id: 'limacheId',
  },
];

describe('TenantSelector', () => {
  it('should render all options tenants', () => {
    renderForTesting(<TenantSelector data={data} />);

    screen.getByText(/Default/i);
    screen.getByText(/Taller Don Mario/i);
    screen.getByText(/Cooperativa de Aguas Limache/i);
  });

  it('should render select button disabled', () => {
    renderForTesting(<TenantSelector data={data} />);

    expect(screen.getByText(/select/i)).toHaveProperty('disabled', true);
  });

  it('should call onSelect function', async () => {
    const onSelect = vi.fn();
    renderForTesting(<TenantSelector data={data} onSelect={onSelect} />);

    fireEvent.click(screen.getByText(/Default/i));
    fireEvent.click(screen.getByText(/select/i));

    await waitFor(() => expect(onSelect).toBeCalledTimes(1));
    expect(onSelect).toBeCalledWith('tenantId');
  });
});
