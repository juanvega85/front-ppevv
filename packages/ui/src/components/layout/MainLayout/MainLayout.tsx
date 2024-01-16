import React from 'react';
import { AppBar } from '../AppBar/AppBar';
import { CssBaseline, Box, Toolbar, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Sidebar } from '../Sidebar/Sidebar';
import { Footer } from '../Footer/Footer';

const drawerWidth = 220;

export interface Props {
  appTitle?: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  version?: string;
  children?: React.ReactNode;
}

export const MainLayout = ({ appTitle, sidebar, header, footer, version, children }: Props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <>
      <CssBaseline />
      <Box sx={styles.container}>
        <AppBar appTitle={appTitle} handleDrawerToggle={() => setMobileOpen(!mobileOpen)}>
          {header}
        </AppBar>
        <Sidebar width={drawerWidth} mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)}>
          {sidebar}
        </Sidebar>
        <Box component="main" sx={styles.mainArea}>
          <Toolbar variant="dense" />
          {children}
          {version ? (
            <Typography variant="caption" sx={styles.version}>
              {version}
            </Typography>
          ) : null}
        </Box>
      </Box>
      <Box sx={styles.footerContainer}>
        <Footer>{footer}</Footer>
      </Box>
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
  },
  mainArea: {
    backgroundColor: grey[100],
    flexGrow: 1,
    p: 2,
    pb: 8,
    width: { sm: `calc(100% - ${drawerWidth}px)` },
    position: 'relative',
  },
  footerContainer: {
    marginLeft: { sm: `${drawerWidth}px` },
  },
  version: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    pr: 1,
    color: grey[400],
  },
};
