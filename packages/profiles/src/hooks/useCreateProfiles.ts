import React from 'react';
import { useMutation, useQueryClient } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';
import { IProfile } from '../types/IProfile';
import { IProfiles } from '../types/IProfiles';
import { cacheKey } from '../utils/constants';

export const useCreateProfiles = (dataSource: IDataSource) => {
  const { createProfiles } = dataSource;
  const [newProfile, setNewProfile] = React.useState<IProfile | null>(null);
  const queryClient = useQueryClient();

  const { mutate, status, error, reset } = useMutation(createProfiles, {
    onSuccess: ({ data }) => {
      setNewProfile(data.profiles[0]);
      const previous = queryClient.getQueryData<IProfiles>(cacheKey);
      if (previous) {
        const newProfiles = {
          profiles: [...previous.profiles, ...data.profiles],
        };
        queryClient.setQueryData<IProfiles>(cacheKey, newProfiles);
      }
    },
  });

  return { create: mutate, newProfile, status, error, reset };
};
