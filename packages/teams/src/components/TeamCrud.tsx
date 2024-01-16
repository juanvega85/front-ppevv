import React from 'react';
import { useTranslation } from '@ppe/translation';
import { Box, ConfirmDialog, Fab, showToast, TableAdvanced, Modal } from '@ppe/ui';
import { Add as AddIcon } from '@ppe/icons';
import { TeamActionsTable, TeamAction } from './TeamActionsTable';
import { IDataSource } from '../data/IDataSource';
import { IPermissions } from '@ppe/authentication';
import { useTeams } from '../hooks/useTeams';
import { useRemoveTeam } from '../hooks/useRemoveTeam';
import { ITeam } from '../types/ITeam';
import { TeamForm } from './TeamForm';

interface Props {
  dataSource: IDataSource;
  permissions: IPermissions;
}

export const TeamCrud = ({ dataSource, permissions }: Props) => {
  const { data, status: statusTeams, error: errorTeams } = useTeams(dataSource);
  const [modal, setModal] = React.useState(false);
  const [team, setTeam] = React.useState<ITeam | undefined>(undefined);
  const [isDeletingId, setIsDeletingId] = React.useState<string | null>(null);
  const { t, i18n } = useTranslation();
  const { canCreate } = permissions;

  const { remove, status: statusRemove, error: errorRemove, reset } = useRemoveTeam(dataSource);

  const toggleModal = () => setModal(!modal);

  const handleCreate = () => {
    setTeam(undefined);
    toggleModal();
  };

  const handleAction = (action: TeamAction, data: ITeam) => {
    switch (action) {
      case 'edit':
        setTeam(data);
        toggleModal();
        break;
      case 'delete':
        setTeam(data);
        setIsDeletingId(data.id);
        break;
    }
  };

  const handleRemove = () => {
    if (isDeletingId) {
      remove(isDeletingId);
      setIsDeletingId(null);
    }
  };

  if (statusTeams === 'error') showToast((errorTeams as Error).message, 'error');
  if (statusRemove === 'error') {
    showToast((errorRemove as Error).message, 'error');
    reset();
  }

  const columns = React.useMemo(
    () => [
      {
        header: t('team.name', 'Name'),
        accessorKey: 'name',
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
      <Modal title={team ? t('team.edit', 'Edit team') : t('team.createNew', 'Create new team')} open={modal} onClose={toggleModal} size="xs">
        <TeamForm defaultValues={team} onFinish={toggleModal} dataSource={dataSource} />
      </Modal>

      <TableAdvanced
        data={data ?? []}
        columns={columns}
        enableRowActions
        state={{ isLoading: statusTeams === 'loading' }}
        renderRowActions={({ row }) => <TeamActionsTable data={row.original as ITeam} onAction={handleAction} permissions={permissions} />}
      />
      <ConfirmDialog
        open={Boolean(isDeletingId)}
        onAccept={handleRemove}
        title={t('team.remove', 'Remove team')}
        onClose={() => setIsDeletingId(null)}
      >
        {team?.name}
      </ConfirmDialog>
    </>
  );
};
