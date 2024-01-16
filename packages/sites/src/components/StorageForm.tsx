import React from 'react';
import { useTranslation } from '@ppe/translation';
import { TextField, MenuItem, Grid, InputAddress, Button, Box } from '@ppe/ui';
import { IAddress } from '@ppe/common';
import { IProfile } from '@ppe/profiles';
import { IStorage } from '../types/IStorage';

interface Props {
  profiles?: IProfile[];
  onFinish?: (storage: IStorage) => void;
}

export const StorageForm = ({ profiles = [], onFinish }: Props) => {
  const { t } = useTranslation();

  const [address, setAddress] = React.useState<IAddress | null>(null);
  const [responsibleId, setResponsibleId] = React.useState('');
  const [notes, setNotes] = React.useState<string>('');
  const [resetFlag, setResetFlag] = React.useState(0);

  const handleAddNew = () => {
    const responsibleProfile = profiles.find((profile) => profile.id === responsibleId);
    if (address && responsibleProfile) {
      const data: IStorage = {
        address,
        responsible: responsibleProfile,
        notes,
      };
      setAddress(null);
      setResetFlag(resetFlag + 1);
      setResponsibleId('');
      setNotes('');
      onFinish?.(data);
    }
  };

  const handleChangeUnit = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (address) {
      setAddress({ ...address, unit: event.target.value });
    }
  };

  return (
    <>
      <Grid container columnSpacing={2}>
        <Grid item xs={10}>
          <InputAddress
            label={t('storage.address', 'Address')}
            value={address}
            onChange={setAddress}
            countries={['cl']}
            reset={resetFlag}
            size="small"
            margin="normal"
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label={t('storage.unit', 'Unit')}
            value={address?.unit || ''}
            onChange={handleChangeUnit}
            disabled={!address}
            margin="normal"
            size="small"
            fullWidth
          />
        </Grid>
      </Grid>
      <TextField
        select
        label={t('storage.contact', 'Contact')}
        defaultValue=""
        value={responsibleId}
        onChange={(e) => setResponsibleId(e.target.value)}
        fullWidth
        margin="normal"
        size="small"
      >
        {profiles?.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.firstName} {item.lastName}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        margin="normal"
        label={t('storage.notes', 'Notes')}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        size="small"
      />
      <Box sx={{ textAlign: 'right', my: 2 }}>
        <Button variant="outlined" onClick={handleAddNew} disabled={!address || !responsibleId}>
          {t('storage.addNew', 'Add equipment custodian')}
        </Button>
      </Box>
    </>
  );
};
