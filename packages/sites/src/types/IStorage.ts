import { object, string } from 'zod';
import { IAddress, addressSchema, IEntity, entitySchema } from '@ppe/common';
import { IProfile } from '@ppe/profiles';

export interface IStorage {
  address: IAddress;
  responsible: IEntity | IProfile;
  notes?: string;
}

export const storageSchema = object({
  address: addressSchema,
  responsible: entitySchema,
  notes: string().optional(),
});
