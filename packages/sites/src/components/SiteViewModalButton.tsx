import React from 'react';
import { IconButton } from '@ppe/ui';
import { FmdGood as PinIcon } from '@ppe/icons';
import { ISite } from '../types/ISite';
import { SiteViewModal } from './SiteViewModal';

interface Props {
  data: ISite;
  disabled?: boolean;
  lightColor?: boolean;
}

export const SiteViewModalButton = ({ data, disabled, lightColor }: Props) => {
  const [open, setOpen] = React.useState(false);
  const toggle = () => setOpen(!open);

  return (
    <>
      <IconButton onClick={toggle} disabled={disabled}>
        <PinIcon htmlColor={lightColor ? 'lightgrey' : ''} />
      </IconButton>
      <SiteViewModal data={data} open={open} handleClose={toggle} />
    </>
  );
};
