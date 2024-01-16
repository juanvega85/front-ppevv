import React from 'react';
import usePlacesAutocomplete, { getGeocode } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { TextField, Box, SxProps, Typography } from '@mui/material';
import { IAddress } from '../../types/IAddress';

export interface Props {
  label?: string;
  value?: IAddress | null;
  onChange?: (value: IAddress | null) => void;
  countries?: string[];
  error?: boolean;
  helperText?: React.ReactNode;
  reset?: number;
  size?: 'small' | 'medium';
  margin?: 'none' | 'dense' | 'normal';
  sx?: SxProps;
  disabled?: boolean;
}

export const InputAddress = ({ label, value, onChange, countries = [], error, helperText, reset, size, margin, sx, disabled }: Props) => {
  const [open, setOpen] = React.useState(false);

  const {
    ready,
    value: newValue,
    setValue: setNewValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({ requestOptions: { componentRestrictions: { country: countries } }, debounce: 300 });

  const ref = useOnclickOutside(() => {
    clearSuggestions();
    setOpen(false);
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(null);
    setOpen(true);
    setNewValue(e.target.value);
  };

  React.useEffect(() => {
    if (reset) {
      setNewValue('', false);
    }
  }, [reset]);

  const handleSelect =
    ({ description }: { description: string }) =>
    async () => {
      setNewValue(description, false);
      clearSuggestions();

      const results = await getGeocode({ address: description });

      const coordinates = {
        lat: typeof results[0].geometry.location.lat === 'function' ? results[0].geometry.location.lat() : results[0].geometry.location.lat,
        lng: typeof results[0].geometry.location.lng === 'function' ? results[0].geometry.location.lng() : results[0].geometry.location.lng,
      };
      const data: IAddress = {
        description,
        formattedAddress: results[0].formatted_address,
        locality: '',
        country: '',
        coordinates: {
          lat: coordinates.lat.toString(),
          lng: coordinates.lng.toString(),
        },
      };
      const place = results[0].address_components;
      for (let ii = 0; ii < place.length; ii += 1) {
        if (place[ii].types && place[ii].types.findIndex((tt) => tt === 'street_number') >= 0) {
          data.streetNumber = place[ii].long_name;
        }
        if (place[ii].types && place[ii].types.findIndex((tt) => tt === 'route') >= 0) {
          data.route = place[ii].long_name;
        }
        if (place[ii].types && place[ii].types.findIndex((tt) => tt === 'locality' || tt === 'administrative_area_level_3') >= 0) {
          data.locality = place[ii].long_name;
        }
        if (place[ii].types && place[ii].types.findIndex((tt) => tt === 'administrative_area_level_2') >= 0) {
          data.city = place[ii].long_name;
        }
        if (place[ii].types && place[ii].types.findIndex((tt) => tt === 'postal_code') >= 0) {
          data.postalCode = place[ii].long_name;
        }
        if (place[ii].types && place[ii].types.findIndex((tt) => tt === 'administrative_area_level_1') >= 0) {
          data.region = place[ii].long_name;
        }
        if (place[ii].types && place[ii].types.findIndex((tt) => tt === 'country') >= 0) {
          data.country = place[ii].long_name;
        }
      }

      onChange?.(data);
    };

  return (
    <div ref={ref}>
      <TextField
        label={label}
        value={newValue || value?.formattedAddress || ''}
        onChange={handleChange}
        disabled={!ready || disabled}
        autoComplete="off"
        fullWidth
        margin={margin}
        error={error}
        variant="outlined"
        helperText={helperText}
        size={size}
        sx={sx}
      />
      {status === 'OK' && open && (
        <Box sx={styles.menuList} component="ul">
          {data.map((item) => (
            <Typography key={item.place_id} onClick={handleSelect(item)} component="li">
              <strong>{item.structured_formatting.main_text}</strong> <small>{item.structured_formatting.secondary_text}</small>
            </Typography>
          ))}
        </Box>
      )}
    </div>
  );
};

const styles = {
  menuList: {
    borderRadius: '4px',
    listStyleType: 'none',
    cursor: 'pointer',
    boxShadow: 2,
    padding: 0,

    li: {
      px: 2,
      py: 1,
    },
  },
};
