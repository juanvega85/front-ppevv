import { screen } from '@testing-library/react';
import renderForTesting from '../../utils/renderForTesting';
import { Loader } from './Loader';

describe('Loader Component', () => {
  it('should render loader', () => {
    renderForTesting(<Loader />);

    screen.getByTestId('loader');
  });

  it('should no render loader when loading is false', () => {
    renderForTesting(<Loader loading={false} />);

    expect(screen.queryByTestId('loader')).toBeNull();
  });
});
