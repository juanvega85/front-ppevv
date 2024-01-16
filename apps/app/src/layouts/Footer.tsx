import { useTranslation } from '@ppe/translation';
import { Typography } from '@ppe/ui';
const APP_NAME = import.meta.env.VITE_APP_NAME;

const year = new Date().getFullYear();

const Footer = () => {
  const { t } = useTranslation();

  return (
      <Typography variant="caption" sx={{ py: 1.2 }}>{`${t('footer.copyright', 'All rights reserved.')} ${APP_NAME} © ${year}`}</Typography>
  );
};

export default Footer;
