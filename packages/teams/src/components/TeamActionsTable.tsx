import React from 'react';
import { Box, IconButton, Menu, MenuItem, ListItemText, ListItemIcon } from '@ppe/ui';
import { MoreVert as MoreIcon, Edit as EditIcon, Delete as DeleteIcon } from '@ppe/icons';
import { useTranslation } from '@ppe/translation';
import { ITeam } from '../types/ITeam';
import { IPermissions } from '@ppe/authentication';

export type TeamAction = 'edit' | 'delete';

export interface Props {
  data: ITeam;
  onAction: (action: TeamAction, data: ITeam) => void;
  permissions: IPermissions;
}

export const TeamActionsTable = ({ data, onAction, permissions }: Props) => {
  const { t } = useTranslation();
  const { canUpdate, canDelete } = permissions;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action: TeamAction) => {
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
        <MenuItem onClick={() => handleAction('edit')} disabled={!canUpdate}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('team.edit', 'Edit team')}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleAction('delete')} disabled={!canDelete}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>{t('team.remove', 'Remove team')}</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};
