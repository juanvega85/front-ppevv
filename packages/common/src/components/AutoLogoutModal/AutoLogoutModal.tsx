import { useTranslation } from '@ppe/translation';
import { Box, Button, Modal, Typography } from '@ppe/ui';
import React from 'react';
import { useIdle } from '../../hooks/useIdle';

interface Props {
  timeOutMinutes?: number;
  timerSeconds?: number;
  onLogout?: () => void;
}

export const AutoLogoutModal = ({ timeOutMinutes = 30, timerSeconds = 30, onLogout }: Props) => {
  const { t } = useTranslation();
  const [timer, setTimer] = React.useState(timerSeconds);
  const { isIdle, resetIdle } = useIdle(timeOutMinutes);

  React.useEffect(() => {
    if (isIdle) {
      setTimer(timerSeconds);
    }
  }, [isIdle]);

  React.useEffect(() => {
    const interval = isIdle ? setInterval(() => setTimer((prev) => prev - 1), 1000) : null;
    if (timer === 0 && interval) {
      clearInterval(interval);
      onLogout?.();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, isIdle]);

  return (
    <Modal open={isIdle} headerless size="xs">
      <Typography style={{ fontWeight: 'bold' }}>{t('autologout.stillThere?', 'Sill there?')}</Typography>
      <Typography variant="caption">{t('autologout.sessionExpiring?', 'Your session is about to expire')}</Typography>
      <Typography sx={{ py: 3, fontSize: '30px', textAlign: 'center' }} component="div" color="primary">{`00:${timer
        .toString()
        .padStart(2, '0')}`}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'end', flexDirection: { xs: 'column', sm: 'row' } }}>
        <Button onClick={onLogout} variant="outlined" color="error" sx={{ mb: { xs: 2, sm: 0 }, mr: { sm: 2 } }}>
          {t('autologout.signOut', 'Sign out')}
        </Button>
        <Button onClick={resetIdle} variant="contained">
          {t('autologout.stayLoggedIn', 'Stay logged in')}
        </Button>
      </Box>
    </Modal>
  );
};
