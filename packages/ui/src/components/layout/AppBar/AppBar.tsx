import React from 'react';
import { AppBar as AppBarMui } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Menu as MenuIcon } from '@ppe/icons';
import Toolbar from '@mui/material/Toolbar';

interface Props {
  appTitle?: React.ReactNode;
  handleDrawerToggle?: () => void;
  children?: React.ReactNode;
}

export const AppBar = ({ appTitle, handleDrawerToggle, children }: Props) => {
  return (
    <AppBarMui position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar variant="dense">
        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
          <MenuIcon />
        </IconButton>
        <div style={styles.container}>
          <div style={{ padding: '2px 0' }}>{appTitle}</div>
          <div>{children}</div>
        </div>
      </Toolbar>
    </AppBarMui>
  );
};

const styles = {
  container: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
};
