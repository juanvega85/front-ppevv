import React from 'react';
import { Box, IconButton, Menu, MenuItem, ListItemText, ListItemIcon } from '@ppe/ui';
import { MoreVert as MoreIcon, Edit as EditIcon, Delete as DeleteIcon, ManageAccounts as RolesIcon, Visibility as ViewIcon } from '@ppe/icons';
import { useTranslation } from '@ppe/translation';
import { IPermissions } from '@ppe/authentication';
import { IProfile } from '../types/IProfile';

export type ProfileAction = 'view' | 'edit' | 'editRoles' | 'delete';

interface Props {
  data: IProfile;
  onAction: (action: ProfileAction, data: IProfile) => void;
  permissions: IPermissions;
}

export const ProfileActionsTable = ({ data, onAction, permissions }: Props) => {
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

  const handleAction = (action: ProfileAction) => {
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
            <ViewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('profile.view', 'View profile')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction('edit')} disabled={!canUpdate}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('profile.edit', 'Edit profile')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction('editRoles')} disabled={!canUpdate}>
          <ListItemIcon>
            <RolesIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('profile.editRoles', 'Edit roles')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction('delete')} disabled={!canDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('profile.remove', 'Remove profile')}</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};
