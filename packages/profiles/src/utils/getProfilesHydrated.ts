import { IProfile } from '../types/IProfile';
import { IProfiles } from '../types/IProfiles';

export const getProfilesHydrated = (data?: IProfiles): IProfile[] => {
  if (!data) return [];
  return data.profiles
};
