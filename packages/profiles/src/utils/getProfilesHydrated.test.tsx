import { ITeam } from '@ppe/teams';
import { profilesMock } from '../data/mocks/profiles.mock';
import { getProfilesHydrated } from './getProfilesHydrated';

describe('getProfilesHydrated', () => {
  it('should return [] when no receive data', () => {
    const result = getProfilesHydrated();

    expect(result).toEqual([]);
  });

  it('should return formated profiles with data team', () => {
    const result = getProfilesHydrated(profilesMock.data);

    expect((result[0].team as ITeam).name).toBe('Inglesa Viña del Mar');
  });
});
