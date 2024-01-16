import React from 'react';
import { TextField } from '@mui/material';

export interface Props {
  label?: string;
  mask: RegExp;
  value?: string;
  prefix?: string;
  onChange?: (value: string) => void;
  error?: boolean;
  helperText?: React.ReactNode;
  reset?: number;
  size?: 'small' | 'medium';
  disabled?: boolean;
}

export const TextFieldMask = ({ label, mask, value = '', onChange, prefix = '', error, helperText, reset, size, disabled }: Props) => {
  const [innerValue, setInnerValue] = React.useState(`${prefix}${value.replace(new RegExp(`^${prefix}`), '')}`);
  const inputRef = React.useRef<any>();

  const handleChange = () => {
    const arr: string[] = inputRef.current.value.replace(/\D/g, '').match(mask);

    const prefixLength = prefix.split(' ').length;
    const val = `${prefix}${arr
      .slice(prefixLength + 1)
      .map((item) => (item ? ` ${item}` : ''))
      .join('')}`;

    inputRef.current.value = val;
    setInnerValue(val);
    onChange?.(val);
  };

  React.useEffect(() => {
    if (reset) {
      setInnerValue(`${prefix}${value.replace(new RegExp(`^${prefix}`), '')}`);
    }
  }, [reset]);

  return (
    <TextField
      label={label}
      InputLabelProps={{ shrink: true }}
      value={innerValue}
      onChange={handleChange}
      inputRef={inputRef}
      margin="normal"
      fullWidth
      error={error}
      variant="outlined"
      helperText={helperText}
      size={size}
      disabled={disabled}
    />
  );
};
