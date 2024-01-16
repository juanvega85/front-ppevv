import React from 'react';
import { useTranslation } from '@ppe/translation';
import { Box, ConfirmDialog, Fab, showToast, TableAdvanced, Modal } from '@ppe/ui';
import { Add as AddIcon } from '@ppe/icons';
import { SiteForm } from './SiteForm';
import { SiteActionsTable, SiteAction } from './SiteActionsTable';
import { IDataSource } from '../data/IDataSource';
import { IPermissions } from '@ppe/authentication';
import { useSites } from '../hooks/useSites';
import { useRemoveSite } from '../hooks/useRemoveSite';
import { ISite } from '../types/ISite';
import { SiteViewModal } from './SiteViewModal';

interface Props {
  dataSource: IDataSource;
  permissions: IPermissions;
  apiKey: string;
}

export const SiteCrud = ({ dataSource, permissions, apiKey }: Props) => {
  const { data, status: statusSites, error: errorSites } = useSites(dataSource);
  const { remove, status: statusRemove, error: errorRemove, reset: resetRemove } = useRemoveSite(dataSource);

  const [modal, setModal] = React.useState(false);
  const [modalView, setModalView] = React.useState(false);
  const [site, setSite] = React.useState<ISite | undefined>(undefined);
  const [isDeletingId, setIsDeletingId] = React.useState<string | null>(null);
  const { t, i18n } = useTranslation();

  const { canCreate } = permissions;

  const toggleModal = () => setModal(!modal);
  const toggleModalView = () => setModalView(!modalView);

  const handleCreate = () => {
    setSite(undefined);
    toggleModal();
  };

  const handleAction = (action: SiteAction, data: ISite) => {
    switch (action) {
      case 'view':
        setSite(data);
        toggleModalView();
        break;
      case 'edit':
        setSite(data);
        toggleModal();
        break;
      case 'delete':
        setSite(data);
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

  if (statusSites === 'error') showToast((errorSites as Error).message, 'error');
  if (statusRemove === 'error') {
    showToast((errorRemove as Error).message, 'error');
    resetRemove();
  }

  const columns = React.useMemo(
    () => [
      {
        header: t('site.name', 'Name'),
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
      <Modal title={site ? t('site.edit', 'Edit site') : t('site.createNew', 'Create new site')} open={modal} onClose={toggleModal}>
        <SiteForm data={site} onFinish={toggleModal} dataSource={dataSource} apiKey={apiKey} />
      </Modal>

      {site && <SiteViewModal open={modalView} data={site} handleClose={toggleModalView} />}

      <TableAdvanced
        data={data}
        columns={columns}
        enableRowActions
        state={{ isLoading: statusSites === 'loading' }}
        renderRowActions={({ row }) => <SiteActionsTable data={row.original as ISite} onAction={handleAction} permissions={permissions} />}
      />
      <ConfirmDialog
        open={Boolean(isDeletingId)}
        onAccept={handleRemove}
        title={t('site.remove', 'Remove site')}
        onClose={() => setIsDeletingId(null)}
      >
        {site?.name}
      </ConfirmDialog>
    </>
  );
};
