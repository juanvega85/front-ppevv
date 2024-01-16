import React from 'react';
import { Box, Typography, IconButton, colors } from '@ppe/ui';
import { ProfileViewModal } from './ProfileViewModal';
import { Man as ManIcon, Woman as WomanIcon, Backspace as RemoveIcon, PersonAddAlt1 as AddIcon } from '@ppe/icons';
import { styles } from './ProfileButton';
import { useTranslation } from '@ppe/translation';
import { IProfile } from '../types/IProfile';
import { ITeam } from '@ppe/teams';

const { indigo, red } = colors;

interface Props {
  data: IProfile;
  onClickAdd?: (id: string) => void;
  onClickRemove?: (id: string) => void;
}

export const ProfileButtonDraggable = ({ data, onClickAdd, onClickRemove }: Props) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickRemove = (e: any) => {
    e.stopPropagation();
    onClickRemove?.(data.id);
  };

  const handleClickAdd = (e: any) => {
    e.stopPropagation();
    onClickAdd?.(data.id);
  };

  return (
    <>
      <Box sx={styles} onClick={handleClickOpen}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex' }}>
            {data.gender === 'Male' ? <ManIcon fontSize="medium" htmlColor={indigo[600]} /> : <WomanIcon fontSize="medium" htmlColor={red[800]} />}
            <div>
              <Typography align="left">{`${data.firstName} ${data.lastName}`}</Typography>
              <Typography align="left" variant="body2">
                {t('profile.teamName', 'Team: {{team}}', { team: (data.team as ITeam).name })}
              </Typography>
            </div>
          </div>
          {onClickAdd ? (
            <IconButton onClick={handleClickAdd}>
              <AddIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleClickRemove}>
              <RemoveIcon />
            </IconButton>
          )}
        </div>
      </Box>

      <ProfileViewModal data={data} handleClose={handleClose} open={open} />
    </>
  );
};
