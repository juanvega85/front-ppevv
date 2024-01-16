import { object, string } from 'zod';

export interface IEntity {
  id: string;
}

export const entitySchema = object({
  id: string(),
});
