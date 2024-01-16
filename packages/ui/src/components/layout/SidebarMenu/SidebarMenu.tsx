import MenuItem from './MenuItem';
import { Box, Typography } from '@mui/material';
import { IMenuList } from '../../../types/IMenuList';

export interface Props {
  items: IMenuList[];
  logo?: string;
}

export const SidebarMenu = ({ items, logo }: Props) => {
  const itemsVisible = items.filter((list) => list.items.some((item) => !item.hidden));

  return (
    <>
      {logo ? (
        <Box component="div" p={2}>
          <img src={logo} alt="logo" />
        </Box>
      ) : (
        <Box sx={{ height: { md: '4px' } }} />
      )}
      {itemsVisible.map((list: IMenuList, index) => (
        <div key={`${index}-${list.title}`} style={{ borderBottom: '1px solid lightgray' }}>
          {list.title ? (
            <Typography variant="overline" color="gray" component="div" sx={{ lineHeight: 0, p: 2, pb: 1 }}>
              {list.title}
            </Typography>
          ) : null}
          {list.items.map((item, index) => (
            <MenuItem key={`${index}-${item.text}`} item={item} />
          ))}
        </div>
      ))}
    </>
  );
};
