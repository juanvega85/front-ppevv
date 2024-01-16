import React from 'react';
import { useTranslation } from '@ppe/translation';
import { Radio, FormControlLabel, RadioGroup, PlaceholderBox } from '@ppe/ui';
import { groupBy, useWeekDays } from '@ppe/common';
import { groupKeyType } from './ShiftsList';
import { IShift } from '../types/IShift';
import { ISite } from '@ppe/sites';
import { GroupedShifts } from './GroupedShifts';

const defaultSelectedOption: groupKeyType = 'siteId';

interface Props {
  data: IShift[];
  onChange: (id: string, value: boolean) => void;
  selected: string[];
  sites: ISite[];
  loading?: boolean;
}

export const ShiftsSelector = ({ data, onChange, selected, sites, loading }: Props) => {
  const { t } = useTranslation();
  const [groupKey, setGroupKey] = React.useState<groupKeyType>('siteId');

  const days = useWeekDays();

  const onChangeSortBy = (_: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setGroupKey(value as groupKeyType);
  };

  let groupedData: Record<string, IShift[]> = {};

  if (groupKey === 'siteId') {
    groupedData = groupBy(data, (i) => i.site.id);
  } else if (groupKey === 'dayId') {
    groupedData = groupBy(data, (i) => i.day);
  }

  return (
    <>
      <RadioGroup defaultValue={defaultSelectedOption} onChange={onChangeSortBy}>
        <FormControlLabel value="siteId" control={<Radio />} label={t('preferences.orderBySites', 'Order by sites')} disabled={loading} />
        <FormControlLabel
          value="dayId"
          control={<Radio />}
          label={t('preferences.orderByDays', 'Order by days')}
          sx={{ span: { py: '0px' } }}
          disabled={loading}
        />
      </RadioGroup>

      {loading ? (
        <PlaceholderBox repeat={5} sx={{ mt: 3 }} />
      ) : (
        <>
          {Object.keys(groupedData).map((itemId) => (
            <GroupedShifts
              key={itemId}
              id={itemId}
              selected={selected}
              groupKey={groupKey}
              shifts={groupedData[itemId]}
              sites={sites}
              days={days}
              onChange={onChange}
            />
          ))}
        </>
      )}
    </>
  );
};
