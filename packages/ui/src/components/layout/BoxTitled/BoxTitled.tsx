import React from 'react';
import { grey } from '@mui/material/colors';
import { Box, SxProps, Typography } from '@mui/material';

interface Props {
  title?: string;
  sx?: SxProps;
  children?: React.ReactNode;
}

export const BoxTitled = ({ title, sx, children }: Props) => {
  return (
    <>
      <div style={{ textAlign: 'right' }}>
        <Typography color="primary" component="h1" sx={{ mb: 1, fontSize: '1.25rem' }}>
          {title}
        </Typography>
      </div>
      <Box sx={{ ...styles.card, ...sx }}>{children}</Box>
    </>
  );
};

const styles = {
  card: {
    backgroundColor: 'common.white',
    border: `1px solid ${grey[300]}`,
    borderRadius: '5px',
    p: 3,
  },
};
