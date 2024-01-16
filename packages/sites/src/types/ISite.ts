import { IEntity, entitySchema, ICoordinates, coordinatesSchema } from '@ppe/common';
import { boolean, string, array } from 'zod';
import { IProfile } from '@ppe/profiles';
import { IStorage, storageSchema } from './IStorage';

export interface ISite extends IEntity {
  name: string;
  description?: string;
  active: boolean;
  coordinates: ICoordinates;
  primaryResponsible?:  IProfile;
  secondaryResponsible: IProfile[];
  storage: IStorage[];
}

export const siteSchema = entitySchema.extend({
  name: string(),
  description: string().optional(),
  active: boolean(),
  coordinates: coordinatesSchema,
  primaryResponsible: entitySchema.optional(),
  secondaryResponsible: array(entitySchema),
  storage: array(storageSchema),
});
