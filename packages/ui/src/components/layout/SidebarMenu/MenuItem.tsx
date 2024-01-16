import React from 'react';
import { Collapse, ListItemButton, Box, Typography } from '@mui/material';
import { ExpandMore as ExpandIcon, ChevronRight as ArroRightIcon } from '@ppe/icons';
import { IMenuItem } from '../../../types/IMenuItem';
import { Link, useLocation } from 'react-router-dom';
import { grey } from '@mui/material/colors';

const BASE_PADDING = 2;

const isInTree = (path: string, root: IMenuItem) => {
  if (root.path === path) return true;

  if (root.subItems) {
    for (let ii = 0; ii < root.subItems.length; ii++) {
      if (isInTree(path, root.subItems[ii])) return true;
    }
  }
  return false;
};

interface Props {
  item: IMenuItem;
  level?: number;
}
const MenuItem = ({ item, level = 0 }: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const { pathname } = useLocation();

  React.useEffect(() => {
    if (!isOpen) {
      setIsOpen(isInTree(pathname, item));
    }
  }, [pathname]);

  const pl = BASE_PADDING + level * 2;

  if (item.subItems) {
    return (
      <>
        <ListItemButton onClick={() => setIsOpen(!isOpen)} sx={{ pl }}>
          {isOpen ? <ExpandIcon fontSize="small" sx={{ ml: -1 }} /> : <ArroRightIcon fontSize="small" sx={{ ml: -1 }} />}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {item.icon ? <item.icon fontSize="small" sx={{ mr: 1 }} /> : null}
            <Typography variant="body2">{item.text}</Typography>
          </div>
        </ListItemButton>

        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          {item.subItems.map((subItem, index) => (
            <MenuItem key={`${index}-${subItem.text}`} item={subItem} level={level + 1} />
          ))}
        </Collapse>
      </>
    );
  }

  if (item.hidden) return null;

  return (
    <Box sx={styles.button}>
      <Link to={item.path || '/'}>
        <ListItemButton sx={{ pl: level === 0 ? pl : pl - 0.5 }} className={item.path === pathname ? 'activeClass' : ''}>
          {item.icon ? <item.icon fontSize="small" sx={{ mr: 1 }} /> : null}
          <Typography variant="body2">{item.text}</Typography>
        </ListItemButton>
      </Link>
    </Box>
  );
};

export default MenuItem;

const styles = {
  button: {
    '& a': {
      color: 'inherit',
      textDecoration: 'none',
    },
    '& div': {
      minHeight: 45,
    },
    '& .activeClass': {
      color: 'primary.main',
      borderColor: 'primary.main',
      borderRight: '4px solid',
      backgroundColor: grey[200],
      '& p': {
        fontWeight: '700',
      },
    },
    '&:hover': {
      backgroundColor: grey[100],
    },
  },
};
