import React from 'react';
import { Paper } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

export const Footer = ({ children }: Props) => {
  return (
    <Paper square variant="outlined" sx={styleFooter} component="footer">
      {children}
    </Paper>
  );
};

const styleFooter = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  alignItems: 'center',
  justifyContent: { xs: 'center', sm: 'space-between' },
  py: 1,
  px: 2,
  flexWrap: 'wrap',
};
