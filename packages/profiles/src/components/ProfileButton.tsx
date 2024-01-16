import React from 'react';
import { ButtonBase, Typography, colors } from '@ppe/ui';
import { ProfileViewModal } from './ProfileViewModal';
import { Man as ManIcon, Woman as WomanIcon } from '@ppe/icons';
import { useTranslation } from '@ppe/translation';
import { IProfile } from '../types/IProfile';
import { ITeam } from '@ppe/teams';

const { indigo, red, grey } = colors;

interface Props {
  data: IProfile;
}

export const ProfileButton = ({ data }: Props) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ButtonBase sx={styles} onClick={handleClickOpen}>
        <div style={{ display: 'flex' }}>
          {data.gender === 'Male' ? <ManIcon fontSize="medium" htmlColor={indigo[600]} /> : <WomanIcon fontSize="medium" htmlColor={red[800]} />}
          <div>
            <Typography align="left">{`${data.firstName} ${data.lastName}`}</Typography>
            <Typography align="left" variant="body2">
              {t('profile.teamName', 'Team: {{team}}', { team: (data.team as ITeam).name })}
            </Typography>
          </div>
        </div>
      </ButtonBase>

      {/* <ProfileViewModal data={data} handleClose={handleClose} open={open} /> */}
    </>
  );
};

export const styles = {
  backgroundColor: grey[100],
  border: `1px solid ${grey[300]}`,
  boxShadow: 2,
  borderRadius: '3px',
  cursor: 'pointer',
  display: 'inline-block',
  fontWeight: '400',
  p: 1,
  width: '100%',

  '&:hover': {
    border: `1px solid ${grey[400]}`,
    boxShadow: 1,
  },
};
