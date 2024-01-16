import React from 'react';
import { useTranslation } from '@ppe/translation';

export const useRoles = () => {
  const { t, i18n } = useTranslation();

  return React.useMemo(
    () => [
      { value: 'adminRoleId', label: t('roles.adminRoleId', 'Administrator') },
      { value: 'auditorRoleId', label: t('roles.auditorRoleId', 'Auditor') },
      { value: 'custodianRoleId', label: t('roles.custodianRoleId', 'Equipment Custodian') },
      { value: 'dataEntryRoleId', label: t('roles.dataEntryRoleId', 'Data Entry') },
      { value: 'managerRoleId', label: t('roles.managerRoleId', 'Site Overseer') },
      { value: 'schedulerRoleId', label: t('roles.schedulerRoleId', 'Scheduler') },
      { value: 'participantRoleId', label: t('roles.participantRoleId', 'Participant') },
    ],
    [i18n.language]
  );
};
