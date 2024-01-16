import React from 'react';
import { useTranslation } from '@ppe/translation';
import { Box, ConfirmDialog, Fab, showToast, TableAdvanced, Modal } from '@ppe/ui';
import { Add as AddIcon } from '@ppe/icons';
import { IPermissions } from '@ppe/authentication';
import { ProfileAction, ProfileActionsTable } from './ProfileActionsTable';
import { ProfileForm } from './ProfileForm';
import { ProfileViewModal } from './ProfileViewModal';
import { IDataSource } from '../data/IDataSource';
import { RolesForm } from './RolesForm';
import { IProfile } from '../types/IProfile';
import { useProfiles } from '../hooks/useProfiles';
import { useRemoveProfile } from '../hooks/useRemoveProfile';

interface Props {
  dataSource: IDataSource;
  permissions: IPermissions;
}

export const ProfileCrud = ({ dataSource, permissions }: Props) => {
  const [modal, setModal] = React.useState(false);
  const [modalRoles, setModalRoles] = React.useState(false);
  const [modalView, setModalView] = React.useState(false);
  const { data, status: statusProfiles, error: errorProfiles } = useProfiles(dataSource);
  const [profile, setProfile] = React.useState<IProfile | undefined>(undefined);
  const [isDeletingId, setIsDeletingId] = React.useState<string | null>(null);
  const { t, i18n } = useTranslation();
  const { canCreate } = permissions;

  const { remove, status: statusRemove, error: errorRemove, reset: resetRemove } = useRemoveProfile(dataSource);

  const toggleModal = () => setModal(!modal);
  const toggleModalRoles = () => setModalRoles(!modalRoles);
  const toggleModalView = () => setModalView(!modalView);

  const handleCreate = () => {
    setProfile(undefined);
    toggleModal();
  };

  const handleAction = (action: ProfileAction, data: IProfile) => {
    switch (action) {
      case 'view':
        setProfile(data);
        toggleModalView();
        break;
      case 'edit':
        setProfile(data);
        toggleModal();
        break;
      case 'editRoles':
        handleEditRoles(data);
        break;
      case 'delete':
        setProfile(data);
        setIsDeletingId(data.id);
        break;
    }
  };

  const handleEditRoles = (profile: IProfile) => {
    setProfile(profile);
    toggleModalRoles();
  };

  const handleRemove = () => {
    if (isDeletingId) {
      remove(isDeletingId);
      setIsDeletingId(null);
    }
  };

  const handleFinishCreate = (newProfile: IProfile | null) => {
    toggleModal();
    if (newProfile) {
      handleEditRoles(newProfile!);
    }
  };

  if (statusProfiles === 'error') showToast((errorProfiles as Error).message, 'error');

  React.useEffect(() => {
    if (statusRemove === 'error') {
      showToast((errorRemove as Error).message, 'error');
      resetRemove();
    }
  }, [statusRemove]);

  const columns = React.useMemo(
    () => [
      {
        header: t('profile.firstName', 'Name'),
        accessorKey: 'firstName',
      },
      {
        header: t('profile.lastName', 'Last Name'),
        accessorKey: 'lastName',
      },
      {
        header: t('profile.team', 'Team'),
        accessorKey: 'team.name',
      },
    ],
    [i18n.language]
  );

  return (
    <>
      <Box sx={{ textAlign: 'right', m: 2 }}>
        <Fab color="primary" onClick={handleCreate} size="small" disabled={!canCreate}>
          <AddIcon />
        </Fab>
      </Box>

      <Modal open={modal} onClose={toggleModal} title={profile ? t('profile.edit', 'Edit profile') : t('profile.createNew', 'Create new profile')}>
        <ProfileForm data={profile} onFinish={handleFinishCreate} dataSource={dataSource} />
      </Modal>

      {profile && (
        <Modal open={modalRoles} onClose={toggleModalRoles} title={`${profile.firstName} ${profile.lastName}`} size="xs">
          <RolesForm userId={profile.id} onFinish={toggleModalRoles} dataSource={dataSource} />
        </Modal>
      )}

      {profile && <ProfileViewModal open={modalView} data={profile} handleClose={toggleModalView} />}

      <TableAdvanced
        data={data}
        columns={columns}
        enableRowActions
        state={{ isLoading: statusProfiles === 'loading' }}
        renderRowActions={({ row }) => <ProfileActionsTable data={row.original as IProfile} onAction={handleAction} permissions={permissions} />}
      />

      <ConfirmDialog
        open={Boolean(isDeletingId)}
        onAccept={handleRemove}
        title={t('profile.remove', 'Remove profile')}
        onClose={() => setIsDeletingId(null)}
      >
        {`${profile?.firstName} ${profile?.lastName}`}
      </ConfirmDialog>
    </>
  );
};
