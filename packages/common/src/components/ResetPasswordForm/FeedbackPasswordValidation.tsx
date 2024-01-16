import { Check as CheckIcon, Close as CloseIcon } from '@ppe/icons';
import { Typography, Box } from '@ppe/ui';
import { useTranslation } from '@ppe/translation';

interface Props {
  isValidLength: boolean;
  isValidNumber: boolean;
  isValidUppercase: boolean;
  isValidLowercase: boolean;
}

export const FeedbackPasswordValidation = ({ isValidLength, isValidNumber, isValidUppercase, isValidLowercase }: Props) => {
  const { t } = useTranslation();

  return (
    <Box pl={1}>
      <Condition isValid={isValidLength} text={t('passwordValidation.qtyCharacters', '8 characters minimum')} />
      <Condition isValid={isValidNumber} text={t('passwordValidation.atLeastNumber', 'At least one number')} />
      <Condition isValid={isValidUppercase} text={t('passwordValidation.atLeastUppercase', 'At least one uppercase letter')} />
      <Condition isValid={isValidLowercase} text={t('passwordValidation.atLeastLowercase', 'At least one lowercase letter')} />
    </Box>
  );
};

interface ConditionProps {
  isValid: boolean;
  text: string;
}

const Condition = ({ isValid, text }: ConditionProps) => {
  return (
    <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}>
      {isValid ? <CheckIcon fontSize="small" sx={{ mr: 1 }} color="success" /> : <CloseIcon fontSize="small" sx={{ mr: 1 }} color="error" />}
      {text}
    </Typography>
  );
};
