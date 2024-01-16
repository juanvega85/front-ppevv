import React from 'react';
import { RemoveCircle as RemoveIcon, AddCircle as AddIcon } from '@ppe/icons';
import { grey } from '@mui/material/colors';
import { IconButton, Typography } from '@mui/material';

export interface Props {
  label?: string;
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
}

export const Counter = ({ label = '', value = 0, onChange, disabled }: Props) => {
  const [count, setCount] = React.useState(value);

  const decrease = () => {
    const newValue = count > 1 ? count - 1 : 0;
    onChange?.(newValue);
    setCount(newValue);
  };

  const increase = () => {
    const newValue = count + 1;
    onChange?.(newValue);
    setCount(newValue);
  };

  return (
    <div style={styles.container}>
      <Typography>{label}</Typography>
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <IconButton onClick={decrease} disabled={disabled} color="primary">
          <RemoveIcon fontSize="large" />
        </IconButton>
        <Typography component="div" sx={{ width: '25px', textAlign: 'center' }}>
          {count}
        </Typography>
        <IconButton onClick={increase} disabled={disabled} color="primary">
          <AddIcon fontSize="large" />
        </IconButton>
      </span>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${grey[300]}`,
  },
};
