import { object, string } from 'zod';

export interface ICoordinates {
  lng: string;
  lat: string;
}

export const coordinatesSchema = object({
  lng: string(),
  lat: string(),
});
