import { IProfile } from '@ppe/profiles';
import { sitesMock } from '../data/mocks/sites.mock';
import { getSitesHydrated } from './getSitesHydrated';

describe('getSitesHydrated', () => {
  it('should return [] when no receive data', () => {
    const result = getSitesHydrated();

    expect(result).toEqual([]);
  });

  it('should return formated sites with data profiles', () => {
    const result = getSitesHydrated(sitesMock.data)[0];

    expect((result.primaryResponsible as IProfile).firstName).toBe('Paul');
    expect((result.secondaryResponsible[0] as IProfile).firstName).toBe('Juan');

    expect((result.storage[0].responsible as IProfile).firstName).toEqual('Juan');
    expect((result.storage[0].responsible as IProfile).lastName).toEqual('Medina');
  });
});
