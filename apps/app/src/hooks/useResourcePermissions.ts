import { useAuthentication, getResourcePermissions } from '@ppe/authentication';
import { Resources } from 'constants/Resources';

export const useResourcePermissions = (resource: Resources) => {
  const { session } = useAuthentication();
  return getResourcePermissions(resource, session);
};
