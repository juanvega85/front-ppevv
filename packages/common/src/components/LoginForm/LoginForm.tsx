import React from 'react';
import { EmailOutlined as EmailIcon, Lock as LockIcon, VisibilityOff as HiddenIcon, Visibility as VisibleIcon } from '@ppe/icons';
import { ILoginData } from '../../types/ILoginData';
import { LoadingButton } from '@mui/lab';
import { TextField, InputAdornment, IconButton } from '@ppe/ui';
import { useForm } from 'react-hook-form';
import { useTranslation } from '@ppe/translation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const defaultValues: ILoginData = {
  email: '',
  password: '',
};

export interface Props {
  onSend?: (_: ILoginData) => void;
  isLoading?: boolean;
}

export const LoginForm = ({ onSend, isLoading }: Props) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { t } = useTranslation();

  const validationSchema = z.object({
    email: z
      .string()
      .min(1, { message: t('validation.required', 'Required field') })
      .email({ message: t('login.emailInvalid', 'Email must be valid') }),
    password: z.string().min(1, { message: t('validation.required', 'Required field') }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: zodResolver(validationSchema) });

  const onSubmit = async (data: ILoginData) => {
    if (onSend) {
      onSend(data);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
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
          size="small"
        />
        <TextField
          {...register('password')}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <HiddenIcon /> : <VisibleIcon />}
              </IconButton>
            ),
          }}
          label={t('login.password', 'Password')}
          fullWidth
          error={Boolean(errors?.password)}
          helperText={errors?.password?.message}
          margin="normal"
          size="small"
        />
        <LoadingButton loading={isLoading} variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
          {t('login.enter', 'Enter')}
        </LoadingButton>
      </form>
    </>
  );
};
