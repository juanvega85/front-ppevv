import React from 'react';
import { Box, IconButton, Menu, MenuItem, ListItemText, ListItemIcon } from '@ppe/ui';
import { MoreVert as MoreIcon, Edit as EditIcon, Delete as DeleteIcon, FmdGood as PinIcon } from '@ppe/icons';
import { useTranslation } from '@ppe/translation';
import { IPermissions } from '@ppe/authentication';
import { ISite } from '../types/ISite';

export type SiteAction = 'view' | 'edit' | 'delete';

interface Props {
  data: ISite;
  onAction: (action: SiteAction, data: ISite) => void;
  permissions: IPermissions;
}

export const SiteActionsTable = ({ data, onAction, permissions }: Props) => {
  const { t } = useTranslation();
  const { canRead, canUpdate, canDelete } = permissions;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action: SiteAction) => {
    onAction(action, data);
    handleClose();
  };

  return (
    <Box sx={{ textAlign: 'right' }}>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreIcon />
      </IconButton>
      <Menu id="long-menu" MenuListProps={{ 'aria-labelledby': 'long-button' }} anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => handleAction('view')} disabled={!canRead}>
          <ListItemIcon>
            <PinIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('site.view', 'View site')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction('edit')} disabled={!canUpdate}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('site.edit', 'Edit site')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction('delete')} disabled={!canDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('site.remove', 'Remove site')}</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};
