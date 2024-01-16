import React from 'react';
import { useTranslation } from '@ppe/translation';
import { UnfoldLess as LessIcon, UnfoldMore as MoreIcon } from '@ppe/icons';
import { Radio, FormControlLabel, RadioGroup, IconButton, Box, PlaceholderBox } from '@ppe/ui';
import { GroupedShiftsAccordion } from './GroupedShiftsAccordion';
import { useWeekDays, groupBy } from '@ppe/common';
import { ISite } from '@ppe/sites';
import { IShift } from '../types/IShift';
import { IPermissions } from '@ppe/authentication';
import { IDataSource } from '../data/IDataSource';

interface Props {
  sites: ISite[];
  shifts: IShift[];
  isLoading?: boolean;
  dataSource: IDataSource;
  permissions: IPermissions;
}

export type groupKeyType = 'siteId' | 'dayId';
const defaultSelectedOption: groupKeyType = 'siteId';

export const ShiftsList = ({ sites, shifts, isLoading, dataSource, permissions }: Props) => {
  const { t } = useTranslation();
  const [groupKey, setGroupKey] = React.useState<groupKeyType>(defaultSelectedOption);
  const [openIds, setOpenIds] = React.useState<string[]>([]);
  const days = useWeekDays();

  const onChangeSortBy = (_: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setGroupKey(value as groupKeyType);
    setOpenIds([]);
  };

  const toggle = (id: string) => {
    const isIncluded = openIds.some((item: string) => item === id);
    if (isIncluded) {
      setOpenIds(openIds.filter((item: string) => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };
  const getIsOpen = (id: string) => openIds.some((item) => item === id);

  const collapseAll = () => {
    setOpenIds([]);
  };

  const expandAll = () => {
    const array = [
      ...sites.map((item) => item.id),
      ...days.map((item) => item.id),
      ...shifts.map((item) => `${item.day}${item.site.id}`),
      ...shifts.map((item) => `${item.site.id}${item.day}`),
    ];
    setOpenIds(array);
  };

  let groupedData: Record<string, IShift[]> = {};

  if (groupKey === 'siteId') {
    groupedData = groupBy(shifts, (i) => i.site.id);
  } else if (groupKey === 'dayId') {
    groupedData = groupBy(shifts, (i) => i.day);
  }

  return (
    <>
      <Box sx={{ p: 3 }}>
        <RadioGroup defaultValue={defaultSelectedOption} onChange={onChangeSortBy}>
          <FormControlLabel value="siteId" control={<Radio />} label={t('preferences.orderBySites', 'Order by sites')} disabled={isLoading} />
          <FormControlLabel
            value="dayId"
            control={<Radio />}
            label={t('preferences.orderByDays', 'Order by days')}
            sx={{ span: { py: '0px' } }}
            disabled={isLoading}
          />
        </RadioGroup>
      </Box>
      <Box sx={{ pr: 1, pb: 1, textAlign: 'right' }}>
        <IconButton onClick={expandAll} title={t('shifts.expandAll', 'Expand all')} disabled={isLoading}>
          <MoreIcon />
        </IconButton>
        <IconButton onClick={collapseAll} title={t('shifts.hideAll', 'Hide all')} disabled={isLoading}>
          <LessIcon />
        </IconButton>
      </Box>

      {isLoading ? (
        <PlaceholderBox repeat={8} sx={{ p: 2, pt: 0 }} />
      ) : (
        <>
          {Object.keys(groupedData)
            .sort((a, b) => a.localeCompare(b))
            .map((itemId) => {
              return (
                <GroupedShiftsAccordion
                  key={itemId}
                  id={itemId}
                  getIsOpen={getIsOpen}
                  toggle={toggle}
                  groupKey={groupKey}
                  shifts={groupedData[itemId]}
                  sites={sites}
                  days={days}
                  dataSource={dataSource}
                  permissions={permissions}
                />
              );
            })}
        </>
      )}
    </>
  );
};
