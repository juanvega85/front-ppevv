import { IProfile } from '@ppe/profiles';
import React from 'react';
import { useTranslation } from '@ppe/translation';
import { FormControlLabel, FormGroup, LoadingButton, showToast, Checkbox, Divider, TextField, Counter } from '@ppe/ui';
import { useLiterature } from '../constants/useLiterature';
import { IDataSource } from '../data/IDataSource';
import { useCreateReport } from '../hooks/useCreateReport';
import { IShiftReport } from '../types/IShiftReport';
import { ITimeSlot } from '../types/ITimeSlot';

interface Props {
  timeSlot: ITimeSlot;
  onFinish?: () => void;
  dataSource: IDataSource;
}

export const ReportForm = ({ timeSlot, onFinish, dataSource }: Props) => {
  const { t } = useTranslation();
  const literature = useLiterature();

  const [activity, setActivity] = React.useState<Record<string, string>>({});
  const [selectedProfiles, setSelectedProfiles] = React.useState<string[]>([]);
  const [notes, setNotes] = React.useState('');

  const { create, status } = useCreateReport(dataSource);

  const submit = () => {
    const data: IShiftReport = {
      shift: {
        id: timeSlot.shift.id,
      },
      date: timeSlot.date,
      users: selectedProfiles.map((item) => ({
        id: item,
      })),
      activity,
      notes,
      id: timeSlot.id
    };

    create({ shiftId: timeSlot.shift.id, data: [data] });
  };

  const onChangeActivity = (item: string, counter: number) => {
    const newDictionary = { ...activity };
    if (counter) {
      newDictionary[item] = counter.toString();
    } else {
      delete newDictionary[item];
    }
    setActivity(newDictionary);
  };

  const onCheckProfile = (event: React.ChangeEvent<HTMLInputElement>, profileId: string) => {
    const { checked } = event.target;
    let selectedTemp = selectedProfiles;
    if (checked) {
      selectedTemp.push(profileId);
    } else {
      selectedTemp = selectedTemp.filter((item) => item !== event.target.id);
    }
    setSelectedProfiles(selectedTemp);
  };

  const assigned = timeSlot.assigned as IProfile[];

  React.useEffect(() => {
    if (status === 'success') {
      showToast(t('report.created', 'Created successfully'), 'success');
      onFinish?.();
    }
  }, [status]);

  return (
    <>
      <h2>{t('report.literature', 'Literature')}</h2>
      {literature.map((item) => (
        <Counter key={item.value} label={item.label} onChange={(counter) => onChangeActivity(item.value, counter)} />
      ))}
      <h2>{t('report.profiles', 'Profiles')}</h2>
      <div>
        {assigned.map((item) => (
          <FormGroup key={item.id}>
            <FormControlLabel
              control={<Checkbox onChange={(e: React.ChangeEvent<HTMLInputElement>) => onCheckProfile(e, item.id)} />}
              label={`${item.firstName} ${item.lastName}`}
            />
          </FormGroup>
        ))}
      </div>

      <TextField
        label={t('report.notes', 'Notes')}
        multiline
        fullWidth
        rows={3}
        onChange={(e) => {
          setNotes(e.target.value);
        }}
        sx={{ my: 2 }}
      />

      <Divider />

      <div style={{ textAlign: 'right' }}>
        <LoadingButton onClick={submit} variant="contained" loading={status === 'loading'} sx={{ mt: 2 }}>
          {t('report.send', 'Send')}
        </LoadingButton>
      </div>
    </>
  );
};
