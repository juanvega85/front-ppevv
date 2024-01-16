import React from 'react';
import { useTranslation } from '@ppe/translation';
import { Box, Fab, showToast, Modal, BoxTitled } from '@ppe/ui';
import { Add as AddIcon } from '@ppe/icons';
import { IDataSource } from '../data/IDataSource';
import { IPermissions } from '@ppe/authentication';
import { useSites } from '@ppe/sites';
import { useShifts } from '../hooks/useShifts';
import { ShiftForm } from './ShiftForm';
import { ShiftsList } from './ShiftsList';

interface Props {
  dataSource: IDataSource;
  permissions: IPermissions;
}

export const ShiftsPage = ({ dataSource, permissions }: Props) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const toggle = () => setOpen(!open);
  const { canCreate } = permissions;

  const { data: sitesData, status: statusSites } = useSites(dataSource);
  const { data: shifts, status: statusShifts } = useShifts(dataSource);

  if (statusSites === 'error' || statusShifts === 'error') {
    showToast('Api data error', 'error');
  }

  const isLoading = statusSites === 'loading' || statusShifts === 'loading';
  const sites = sitesData?.sort((a, b) => (a.name > b.name ? 1 : -1)) || [];

  return (
    <BoxTitled title={t('pages.shifts', 'Shifts')} sx={{ p: 0 }}>
      <Box sx={{ float: 'right' }}>
        <Fab color="primary" onClick={toggle} size="small" disabled={isLoading || !canCreate} sx={{ m: 2 }}>
          <AddIcon />
        </Fab>
      </Box>
      <Modal open={open} onClose={toggle} title={t('shifts.createNew', 'Create new shifts')}>
        <ShiftForm sites={sites} onCloseDialog={toggle} dataSource={dataSource} />
      </Modal>

      <ShiftsList shifts={shifts || []} sites={sites} isLoading={isLoading} dataSource={dataSource} permissions={permissions} />
    </BoxTitled>
  );
};
