import React from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useTranslation } from '@ppe/translation';
import { Box } from '@ppe/ui';
import { ICoordinates } from '@ppe/common';
import { IStorage } from '../types/IStorage';
import { IProfile } from '@ppe/profiles';
import { ITeam } from '@ppe/teams';

interface Props {
  position: ICoordinates;
  storage?: IStorage[];
  profiles?: IProfile[];
}

const containerStyle = {
  width: '100%',
  height: '270px',
};

export const SiteMap = ({ position, storage = [], profiles = [] }: Props) => {
  const [, setMap] = React.useState(null);
  const [infoOpen, setInfoOpen] = React.useState<string | null>(null);
  const { t } = useTranslation();

  const defaultPosition = {
    lat: parseFloat(position.lat),
    lng: parseFloat(position.lng),
  };

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  const storageArray = storage.map((item) => ({
    ...item,
    coordinates: {
      lat: parseFloat(item?.address?.coordinates?.lat || ''),
      lng: parseFloat(item?.address?.coordinates?.lng || ''),
    },
  }));

  const profilesArray = profiles.map((item) => ({
    ...item,
    coordinates: {
      lat: parseFloat(item?.address?.coordinates?.lat || ''),
      lng: parseFloat(item?.address?.coordinates?.lng || ''),
    },
  }));

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={defaultPosition} zoom={16} onUnmount={onUnmount}>
      <Marker position={defaultPosition} />

      {storageArray.map((item, index) => (
        <Marker
          key={index}
          position={item.coordinates}
          onClick={() => {
            setInfoOpen(`storage${index}`);
          }}
        >
          {infoOpen === `storage${index}` && (
            <InfoWindow onCloseClick={() => setInfoOpen(null)}>
              <>
                <div>
                  <b>{`${(item.responsible as IProfile).firstName} ${(item.responsible as IProfile).lastName}`}</b>
                </div>
                <Box sx={styles.infoAddress}>
                  {`${item.address.formattedAddress}${item.address.unit ? `. ${t('profile.addressUnit', 'Unit')} ${item.address.unit}` : null}`}
                </Box>
                {item.notes && <div>{`${t('schedule.notes', 'Notes')}: ${item.notes}`}</div>}
              </>
            </InfoWindow>
          )}
        </Marker>
      ))}

      {profilesArray.map((item, index) => (
        <Marker
          key={index}
          position={item.coordinates}
          onClick={() => {
            setInfoOpen(`profiles${index}`);
          }}
        >
          {infoOpen === `profiles${index}` && (
            <InfoWindow onCloseClick={() => setInfoOpen(null)}>
              <>
                <div>
                  <b>{`${item.firstName} ${item.lastName}`}</b>
                </div>
                <div>{(item.team as ITeam).name}</div>
                <Box sx={styles.infoAddress}>
                  {`${item.address.formattedAddress}${item.address.unit ? `. ${t('profile.addressUnit', 'Unit')} ${item.address.unit}` : null}`}
                </Box>
              </>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  );
};

const styles = {
  infoAddress: {
    maxWidth: '250px',
    p: 1,
  },
};
