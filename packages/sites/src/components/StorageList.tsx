import React from 'react';
import { IconButton, Typography, Divider } from '@ppe/ui';
import { Close as CloseIcon } from '@ppe/icons';
import { useTranslation } from '@ppe/translation';
import { IStorage } from '../types/IStorage';

interface Props {
  data: IStorage[];
  onRemoveItem?: (index: number) => void;
}

export const StorageList = ({ data, onRemoveItem }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      {data.map((item, index) => (
        <React.Fragment key={`${item.address.formattedAddress}${index}`}>
          <Typography component="div" sx={styles.container}>
            <div>
              <div>
                <i>{`${t('storage.address', 'Address')}: `}</i>
                {item.address.formattedAddress}
              </div>
              {item.address.unit && (
                <div>
                  <i>{`${t('storage.unit', 'Unit')}: `}</i>
                  {item.address.unit}
                </div>
              )}
              <div>
                <i>{`${t('storage.contact', 'Contact')}: `}</i>
                {`${item.responsible.firstName} ${item.responsible.lastName}`}
              </div>
              {item.notes && item.notes.trim().length > 0 ? (
                <div>
                  <i>{`${t('storage.notes', 'Notes')}: `}</i>
                  {item.notes}
                </div>
              ) : null}
            </div>
            <IconButton onClick={() => onRemoveItem?.(index)}>
              <CloseIcon />
            </IconButton>
          </Typography>
          <Divider />
        </React.Fragment>
      ))}
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    my: 2,
    alignItems: 'start',
  },
};
