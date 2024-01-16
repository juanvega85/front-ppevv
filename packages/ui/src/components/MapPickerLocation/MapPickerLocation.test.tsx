import { screen } from '@testing-library/react';
import renderForTesting from '../../utils/renderForTesting';
import { MapPickerLocation } from './MapPickerLocation';

describe('MapPickerLocation', () => {
  it('should render map picker location with default location', () => {
    renderForTesting(<MapPickerLocation apiKey="asd123" />);

    screen.getByText('-33.5775918, -70.5840468');
  });

  it('should render map picker location with defualt location changed', () => {
    renderForTesting(<MapPickerLocation apiKey="asd123" defaultLocation={{ lat: '-55.555555', lng: '-66.666666' }} />);

    screen.getByText('-55.555555, -66.666666');
  });

  it('should render map picker location with data location', () => {
    renderForTesting(<MapPickerLocation apiKey="asd123" location={{ lat: '-11.111111', lng: '-22.222222' }} />);

    screen.getByText('-11.111111, -22.222222');
  });
});
