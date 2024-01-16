import React from 'react';
import { FeedbackPasswordValidation } from './FeedbackPasswordValidation';
import { IResetPasswordData } from '../../types/IResetPasswordData';
import { IconButton, InputAdornment, TextField, Collapse } from '@ppe/ui';
import { LoadingButton } from '@mui/lab';
import { Lock as LockIcon, VisibilityOff as HiddenIcon, Visibility as VisibleIcon, EmailOutlined as EmailIcon } from '@ppe/icons';
import { useForm } from 'react-hook-form';
import { useTranslation } from '@ppe/translation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export interface Props {
  onSend: (_: Omit<IResetPasswordData, 'confirmPassword'>) => void;
  isLoading: boolean;
}

const defaultValues: IResetPasswordData = {
  email: '',
  password: '',
  confirmPassword: '',
};

export const ResetPasswordForm = ({ onSend, isLoading }: Props) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = React.useState(false);
  const [showFeedbackValidation, setShowFeedbackValidation] = React.useState(false);
  const [isValidLength, setIsValidLength] = React.useState(true);
  const [isValidNumber, setIsValidNumber] = React.useState(false);
  const [isValidUppercase, setIsValidUppercase] = React.useState(false);
  const [isValidLowercase, setIsValidLowercase] = React.useState(false);
  const { t } = useTranslation();

  const inputPasswordRef: React.RefObject<HTMLInputElement | null | undefined> = React.useRef();

  const validationSchema = z
    .object({
      email: z
        .string()
        .min(1, { message: t('validation.required', 'Required field') })
        .email({ message: t(`recover.emailInvalid`, 'Email must be valid') }),
      password: z.string().min(8, { message: t('validation.required', 'Required field') }),
      confirmPassword: z.string().min(8, { message: t('validation.required', 'Required field') }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('resetPassword.notMatch', 'Passwords does not match'),
      path: ['confirmPassword'],
    });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues, resolver: zodResolver(validationSchema) });

  const onSubmit = async ({ email, password }: IResetPasswordData) => {
    const data = {
      email,
      password,
    };
    const isValidPassword = isValidLength && isValidNumber && isValidUppercase && isValidLowercase;
    if (isValidPassword) {
      onSend(data);
    } else {
      inputPasswordRef.current?.focus();
    }
  };

  const password = watch('password');

  React.useEffect(() => {
    if (password !== null) {
      setIsValidLength(password.length >= 8);
      setIsValidNumber(/\d/.test(password));
      setIsValidUppercase(/[A-Z]/.test(password));
      setIsValidLowercase(/[a-z]/.test(password));
    }
  }, [password]);

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
      <TextField
        size="small"
        inputRef={inputPasswordRef}
        inputProps={{
          onFocus: () => setShowFeedbackValidation(true),
          onBlur: () => setShowFeedbackValidation(false),
        }}
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
      />
      <Collapse in={showFeedbackValidation}>
        <FeedbackPasswordValidation
          isValidLength={isValidLength}
          isValidNumber={isValidNumber}
          isValidUppercase={isValidUppercase}
          isValidLowercase={isValidLowercase}
        />
      </Collapse>
      <TextField
        size="small"
        {...register('confirmPassword')}
        type={showPasswordRepeat ? 'text' : 'password'}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <IconButton aria-label="toggle password visibility" onClick={() => setShowPasswordRepeat(!showPasswordRepeat)} edge="end">
              {showPasswordRepeat ? <HiddenIcon /> : <VisibleIcon />}
            </IconButton>
          ),
        }}
        label={t('resetPassword.confirmPassword', 'Confirm Password')}
        fullWidth
        error={Boolean(errors?.confirmPassword)}
        helperText={errors?.confirmPassword?.message}
        margin="normal"
      />
      <LoadingButton loading={isLoading} variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
        {t('resetPassword.save', 'Save password')}
      </LoadingButton>
    </form>
  );
};
