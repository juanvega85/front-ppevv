import React from 'react';
import { useMutation } from '@ppe/data-provider';
import { IDataSource } from '../data/IDataSource';

export const useCheckEmail = (dataSource: IDataSource) => {
  const [email, setEmail] = React.useState('');
  const [emailExists, setEmailExists] = React.useState(false);
  const { getUserByEmail } = dataSource;

  const { mutate, status } = useMutation(getUserByEmail, {
    onMutate: () => {
      setEmailExists(false);
    },
    onSuccess: (response) => {
      setEmailExists(response.data.users.length! > 0);
    },
  });

  React.useEffect(() => {
    const regex = /^\S+@\S+\.\S+$/;
    if (regex.test(email)) {
      mutate(email);
    } else {
      setEmailExists(false);
    }
  }, [email]);

  return { emailExists, setEmail, status };
};
