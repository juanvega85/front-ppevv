import { Typography, Link, Modal } from '@ppe/ui';
import { PhoneIphone as MobileIcon, Call as PhoneIcon } from '@ppe/icons';
import { SiteMap } from './SiteMap';
import { ISite } from '../types/ISite';
import { IProfile } from '@ppe/profiles';

interface Props {
  data: ISite;
  open?: boolean;
  handleClose?: () => void;
}

export const SiteViewModal = ({ data, open, handleClose }: Props) => {
  const primaryResponsible = data.primaryResponsible as IProfile;
  return (
    <Modal open={open} onClose={handleClose} title={data.name} size="sm">
      <SiteMap position={data.coordinates} storage={data.storage} />

      {primaryResponsible && (
        <Typography mt={2} component="div">
          <Typography sx={{ fontWeight: 'bold', mb: 1 }}>{`${primaryResponsible.firstName} ${primaryResponsible.lastName}`}</Typography>
          <Link href={`tel:${primaryResponsible.mobilePhone}`}>
            <MobileIcon fontSize="small" sx={{ verticalAlign: 'sub', mr: 1 }} />
            {primaryResponsible.mobilePhone}
          </Link>
          {primaryResponsible.landlinePhone && (
            <Link href={`tel:${primaryResponsible.landlinePhone}`} component="div" sx={{ mt: 2 }}>
              <PhoneIcon fontSize="small" sx={{ verticalAlign: 'sub', mr: 1 }} />
              {primaryResponsible.landlinePhone}
            </Link>
          )}
        </Typography>
      )}
    </Modal>
  );
};
