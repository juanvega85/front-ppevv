import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useTranslation } from '@ppe/translation';

export interface Props {
  title?: string;
  open: boolean;
  onClose: () => void;
  onAccept: () => void;
  children?: React.ReactNode;
}

export const ConfirmDialog = ({ open = false, onClose, onAccept, title, children }: Props) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onClose={onClose}>
      {title ? <DialogTitle>{title}</DialogTitle> : null}
      <DialogContent>{children || <DialogContentText>{t('general.sure', 'Are you sure?')}</DialogContentText>}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          {t('general.noCancel', 'No, cancel')}
        </Button>
        <Button onClick={onAccept} variant="contained" autoFocus>
          {t('general.yesSure', 'Yes, I am sure')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
