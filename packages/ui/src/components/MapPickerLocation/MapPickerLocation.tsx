import React from 'react';
import MapPicker from 'react-google-map-picker';
import { PlaceholderBox } from '../PlaceholderBox/PlaceholderBox';
import { Typography } from '@mui/material';
import { ICoordinates } from '../../types/ICoordinates';

export interface Props {
  location?: ICoordinates;
  onChangeLocation?: (value: ICoordinates) => void;
  apiKey: string;
  defaultLocation?: ICoordinates;
  defaultZoom?: number;
}

export const MapPickerLocation = ({
  onChangeLocation,
  location,
  apiKey,
  defaultLocation = { lat: '-33.5775918', lng: '-70.5840468' },
  defaultZoom = 16,
}: Props) => {
  const [show, setShow] = React.useState(false);

  const handleChangeLocation = (lat: number, lng: number) => {
    const newLocation: ICoordinates = {
      lat: lat.toString(),
      lng: lng.toString(),
    };
    onChangeLocation?.(newLocation);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const coordinates = location ? parseCoordinatesToFloat(location) : parseCoordinatesToFloat(defaultLocation);

  return (
    <>
      {show ? (
        <MapPicker
          defaultLocation={coordinates}
          zoom={defaultZoom}
          style={{ height: '300px' }}
          onChangeLocation={handleChangeLocation}
          apiKey={apiKey}
        />
      ) : (
        <PlaceholderBox height="295px" />
      )}
      <Typography variant="overline" component="div" style={{ textAlign: 'right', fontWeight: 'bold' }}>
        {`${coordinates.lat}, ${coordinates.lng}`}
      </Typography>
    </>
  );
};

const parseCoordinatesToFloat = (coordinates: ICoordinates) => ({
  lat: parseFloat(coordinates.lat),
  lng: parseFloat(coordinates.lng),
});
