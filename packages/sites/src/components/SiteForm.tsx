import React from 'react';
import {
  Box,
  LoadingButton,
  TextField,
  MenuItem,
  InputAddress,
  Tab,
  TabContext,
  TabList,
  TabPanel,
  Switch,
  FormControlLabel,
  SelectMultiple,
  Typography,
  MapPickerLocation,
  showToast,
} from '@ppe/ui';
import { useTranslation } from '@ppe/translation';
import { IAddress } from '@ppe/common';
import { IDataSource } from '../data/IDataSource';
import { StorageForm } from './StorageForm';
import { StorageList } from './StorageList';
import { ISite } from '../types/ISite';
import { IStorage } from '../types/IStorage';
import { useCreateSites } from '../hooks/useCreateSites';
import { useProfilesByRole } from '@ppe/profiles';
import { useUpdateSites } from '../hooks/useUpdateSites';

const defaultLocation = { lat: '-33.5775918', lng: '-70.5840468' };

type TabsType = 'general' | 'managers' | 'storage';

interface Props {
  data?: ISite;
  onFinish?: () => void;
  dataSource: IDataSource;
  apiKey?: string;
}

export const SiteForm = ({ data, onFinish, dataSource, apiKey = '' }: Props) => {
    const [currentTab, setCurrentTab] = React.useState('general');
  const { t } = useTranslation();
  const [name, setName] = React.useState(data?.name ?? '');
  const [description, setDescription] = React.useState(data?.description ?? '');
  const [address, setAddress] = React.useState<IAddress | null>(null);
  const [coordinates, setCoordinates] = React.useState(data?.coordinates ?? defaultLocation);

  const [primaryResponsibleId, setPrimaryResponsibleId] = React.useState(data?.primaryResponsible?.id ?? '');
  const [secondaryResponsibleIds, setSecondaryResponsibleIds] = React.useState<string[]>(data?.secondaryResponsible?.map((item) => item.id) ?? []);
  const [storages, setStorages] = React.useState<IStorage[]>(data?.storage || []);
  const [active, setActive] = React.useState(data?.active ?? false);
  const [hasTried, setHasTried] = React.useState(false);

  const currentId = data?.id;
  const editMode = currentId != null;

  const { create, status: statusCreate, reset: resetCreateStatus } = useCreateSites(dataSource);
  const { update, status: statusUpdate, reset: resetUpdateStatus, error: errorUpdate } = useUpdateSites(dataSource);
  const { data: managers } = useProfilesByRole(dataSource, 'managerRoleId');
  const { data: custodians } = useProfilesByRole(dataSource, 'custodianRoleId');

  const handleAddressChange = (address: IAddress | null) => {
    if (address?.coordinates) {
      setCoordinates(address.coordinates);
    }
    setAddress(address);
  };

  const handleSubmit = () => {
    if (name && coordinates) {
      const site: Omit<ISite, 'id'> = {
        name,
        description,
        coordinates,
        primaryResponsible: managers.find((item) => item.id === primaryResponsibleId) || undefined,
        secondaryResponsible: managers.filter((item) => secondaryResponsibleIds.includes(item.id)) || [],
        storage: storages,
        active,
      };

      if (editMode) {
        const siteWithId: ISite = { id: currentId, ...site };
        update([siteWithId]);
      } else {
        create([site]);
      }
    } else {
      setHasTried(true);
    }
  };

  const onAddStorage = (storage: IStorage) => setStorages([...storages, storage]);

  const onRemoveStorage = (index: number) => {
    const newArray = [...storages];
    newArray.splice(index, 1);
    setStorages(newArray);
  };

  React.useEffect(() => {
    if (statusCreate === 'success') {
      showToast(t('site.createdSuccessfully', 'Created successfully'), 'success');
      resetCreateStatus();
      onFinish?.();
    }
  }, [statusCreate]);

  React.useEffect(() => {
    if (statusUpdate === 'success') {
      showToast(t('site.updatedSuccessfully', 'Updated successfully'), 'success');
      resetUpdateStatus();
      onFinish?.();
    }
    if (statusUpdate === 'error') {
      showToast((errorUpdate as Error).name, 'error');
      resetUpdateStatus();
    }
  }, [statusUpdate]);

  const isLoading = statusCreate === 'loading' || statusUpdate === 'loading';

  return (
    <>
      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={(_, value) => setCurrentTab(value as TabsType)} scrollButtons="auto" variant="scrollable">
            <Tab label={t('site.generalInformation', 'General information')} value="general" />
            <Tab label={t('site.managers', 'Managers')} value="managers" />
            <Tab label={t('site.storage', 'Storage')} value="storage" />
          </TabList>
        </Box>
        <TabPanel value="general" sx={{ p: 0, pt: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label={t('site.name', 'Name')}
            error={hasTried && !name}
            helperText={hasTried && !name && t('validation.required', 'Required field')}
            size="small"
          />
          <TextField
            fullWidth
            margin="normal"
            label={t('site.description', 'Description')}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size="small"
          />
          <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
            {`${t('site.enterApproximateAddress', 'Enter an approximate address and then select the point in map')}:`}
          </Typography>

          <InputAddress
            label={t('site.address', 'Address site')}
            onChange={handleAddressChange}
            value={address}
            countries={['cl']}
            size="small"
            margin="none"
            sx={{ mb: 2 }}
          />
          <MapPickerLocation location={coordinates} onChangeLocation={setCoordinates} apiKey={apiKey} />
        </TabPanel>

        <TabPanel value="managers" sx={{ p: 0, pt: 2 }}>
          <TextField
            select
            label={t('site.primaryResponsible', 'Overseer')}
            defaultValue=""
            value={primaryResponsibleId}
            onChange={(e) => setPrimaryResponsibleId(e.target.value)}
            fullWidth
            margin="normal"
            size="small"
          >
            {managers.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.firstName} {item.lastName}
              </MenuItem>
            ))}
          </TextField>

          <SelectMultiple
            name="helpers"
            label={t('site.secondaryResponsible', 'Helpers')}
            options={managers.map((item) => ({ value: item.id, label: `${item.firstName} ${item.lastName}` }))}
            onChange={setSecondaryResponsibleIds}
            value={secondaryResponsibleIds}
            size="small"
          />
        </TabPanel>

        <TabPanel value="storage" sx={{ p: 0, pt: 2 }}>
          <StorageForm profiles={custodians} onFinish={onAddStorage} />
          <StorageList data={storages} onRemoveItem={onRemoveStorage} />
        </TabPanel>
      </TabContext>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <FormControlLabel
          control={<Switch checked={active} onChange={(e) => setActive(e.target.checked)} />}
          label={active ? t('site.enabled', 'Enabled') : t('site.disabled', 'Disabled')}
        />
        <LoadingButton onClick={handleSubmit} variant="contained" loading={isLoading} size="small">
          {editMode ? t('general.update', 'Update') : t('general.create', 'Create')}
        </LoadingButton>
      </Box>
    </>
  );
};
