import React from 'react';
import { useGenders, useMaritalStatuses, formatPhone, IAddress, useCheckEmail } from '@ppe/common';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from '@ppe/translation';
import {
  Box,
  Button,
  Grid,
  InputAddress,
  InputAdornment,
  LoadingButton,
  MenuItem,
  showToast,
  TextField,
  Typography,
  SelectMultiple,
  TextFieldMask,
  Loader,
  colors,
} from '@ppe/ui';
import { EmailOutlined as EmailIcon } from '@ppe/icons';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { isBefore, isAfter } from 'date-fns';
import { IProfile } from '../types/IProfile';
import { useCreateProfiles } from '../hooks/useCreateProfiles';
import { useUpdateProfiles } from '../hooks/useUpdateProfiles';
import { useLanguageOptions } from '../constants/useLanguageOptions';
import { useServiceCapacities } from '../constants/useServiceCapacities';
import { useAppointedCapacities } from '../constants/useAppointedCapacities';
import { IDataSource } from '../data/IDataSource';
import { useTeams } from '@ppe/teams';

const { grey } = colors;

export interface IProfileEdit {
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  maritalStatus: string;
  birthDate: string;

  team: string;
  baptismDate: string;
  serviceCapacity: string;
  appointedCapacity: string;
}

interface Props {
  data?: IProfile;
  onFinish?: (newProfile: IProfile | null) => void;
  dataSource: IDataSource;
}

