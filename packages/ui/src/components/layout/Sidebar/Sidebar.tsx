import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';

interface Props {
  width?: number;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  children?: React.ReactNode;
}

export const Sidebar = ({ width = 200, mobileOpen, onCloseMobile, children }: Props) => {
  return (
    <Box component="nav" sx={{ width: { sm: width }, flexShrink: { sm: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onCloseMobile}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width } }}
      >
        <Toolbar variant="dense" />
        {mobileOpen && children}
      </Drawer>
      <Drawer variant="permanent" sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width } }} open>
        <Toolbar variant="dense" />
        {children}
      </Drawer>
    </Box>
  );
};
