import { ICoordinates, coordinatesSchema } from './ICoordinates';
import { object, string } from 'zod';

export interface IAddress {
  description: string;
  formattedAddress: string;
  streetNumber?: string;
  route?: string;
  unit?: string;
  locality: string;
  city?: string;
  postalCode?: string;
  region?: string;
  country: string;
  coordinates: ICoordinates;
}

export const addressSchema = object({
  description: string(),
  formattedAddress: string(),
  streetNumber: string().optional(),
  route: string().optional(),
  unit: string().optional(),
  locality: string(),
  city: string().optional(),
  postalCode: string().optional(),
  region: string().optional(),
  country: string(),
  coordinates: coordinatesSchema,
});
