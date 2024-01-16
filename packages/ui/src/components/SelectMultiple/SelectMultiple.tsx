import React from 'react';
import { OutlinedInput, FormControl, InputLabel, FormHelperText, SelectChangeEvent, Select, Box, Chip, MenuItem } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export interface Props {
  label?: string;
  name?: string;
  value?: string[];
  onChange?: (values: string[]) => void;
  options?: {
    value: string;
    label: string;
  }[];
  error?: boolean;
  helperText?: React.ReactNode;
  reset?: number;
  size?: 'small' | 'medium';
  disabled?: boolean;
}

export const SelectMultiple = ({ name, value = [], label, onChange, options, error, helperText, reset = 0, size, disabled }: Props) => {
  const [selected, setSelected] = React.useState<string[]>(value);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    setSelected(typeof value === 'string' ? [value] : value);
  };

  const handleRemove = (item: string) => {
    setSelected(selected.filter((o) => o !== item));
  };

  React.useEffect(() => {
    onChange?.(selected);
  }, [selected]);

  React.useEffect(() => {
    if (reset) {
      setSelected([]);
    }
  }, [reset]);

  const getLabel = (value: string) => {
    return options?.find((item) => item.value === value)?.label || '';
  };

  return (
    <FormControl sx={{ mt: 2, width: '100%' }}>
      <InputLabel error={error} id={name} size={size === 'medium' ? 'normal' : size}>
        {label}
      </InputLabel>
      <Select
        labelId={name}
        multiple
        value={selected}
        error={error}
        input={<OutlinedInput label={label} />}
        onChange={handleChange}
        renderValue={() => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((item) => (
              <Chip key={item} label={getLabel(item)} size="small" onDelete={() => handleRemove(item)} onMouseDown={(e) => e.stopPropagation()} />
            ))}
          </Box>
        )}
        fullWidth
        size={size}
        MenuProps={{ PaperProps: { style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, width: 250 } } }}
        disabled={disabled}
      >
        {options
          ?.filter((item) => !selected.includes(item.value))
          .map((item) => (
            <MenuItem key={item.label} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
      </Select>
      {Boolean(helperText) && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </FormControl>
  );
};
