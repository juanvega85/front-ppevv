import { entitySchema, IEntity, IAddress, addressSchema } from '@ppe/common';
import { ITeam } from '@ppe/teams';
import { string, array } from 'zod';

export interface IProfile  {
  email: string;
  firstName: string;
  lastName: string;
  address: IAddress;
  landlinePhone: string;
  mobilePhone: string;
  birthDate: string;
  gender: string;
  languages: string[];
  baptismDate: string;
  appointedCapacity: string;
  serviceCapacity: string;
  team: ITeam;
  maritalStatus: string;
  id : string;
}

export const profileSchema = entitySchema.extend({
  email: string(),
  firstName: string(),
  lastName: string(),
  address: addressSchema,
  landlinePhone: string(),
  mobilePhone: string(),
  birthDate: string(),
  gender: string(),
  languages: array(string()),
  baptismDate: string(),
  appointedCapacity: string(),
  serviceCapacity: string(),
  team: entitySchema,
  maritalStatus: string() //,
  //id: number()
});
