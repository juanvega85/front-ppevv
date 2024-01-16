import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@ppe/ui';
import { ExpandMore as ExpandIcon } from '@ppe/icons';
import { Shift } from './Shift';
import { groupBy, IWeekDay } from '@ppe/common';
import { groupKeyType } from './ShiftsList';
import { IShift } from '../types/IShift';
import { ISite } from '@ppe/sites';
import { IPermissions } from '@ppe/authentication';
import { IDataSource } from '../data/IDataSource';

interface Props {
  id: string;
  getIsOpen: (_: string) => boolean;
  toggle: (_: string) => void;
  groupKey: groupKeyType;
  shifts: IShift[];
  sites: ISite[];
  days: IWeekDay[];
  dataSource: IDataSource;
  permissions: IPermissions;
}

const getSiteName = (id: string, sites: ISite[]) => sites.filter((item) => item.id === id)[0].name;
const getDayName = (id: string, days: IWeekDay[]) => days.filter((item) => item.id === id)[0].name;

export const GroupedShiftsAccordion = ({ id, getIsOpen, toggle, shifts: data, groupKey, sites, days, dataSource, permissions }: Props) => {
  let group: [string, IShift[]][] = [];

  if (groupKey === 'siteId') {
    group = Object.entries(groupBy(data, (i) => i.day)).sort((a, b) => a[0].localeCompare(b[0]));
  } else if (groupKey === 'dayId') {
    group = Object.entries(groupBy(data, (i) => i.site.id)).sort((a, b) => a[0].localeCompare(b[0]));
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
    <Accordion expanded={getIsOpen(id)} onChange={() => toggle(id)}>
      <AccordionSummary expandIcon={<ExpandIcon />}>
        <Typography color="primary" style={{ fontWeight: 500 }}>
          {getGroupTitle(id)}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          {group.map((item) => (
            <Accordion key={`${id}${item[0]}`} expanded={getIsOpen(`${id}${item[0]}`)} onChange={() => toggle(`${id}${item[0]}`)}>
              <AccordionSummary expandIcon={<ExpandIcon />}>
                <Typography>{getSubGroupTitle(item[0])}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {item[1]
                  .sort((a, b) => a.startTime.localeCompare(b.startTime))
                  .map((shift) => (
                    <Shift key={shift.id} data={shift} dataSource={dataSource} permissions={permissions} />
                  ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};
