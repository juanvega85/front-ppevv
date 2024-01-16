import { ISetTenantResponse } from '@ppe/authentication';

export const setTenantResponseMock: ISetTenantResponse = {
  authToken: 'fakeToken',
  roleIds: ['adminRoleId', 'participantRoleId'],
  permissions: [
    { resource: 'web:dashboard', actions: 'Create,Delete,Update,Read' },
    { resource: 'web:dashboard:shiftscheduling:shiftassignments', actions: 'Create,Delete,Update,Read' },
    { resource: 'web:sites', actions: 'Create,Delete,Update,Read' },
    { resource: 'web:teams', actions: 'Create,Delete,Update,Read' },
    { resource: 'web:profiles', actions: 'Create,Delete,Update,Read' },
    { resource: 'web:shiftschduling:shifts', actions: 'Create,Delete,Update,Read' },
    { resource: 'web:groups', actions: 'Create,Delete,Update,Read' },
    { resource: 'web:dashboard:shiftscheduling:calendar', actions: '' },
    { resource: 'web:profiles:assignrole:Admin', actions: 'Create,Delete,Update,Read' },
    { resource: 'web:profiles:assignrole:Auditor', actions: 'Create,Delete,Update,Read' },
    { resource: 'web:profiles:assignrole:Scheduler', actions: 'Create,Delete,Update,Read' },
    { resource: 'web:profiles:assignrole:DataEntry', actions: 'Create,Delete,Update,Read' },
    { resource: 'web:profiles:assignrole:Worker', actions: 'Create,Delete,Update,Read' },
    { resource: 'web:dashboard:shiftscheduling:shiftreports', actions: 'Create,Delete,Update,Read' },
    { resource: 'web:systemadminstration', actions: 'Create,Delete,Update,Read' },
    { resource: 'web:profiles:shiftscheduling:preferences:permanent', actions: 'Create,Delete,Update,Read' },
    { resource: 'web:profiles:shiftscheduling:preferences:temporary', actions: 'Create,Delete,Update,Read' },
  ],
};
