import renderForTesting from '../../utils/renderForTesting';
import { PlaceholderBox } from './PlaceholderBox';
import { screen } from '@testing-library/react';

describe('PlaceholderBox', () => {
  it('should render', () => {
    renderForTesting(<PlaceholderBox />);

    screen.getByTestId('loader');
  });
});
