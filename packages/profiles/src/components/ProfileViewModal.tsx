import React from 'react';
import { Grid, Box, Tab, TabContext, TabList, TabPanel, Modal, InfoField, InfoLinkField } from '@ppe/ui';
import { useTranslation } from '@ppe/translation';
import { formatPhone } from '@ppe/common';
import { IProfile } from '../types/IProfile';
import { ITeam } from '@ppe/teams';

type TabsType = 'personal' | 'theocratic';

interface Props {
  data: IProfile;
  open: boolean;
  handleClose: () => void;
}

export const ProfileViewModal = ({ data, handleClose, open }: Props) => {
  const [currentTab, setCurrentTab] = React.useState<TabsType>('personal');
  const { t } = useTranslation();

  return (
    <Modal onClose={handleClose} open={open} title={`${data.firstName} ${data.lastName}`} size="sm">
      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={(_, value) => setCurrentTab(value as TabsType)} scrollButtons="auto" variant="scrollable">
            <Tab label={t('profile.personalInformation', 'Personal information')} value="personal" />
            <Tab label={t('profile.theocraticInformation', 'Theocratic information')} value="theocratic" />
          </TabList>
        </Box>
        <TabPanel value="personal" sx={{ p: 0, pt: 3 }}>
          <Grid container>
            <Grid item xs={12}>
              <InfoLinkField label={t('profile.email', 'Email')} text={data.email} link={`mailto:${data.email}`} />
            </Grid>
            <Grid item xs={12} md={4}>
              <InfoField label={t('profile.gender', 'Gender')} text={t(`gender.${data.gender.toLowerCase()}`).toString()} />
            </Grid>
            <Grid item xs={12} md={4}>
              <InfoField label={t('profile.maritalStatus', 'Marital status')} text={t(`maritalStatus.${data.maritalStatus.toLowerCase()}`).toString()} />
            </Grid>
            <Grid item xs={12} md={4}>
              <InfoField label={t('profile.birthDate', 'Birthdate')} text={data.birthDate} />
            </Grid>
            <Grid item xs={12}>
              <InfoField
                label={t('profile.address', 'Address')}
                text={`${data.address.formattedAddress}${data.address.unit ? `<br/>${t('profile.addressUnit', 'Unit')} ${data.address.unit}` : ''}`}
              />
            </Grid>
            {data.mobilePhone ? (
              <Grid item xs={6}>
                <InfoLinkField
                  label={t('profile.mobilePhone', 'Mobile phone')}
                  text={formatPhone(data.mobilePhone)}
                  link={`tel:${data.mobilePhone}`}
                />
              </Grid>
            ) : null}
            {data.landlinePhone ? (
              <Grid item xs={6}>
                <InfoLinkField
                  label={t('profile.landlinePhone', 'Landline phone')}
                  text={formatPhone(data.landlinePhone)}
                  link={`tel:${data.landlinePhone}`}
                />
              </Grid>
            ) : null}
          </Grid>
        </TabPanel>
        <TabPanel value="theocratic" sx={{ p: 0, pt: 3 }}>
          <InfoField label={t('profile.team', 'Team')} text={(data.team as ITeam).name || ''} />
          <InfoField label={t('profile.baptismDate', 'Baptism date')} text={data.baptismDate} />
          <InfoField label={t('profile.serviceCapacity', 'Service capacity')} text={t(`serviceCapacity.${data.serviceCapacity}`).toString()} />
          <InfoField label={t('profile.appointedCapacity', 'Appointed capacity')} text={t(`appointment.${data.appointedCapacity.toLowerCase()}`).toString()} />
          <InfoField label={t('profile.languages', 'Languages')} text={data.languages.map((item) => t(`language.${item.toLowerCase()}`).toString())} />
        </TabPanel>
      </TabContext>
    </Modal>
  );
};
