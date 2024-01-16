export { TeamsPage } from './components/TeamsPage';

export type { ITeam } from './types/ITeam';
export { teamSchema } from './types/ITeam';

export type { IDataSource } from './data/IDataSource';
export { apiDataSource } from './data/sources/api';
export { mockedDataSource } from './data/sources/mocked';

export { useTeams } from './hooks/useTeams';
export { TeamActionsTable } from './components/TeamActionsTable';
export { TeamForm } from './components/TeamForm';

export type { Props as TeamActionsTableProps } from './components/TeamActionsTable';
export type { Props as TeamFormProps } from './components/TeamForm';
export type { Props as TeamsPageProps } from './components/TeamsPage';
