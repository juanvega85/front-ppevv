import { ISite } from '../types/ISite';
import { ISites } from '../types/ISites';

export const getSitesHydrated = (data?: ISites): ISite[] => {
  if (!data) return [];

  return data.sites //.map((item) => ({
    //...item,
    //primaryResponsible: item.primaryResponsible ? data._profiles[item.primaryResponsible.id] : undefined,
    //secondaryResponsible: item.secondaryResponsible.map((responsible) => data._profiles[responsible.id]),
    // storage: item.storage.map((storage) => ({
    //   ...storage,
    //   responsible: data._profiles[storage.responsible.id],
    // })),
  //}));
};
