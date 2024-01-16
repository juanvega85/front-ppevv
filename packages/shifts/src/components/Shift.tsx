import React from 'react';
import { Delete as DeleteIcon } from '@ppe/icons';
import { IconButton, Switch, Typography, Card, ConfirmDialog, showToast } from '@ppe/ui';
import { addTimes, removeSeconds } from '@ppe/common';
import { useTranslation } from '@ppe/translation';
import { IDataSource } from '../data/IDataSource';
import { IShift } from '../types/IShift';
import { IPermissions } from '@ppe/authentication';
import { useUpdateShifts } from '../hooks/useUpdateShifts';
import { useRemoveShift } from '../hooks/useRemoveShift';

interface Props {
  data: IShift;
  dataSource: IDataSource;
  permissions: IPermissions;
}

export const Shift = ({ data, dataSource, permissions }: Props) => {
  const { t } = useTranslation();
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);
  const { canUpdate, canDelete } = permissions;

  const { update, status: statusUpdate, error: errorUpdate, reset: resetUpdate } = useUpdateShifts(dataSource);
  const { remove, status: statusRemove, error: errorRemove, reset: resetRemove } = useRemoveShift(dataSource);

  const handleUpdate = () => {
    update([{ ...data, active: !data.active }]);
    setIsUpdating(false);
  };

  const handleDelete = () => {
    remove(data.id);
    setIsDeleting(false);
  };

  React.useEffect(() => {
    if (statusRemove === 'error') {
      showToast((errorRemove as Error).message, 'error');
      resetRemove();
    }
  }, [statusRemove]);

  React.useEffect(() => {
    if (statusUpdate === 'error') {
      showToast((errorUpdate as Error).message, 'error');
      resetUpdate();
    }
  }, [statusUpdate]);

  return (
    <>
      <Card variant="outlined" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, mb: 1 }}>
        <div>
          <Typography>{`${removeSeconds(data.startTime)} - ${removeSeconds(addTimes(data.startTime, data.duration))}`}</Typography>
          <Typography>
            <i>{`${t('shifts.duration', 'Duration')}: ${removeSeconds(data.duration)} hrs`}</i>
          </Typography>
        </div>
        <div style={{ textAlign: 'right' }}>
          <Switch checked={data.active} onChange={() => setIsUpdating(true)} disabled={!canUpdate} />
          <IconButton onClick={() => setIsDeleting(true)} disabled={!canDelete}>
            <DeleteIcon />
          </IconButton>
        </div>
      </Card>

      <ConfirmDialog open={isUpdating} onAccept={handleUpdate} title={t('shift.update', 'Update shift')} onClose={() => setIsUpdating(false)} />
      <ConfirmDialog open={isDeleting} onAccept={handleDelete} title={t('shift.remove', 'Remove shift')} onClose={() => setIsDeleting(false)} />
    </>
  );
};
