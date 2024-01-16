import { object, boolean } from 'zod';

export interface IGeneralPreference {
  enableForReplacements: boolean;
}

export const generalPreferencesShema = object({
  enableForReplacements: boolean(),
});
