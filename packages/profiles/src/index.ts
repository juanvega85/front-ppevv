export { ProfilesPage } from './components/ProfilesPage';
export { ProfileButton } from './components/ProfileButton';
export { ProfilesSelector } from './components/ProfilesSelector';

export type { IProfiles } from './types/IProfiles';
export type { IProfile } from './types/IProfile';
export { profileSchema } from './types/IProfile';

export type { IDataSource } from './data/IDataSource';
export { apiDataSource } from './data/sources/api';
export { mockedDataSource } from './data/sources/mocked';
export { profilesMock } from './data/mocks/profiles.mock';

export { useProfiles } from './hooks/useProfiles';
export { useProfilesByRole } from './hooks/useProfilesByRole';
export { useProfilesByPreferences } from './hooks/useProfilesByPreferences';

export { getProfilesHydrated } from './utils/getProfilesHydrated';
