import React from 'react';
import { Send as SendIcon } from '@ppe/icons';
import { Grid, TextField } from '@ppe/ui';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from '@ppe/translation';
import { LoadingButton } from '@mui/lab';
import { IContactData } from '../../types/IContactData';

export interface Props {
  onSend?: (_: IContactData) => void;
  isSubmitting?: boolean;
  resetForm?: boolean;
  colorFontLight?: boolean;
}

const defaultValues: IContactData = {
  name: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

export const ContactForm = ({ onSend, isSubmitting, resetForm, colorFontLight }: Props) => {
  const { t } = useTranslation();

  const msgRequired = t('contactForm.requiredField', 'Required field');

  const validationSchema = z.object({
    name: z.string().min(1, msgRequired),
    lastName: z.string().min(1, msgRequired),
    email: z
      .string()
      .min(1, msgRequired)
      .email({ message: t('contactForm.emailInvalid', 'Email must be valid') }),
    phone: z.string().min(1, msgRequired),
    subject: z.string().min(1, msgRequired),
    message: z.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues, resolver: zodResolver(validationSchema) });

  const onSubmit = (data: IContactData) => {
    if (onSend) return onSend(data);
  };

  React.useEffect(() => {
    if (resetForm) return reset();
  }, [resetForm]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container rowSpacing={2} columnSpacing={2} sx={styles.container}>
        <Grid item xs={12} lg={6}>
          <TextField
            {...register('name')}
            label={`${t('contactForm.name', 'Name')} *`}
            placeholder={t('contactForm.namePlaceholder', 'Ex. John')}
            fullWidth
            error={Boolean(errors?.name)}
            helperText={errors?.name?.message}
            margin="dense"
            sx={{ '& .MuiOutlinedInput-input': { color: colorFontLight ? 'common.white' : null } }}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            {...register('lastName')}
            label={`${t('contactForm.lastname', 'Last Name')} *`}
            placeholder={t('contactForm.lastnamePlaceholder', 'Ex. Doe')}
            fullWidth
            error={Boolean(errors?.lastName)}
            helperText={errors?.lastName?.message}
            margin="dense"
            sx={{ '& .MuiOutlinedInput-input': { color: colorFontLight ? 'common.white' : null } }}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            {...register('email')}
            label={`${t('contactForm.email', 'Email')} *`}
            placeholder={t('contactForm.emailPlaceholder', 'johndoe@email.com')}
            fullWidth
            error={Boolean(errors?.email)}
            helperText={errors?.email?.message}
            margin="dense"
            sx={{ '& .MuiOutlinedInput-input': { color: colorFontLight ? 'common.white' : null } }}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            {...register('phone')}
            label={`${t('contactForm.phone', 'Phone')} *`}
            placeholder={t('contactForm.phonePlaceholder', '+56 9 1234 5678')}
            fullWidth
            error={Boolean(errors?.phone)}
            helperText={errors?.phone?.message}
            margin="dense"
            sx={{ '& .MuiOutlinedInput-input': { color: colorFontLight ? 'common.white' : null } }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('subject')}
            label={`${t('contactForm.subject', 'Subject')} *`}
            placeholder={t('contactForm.subjectPlaceholder', 'Ex. I want more information')}
            fullWidth
            error={Boolean(errors?.subject)}
            helperText={errors?.subject?.message}
            margin="dense"
            sx={{ '& .MuiOutlinedInput-input': { color: colorFontLight ? 'common.white' : null } }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('message')}
            label={t('contactForm.message', 'Message')}
            placeholder={t('contactForm.messagePlaceholder', 'Message details')}
            margin="dense"
            fullWidth
            multiline
            rows={4}
            sx={{ '& .MuiOutlinedInput-input': { color: colorFontLight ? 'common.white' : null } }}
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            loading={isSubmitting}
            loadingPosition="start"
            startIcon={<SendIcon />}
            variant="contained"
            type="submit"
            color="primary"
            fullWidth
          >
            {t('contactForm.button', 'send message')}
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

const styles = {
  container: {
    '& .MuiOutlinedInput-root, & .MuiOutlinedInput-root:hover': {
      fieldset: {
        borderColor: 'primary.main',
      },
    },
    '& .MuiFormLabel-root': {
      color: 'primary.main',
    },
  },
};
