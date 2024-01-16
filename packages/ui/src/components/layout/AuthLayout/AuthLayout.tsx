import React from 'react';
import { Box, Card, CssBaseline, Typography } from '@mui/material';
import { Footer } from '../Footer/Footer';
import { grey } from '@mui/material/colors';

export interface Props {
  appName?: string;
  logo?: string;
  version?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

export const AuthLayout = ({ appName, logo, version, footer, children }: Props) => {
  return (
    <>
      <CssBaseline />
      <Box sx={styles.container}>
        <Card sx={styles.containerBox}>
          {appName ? (
            <Typography variant="h1" align="center" sx={styles.title}>
              {appName}
            </Typography>
          ) : null}
          {logo ? (
            <Box sx={styles.logo}>
              <img src={logo} alt="logo" />
            </Box>
          ) : null}
          <div>{children}</div>
        </Card>
        {version ? (
          <Typography variant="caption" sx={styles.version}>
            {version}
          </Typography>
        ) : null}
      </Box>
      <Footer>{footer}</Footer>
    </>
  );
};

const styles = {
  container: {
    backgroundColor: grey[200],
    display: 'grid',
    minHeight: { xs: 'calc(100vh - 86px)', sm: 'calc(100vh - 58px)' },
    p: 3,
    px: { xs: 2, md: 4 },
    placeItems: 'center',
    position: 'relative',
  },
  containerBox: {
    maxWidth: '420px',
    padding: 3,
    borderRadius: 2,
  },
  logo: {
    paddingRight: { xs: 1, md: 3 },
    textAlign: 'right',

    img: {
      height: '30px',
      objectFit: 'contain',
    },
  },
  title: {
    color: 'transparent',
    background: '#302b74',
    backgroundClip: 'text',
    textShadow: '0px 2px 2px rgba(255,255,255,0.4)',
    fontWeight: 600,
    fontSize: { xs: '1.8rem', sm: '2.5rem' },
    paddingBottom: 1,
  },
  version: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    pr: 1,
    color: grey[400],
  },
};
