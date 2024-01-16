import { z } from 'zod';

export type IShiftPreferences = string[];

export const shiftPreferencesSchema = z.string().array();
