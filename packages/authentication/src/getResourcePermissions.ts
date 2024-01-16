import { IPermissions } from './types/IPermissions';
import { ISession } from './types/ISession';

export const getResourcePermissions = (resource: string, session: ISession | null): IPermissions => {
  const result: IPermissions = {
    canCreate: false,
    canRead: false,
    canUpdate: false,
    canDelete: false,
  };

  if (!session?.permissions) return result;

  const { permissions } = session;
  const res = permissions.filter((item) => item.resource === resource);

  const operations = res.length ? res[0].actions.split(',') : [];

  result.canCreate = operations.includes('Create');
  result.canRead = operations.includes('Read');
  result.canUpdate = operations.includes('Update');
  result.canDelete = operations.includes('Delete');

  return result;
};
