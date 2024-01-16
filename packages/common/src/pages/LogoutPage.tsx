import React from 'react';

interface Props {
  closeSession: () => void;
}

export const LogoutPage = ({ closeSession }: Props) => {
  React.useEffect(() => {
    closeSession();
  }, []);

  return null;
};
