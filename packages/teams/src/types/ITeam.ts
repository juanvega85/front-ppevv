import { IEntity, entitySchema } from '@ppe/common';
import { string } from 'zod';

export interface ITeam extends IEntity{
  name: string;
}


export const teamSchema = entitySchema.extend({
  name: string(),
});