export const ProfileForm = ({ data, onFinish, dataSource }: Props) => {
  const { t } = useTranslation();
  const currentId = data ? data.id : null;
  const editMode = currentId != null;

  const defaultValues: IProfileEdit = data
    ? {
        ...data,
        team: data.team.id,
      }
    : {
        email: '',
        firstName: '',
        lastName: '',
        gender: '',
        maritalStatus: '',
        birthDate: '',

        team: '',
        baptismDate: '',
        serviceCapacity: '',
        appointedCapacity: '',
      };

  const { create, newProfile, status: statusCreate, reset: resetCreate, error: errorCreate } = useCreateProfiles(dataSource);
  const { update, status: statusUpdate, reset: resetUpdate, error: errorUpdate } = useUpdateProfiles(dataSource);

  const genders = useGenders();
  const maritalStatuses = useMaritalStatuses();
  const languagesOptions = useLanguageOptions();
  const serviceCapacities = useServiceCapacities();
  const appointedCapacities = useAppointedCapacities();
  const { data: teams, status: statusTeams } = useTeams(dataSource);

  const [address, setAddress] = React.useState<IAddress | null>((data?.address as IAddress) || null);
  const [selectedLanguages, setSelectedLanguages] = React.useState<string[]>(data?.languages || []);
  const [landLinePhone, setLandLinePhone] = React.useState(formatPhone(data?.landlinePhone) || '');
  const [mobilePhone, setMobilePhone] = React.useState(formatPhone(data?.mobilePhone) || '');

  const [resetFlag, setResetFlag] = React.useState(0);

  const { setEmail, emailExists, status: statusCheckingEmail } = useCheckEmail(dataSource);

  const validationSchema = z.object({
    email: z
      .string()
      .min(1, { message: t('validation.required', 'Required field') })
      .email({ message: t('validation.email', 'Email must be valid') }),

    firstName: z.string().min(1, { message: t('validation.required', 'Required field') }),
    lastName: z.string().min(1, { message: t('validation.required', 'Required field') }),

    gender: z.string().min(1, { message: t('validation.required', 'Required field') }),
    maritalStatus: z.string().min(1, { message: t('validation.required', 'Required field') }),

    birthDate: z
      .string()
      .min(1, { message: t('validation.required', 'Required field') })
      .refine((value) => isBefore(new Date('1900-01-01'), new Date(value)), { message: t('validation.tooOld', 'Too old') })
      .refine((value) => isAfter(new Date(), new Date(value)), { message: t('validation.tooYoung', 'Invalid date') }),

    team: z.string().min(1, { message: t('validation.required', 'Required field') }),

    baptismDate: z
      .string()
      .min(1, { message: t('validation.required', 'Required field') })
      .refine((value) => isBefore(new Date('1900-01-01'), new Date(value)), { message: t('validation.tooOld', 'Too old') })
      .refine((value) => isAfter(new Date(), new Date(value)), { message: t('validation.tooYoung', 'Invalid date') }),

    serviceCapacity: z.string().min(1, { message: t('validation.required', 'Required field') }),
    appointedCapacity: z.string().min(1, { message: t('validation.required', 'Required field') }),
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, submitCount },
  } = useForm({ defaultValues, resolver: zodResolver(validationSchema) });

  const handleClearForm = () => {
    setSelectedLanguages([]);
    setAddress(null);
    setLandLinePhone('');
    setMobilePhone('');

    reset();
    setResetFlag(resetFlag + 1);
  };

  if (statusTeams === 'error') {
    showToast(t('error.loadingData', 'There was an error loading data'), 'error');
  }

  if (emailExists) {
    errors.email = { message: t('error.emailExists', 'Email already exist'), type: 'custom' };
  } else {
    const errorsEmail = errors.email;
    delete errors.email;
    if (errorsEmail && errorsEmail.type !== 'custom') {
      errors.email = errorsEmail;
    }
  }

  const errorLanguages = Boolean(submitCount) && !selectedLanguages.length;
  const errorAddress = Boolean(submitCount) && !address;
  const errorLandLinePhone = Boolean(submitCount) && landLinePhone.length > 3 && landLinePhone.length !== 14;
  const errorMobilePhone = Boolean(submitCount) && mobilePhone.length !== 14;

  const onSubmit = (data: IProfileEdit) => {
    if (address && !errorLanguages && !errorAddress && !errorLandLinePhone && !errorMobilePhone) {
      const dataToSend: Omit<IProfile, 'id'> = {
        ...data,
        languages: selectedLanguages,
        address,
        landlinePhone: landLinePhone.replace(/\D/g, ''),
        mobilePhone: mobilePhone.replace(/\D/g, ''),
        team: {
          id: data.team,
          name: teams?.find((team) => team.id === data.team)?.name || '',
        },
      };
      if (editMode) {
        update([{ ...dataToSend, id: currentId }]);
      } else {
        create([dataToSend]);
      }
    }
  };

  const handleChangeUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (address) {
      setAddress({ ...address, unit: event.target.value });
    }
  };

  React.useEffect(() => {
    const isSuccess = statusUpdate === 'success' || statusCreate === 'success';
    if (isSuccess) {
      showToast(editMode ? t('team.updatedSuccessfully', 'Updated successfully') : t('team.createdSuccessfully', 'Created successfully'), 'success');
      onFinish?.(newProfile);
    }
  }, [statusUpdate, statusCreate]);

  React.useEffect(() => {
    if (statusCreate === 'error') {
      showToast((errorCreate as Error).message, 'error');
      resetCreate();
    }
  }, [statusCreate]);

  React.useEffect(() => {
    if (statusUpdate === 'error') {
      showToast((errorUpdate as Error).message, 'error');
      resetUpdate();
    }
  }, [statusUpdate]);

  const isLoading = statusUpdate === 'loading' || statusCreate === 'loading';

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography color="primary" variant="body2" sx={{ fontWeight: 'bold', textTransform: 'uppercase', mb: 1 }}>
        {t('profile.personalInformation', 'Personal information')}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            {...register('email')}
            type="email"
            label={t('profile.email', 'Email')}
            placeholder={t('profile.emailPlaceholder', 'user@email.com')}
            onBlur={(event) => setEmail(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
              endAdornment:
                statusCheckingEmail === 'loading' ? (
                  <InputAdornment position="start">
                    <Loader size="5px" />
                  </InputAdornment>
                ) : null,
            }}
            fullWidth
            disabled={statusCheckingEmail === 'loading' || editMode}
            error={Boolean(errors?.email)}
            helperText={errors?.email?.message}
            margin="normal"
            size="small"
          />
        </Grid>
      </Grid>

      <Grid container columnSpacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            {...register('firstName')}
            label={t('profile.firstName', 'Name')}
            placeholder={t('profile.firstNamePlaceholder', 'Ex. John')}
            error={Boolean(errors?.firstName)}
            helperText={errors?.firstName?.message}
            margin="normal"
            size="small"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            {...register('lastName')}
            label={t('profile.lastName', 'Last name')}
            placeholder={t('profile.lastNamePlaceholder', 'Ex. Doe')}
            error={Boolean(errors?.lastName)}
            helperText={errors?.lastName?.message}
            margin="normal"
            size="small"
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Controller
            name="gender"
            control={control}
            render={({ field: { ...fieldProps } }) => (
              <TextField
                select
                fullWidth
                SelectProps={{ ...fieldProps }}
                label={t('profile.gender', 'Gender')}
                error={Boolean(errors?.gender)}
                helperText={errors?.gender?.message}
                margin="normal"
                size="small"
              >
                {genders.map((item) => (
                  <MenuItem key={item.label} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Controller
            name="maritalStatus"
            control={control}
            render={({ field: { ...fieldProps } }) => (
              <TextField
                select
                fullWidth
                SelectProps={{ ...fieldProps }}
                label={t('profile.maritalStatus', 'Marital status')}
                error={Boolean(errors?.maritalStatus)}
                helperText={errors?.maritalStatus?.message}
                margin="normal"
                size="small"
              >
                {maritalStatuses.map((item) => (
                  <MenuItem key={item.label} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <SelectMultiple
            name="languages"
            label={t('profile.languages', 'Languages')}
            options={languagesOptions}
            onChange={setSelectedLanguages}
            value={selectedLanguages}
            error={errorLanguages}
            helperText={errorLanguages && t('validation.required', 'Required field')}
            reset={resetFlag}
            size="small"
          />
        </Grid>

        <Grid item xs={12} md={10}>
          <InputAddress
            label={t('profile.address', 'Address')}
            value={address}
            onChange={setAddress}
            countries={['cl']}
            error={errorAddress}
            helperText={errorAddress && t('validation.required', 'Required field')}
            size="small"
            margin="normal"
            reset={resetFlag}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <TextField
            label={t('profile.addressUnit', 'Unit')}
            margin="normal"
            disabled={!address}
            value={address?.unit}
            InputLabelProps={{ shrink: Boolean(address?.unit) }}
            onChange={handleChangeUnit}
            size="small"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            {...register('birthDate')}
            label={t('profile.birthDate', 'Birthdate')}
            type="date"
            fullWidth
            margin="normal"
            error={Boolean(errors?.birthDate)}
            helperText={errors?.birthDate?.message}
            InputLabelProps={{ shrink: true }}
            size="small"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextFieldMask
            label={t('profile.landlinePhone', 'Landline phone')}
            value={landLinePhone}
            mask={/(\d{0,2})(\d{0,1})(\d{0,4})(\d{0,4})/}
            prefix="56"
            onChange={setLandLinePhone}
            error={errorLandLinePhone}
            helperText={errorLandLinePhone && t('validation.invalidPhone', 'Invalid phone')}
            reset={resetFlag}
            size="small"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextFieldMask
            label={t('profile.mobilePhone', 'Mobile phone')}
            value={mobilePhone}
            mask={/(\d{0,2})(\d{0,1})(\d{0,4})(\d{0,4})/}
            prefix="56 9"
            onChange={setMobilePhone}
            error={errorMobilePhone}
            helperText={errorMobilePhone && t('validation.required', 'Required field')}
            reset={resetFlag}
            size="small"
          />
        </Grid>
      </Grid>

      <Typography color="primary" variant="body2" sx={{ fontWeight: 'bold', textTransform: 'uppercase', mt: 5, mb: 1 }}>
        {t('profile.theocraticInformation', 'Theocratic information')}
      </Typography>

      <Grid container columnSpacing={2}>
        <Grid item xs={12} md={8}>
          <Controller
            name="team"
            control={control}
            render={({ field: { ...fieldProps } }) => (
              <TextField
                SelectProps={{ ...fieldProps }}
                select
                fullWidth
                label={t('profile.team', 'Team')}
                error={Boolean(errors?.team)}
                helperText={errors?.team?.message}
                margin="normal"
                disabled={statusTeams === 'loading'}
                size="small"
              >
                {(teams || []).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            {...register('baptismDate')}
            label={t('profile.baptismDate', 'Baptism date')}
            type="date"
            fullWidth
            margin="normal"
            error={Boolean(errors?.baptismDate)}
            helperText={errors?.baptismDate?.message}
            InputLabelProps={{ shrink: true }}
            size="small"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Controller
            name="serviceCapacity"
            control={control}
            render={({ field: { ...fieldProps } }) => (
              <TextField
                select
                fullWidth
                SelectProps={{ ...fieldProps }}
                label={t('profile.serviceCapacity', 'Service capacity')}
                error={Boolean(errors?.serviceCapacity)}
                helperText={errors?.serviceCapacity?.message}
                margin="normal"
                size="small"
              >
                {serviceCapacities.map((item) => (
                  <MenuItem key={item.label} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Controller
            name="appointedCapacity"
            control={control}
            render={({ field: { ...fieldProps } }) => (
              <TextField
                select
                fullWidth
                SelectProps={{ ...fieldProps }}
                label={t('profile.appointedCapacity', 'Appointed capacity')}
                error={Boolean(errors?.appointedCapacity)}
                helperText={errors?.appointedCapacity?.message}
                margin="normal"
                size="small"
              >
                {appointedCapacities.map((item) => (
                  <MenuItem key={item.label} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'right', mt: 5 }}>
        {!editMode && (
          <Button autoFocus onClick={handleClearForm} variant="outlined">
            {t('generic.clear-form', 'Clear')}
          </Button>
        )}

        <LoadingButton
          loading={isLoading}
          loadingIndicator={<Loader size="5px" color={grey[400]} />}
          variant="contained"
          type="submit"
          sx={{ ml: 2 }}
        >
          {editMode ? t('general.update', 'Update') : t('general.create', 'Create')}
        </LoadingButton>
      </Box>
    </form>
  );
};
