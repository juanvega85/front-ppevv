import React from 'react';
import { useQuery } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';
import { PreferencesType } from '../types/PreferencesType';
import { useShifts } from '@ppe/shifts';
import { shiftPreferencesSchema } from '../types/IShiftPreferences';

const cacheKey = 'preferences';

export const useShiftsPreferences = (dataSource: IDataSource, type: PreferencesType, userId: string) => {
  const { getShiftsPreferences } = dataSource;

  const [sitesSelected, setSitesSelected] = React.useState<string[]>([]);
  const [daysSelected, setDaysSelected] = React.useState<string[]>([]);
  const [shiftsSelected, setShiftsSelected] = React.useState<string[]>([]);

  const { data: shifts } = useShifts(dataSource);

  //const { data: shifts } = useShifts(dataSource);
  // const data = useShifts(dataSource);
  // console.log(data)
  // const shifts = data.shifts.filter( (x)=> x.active === true)
  //console.log(shifts.filter( (x: any)=> x.active === true))

  const loadData = React.useCallback(async () => {
    const response = await getShiftsPreferences(userId, type);
    return shiftPreferencesSchema.parse(response.data);
  }, [type]);

  const { data: preferences, status } = useQuery([cacheKey, type], loadData);

  const toggleSite = (id: string, value: boolean) => {
    if (value) {
      setSitesSelected([...sitesSelected, id]);
    } else {
      setSitesSelected(sitesSelected.filter((item) => item !== id));
    }
  };

  const toggleDay = (id: string, value: boolean) => {
    if (value) {
      setDaysSelected([...daysSelected, id]);
    } else {
      setDaysSelected(daysSelected.filter((item) => item !== id));
    }
  };

  const toggleShift = (id: string, value: boolean) => {
    if (value) {
      setShiftsSelected([...shiftsSelected, id]);
    } else {
      setShiftsSelected(shiftsSelected.filter((item) => item !== id));
    }
  };

  React.useEffect(() => {
    if (shifts && preferences) {
      const filteredItems = shifts.filter((item) => preferences.includes(item.id));
      setSitesSelected([...new Set(filteredItems.map((item) => item.site.id))]);
      setDaysSelected([...new Set(filteredItems.map((item) => item.day))]);
      setShiftsSelected(preferences);
    }
  }, [preferences, shifts]);

  return { shiftsSelected, sitesSelected, daysSelected, toggleSite, toggleDay, toggleShift, shifts, status };
};
