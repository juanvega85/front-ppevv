import React from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Close as CloseIcon } from '@ppe/icons';

export interface Props {
  open?: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  headerless?: boolean;
  children?: React.ReactNode;
}

export const Modal = ({ open = false, title, onClose, size = 'md', headerless, children }: Props) => {
  return (
    <Dialog maxWidth={size} fullWidth open={open} onClose={onClose}>
      {!headerless && (
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {title}
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};
