import ReCaptcha from './ReCaptcha';
import React from 'react';
import { EmailOutlined as EmailIcon } from '@ppe/icons';
import { FormHelperText, InputAdornment, TextField } from '@ppe/ui';
import { IRecoverPasswordData } from '../../types/IRecoverPasswordData';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { useTranslation } from '@ppe/translation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export interface Props {
  onSend?: (_: IRecoverPasswordData) => void;
  isLoading?: boolean;
  apiKey: string;
}

const defaultValues: IRecoverPasswordData = {
  email: '',
};

export const RecoverPasswordForm = ({ onSend, isLoading, apiKey }: Props) => {
  const [captcha, setCaptcha] = React.useState<string | null>(null);
  const { t } = useTranslation();

  const validationSchema = z.object({
    email: z
      .string()
      .min(1, { message: t('validation.required', 'Required field') })
      .email({ message: t('login.emailInvalid', 'Email must be valid') }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, submitCount },
  } = useForm({ defaultValues, resolver: zodResolver(validationSchema) });

  const onSubmit = async (data: IRecoverPasswordData) => {
    if (onSend && captcha) {
      onSend(data);
    }
  };

  const onChange = (token: string | null) => {
    setCaptcha(token);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        size="small"
        {...register('email')}
        label={t('login.email', 'Email')}
        type="email"
        placeholder={t('login.emailPlaceholder', 'user@email.com')}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
        fullWidth
        error={Boolean(errors?.email)}
        helperText={errors?.email?.message}
        margin="normal"
      />
      <ReCaptcha onChange={onChange} siteKey={apiKey} />
      {!captcha && submitCount ? (
        <FormHelperText error variant="outlined">
          {t('recover.reCaptcha', 'Please verify that you are a human')}
        </FormHelperText>
      ) : null}
      <LoadingButton loading={isLoading} variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
        {t('recover.send', 'Recover password')}
      </LoadingButton>
    </form>
  );
};
