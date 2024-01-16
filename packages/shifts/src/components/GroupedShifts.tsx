import { Divider, ToggleButton, Typography } from '@ppe/ui';
import { groupBy, removeSeconds, addTimes, IWeekDay } from '@ppe/common';
import { groupKeyType } from './ShiftsList';
import { IShift } from '../types/IShift';
import { ISite } from '@ppe/sites';

interface Props {
  id: string;
  groupKey: groupKeyType;
  shifts: IShift[];
  sites: ISite[];
  days: IWeekDay[];
  selected: string[];
  onChange: (id: string, value: boolean) => void;
}

const getSiteName = (id: string, sites: ISite[]) => sites.filter((item) => item.id === id)[0]?.name || '';
const getDayName = (id: string, days: IWeekDay[]) => days.filter((item) => item.id === id)[0]?.name || '';

export const GroupedShifts = ({ id, shifts: data, groupKey, sites, days, selected, onChange }: Props) => {
  let group: [string, IShift[]][] = [];

  const isSelected = (id: string) => selected.includes(id);

  if (groupKey === 'siteId') {
    group = Object.entries(groupBy(data, (i) => i.day));
  } else if (groupKey === 'dayId') {
    group = Object.entries(groupBy(data, (i) => i.site.id));
  }

  const getGroupTitle = (id: string) => {
    if (groupKey === 'siteId') {
      return getSiteName(id, sites);
    } else if (groupKey === 'dayId') {
      return getDayName(id, days);
    }
    return '';
  };

  const getSubGroupTitle = (id: string) => {
    if (groupKey === 'siteId') {
      return getDayName(id, days);
    } else if (groupKey === 'dayId') {
      return getSiteName(id, sites);
    }
    return '';
  };

  return (
    <>
      <Divider sx={{ py: 2 }} />
      <Typography sx={{ fontWeight: 'bold', mt: 2 }} color="primary">
        {getGroupTitle(id)}
      </Typography>
      {group.map((item) => (
        <div key={`${id}${item[0]}`}>
          <Typography sx={{ fontStyle: 'italic', mt: 2, mb: 1 }}>{getSubGroupTitle(item[0])}</Typography>
          {item[1].map((shift) => (
            <ToggleButton
              key={shift.id}
              onClick={(value) => onChange(shift.id, value)}
              value={isSelected(shift.id)}
              text={`${removeSeconds(shift.startTime)} - ${removeSeconds(addTimes(shift.startTime, shift.duration))}`}
            />
          ))}
        </div>
      ))}
    </>
  );
};
