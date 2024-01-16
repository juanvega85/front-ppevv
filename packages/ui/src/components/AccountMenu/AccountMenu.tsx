import React from 'react';
import { Avatar, Menu, MenuItem, Divider, IconButton, Typography, Box } from '@mui/material';
import { IAccountMenuItem } from '../../types/IAccountMenuItem';
import { Link } from 'react-router-dom';
import { Loader } from '../Loader/Loader';

export interface Props {
  userName?: string;
  avatarUrl?: string;
  items?: IAccountMenuItem[];
  isLoading?: boolean;
}

export const AccountMenu = ({ userName, avatarUrl, items = [], isLoading }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const itemsVisible = items.filter((item) => !item.hidden);

  return (
    <>
      <div style={styles.container}>
        {isLoading ? (
          <Box sx={{ mr: 2 }}>
            <Loader size="5px" color="white" />
          </Box>
        ) : null}
        {userName ? (
          <Box sx={{ display: { xs: 'none', md: 'block' }, mr: 2 }}>
            <Typography variant="body2">{userName}</Typography>
          </Box>
        ) : null}
        <IconButton onClick={handleClick} size="small">
          <Avatar src={avatarUrl} alt="avatar" sx={{ width: 32, height: 32 }} />
        </IconButton>
      </div>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={styles.menu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {itemsVisible.map((item, index) => (
          <Link to={item.path || '/'} key={`${item.path}-${index}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            <MenuItem>{item.text}</MenuItem>
            {item.divider ? <Divider key={`${item.path}-${index}-divider`} /> : null}
          </Link>
        ))}
      </Menu>
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  menu: {
    elevation: 0,
    sx: {
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      mt: 1.5,
      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor: 'background.paper',
        transform: 'translateY(-50%) rotate(45deg)',
        zIndex: 0,
      },
    },
  },
};
