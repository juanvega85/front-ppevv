import React from 'react';
import { useTranslation } from '@ppe/translation';
import { Button, RadioGroup, FormControlLabel, Radio } from '@ppe/ui';
import { ITenant } from '../../types/ITenant';

interface Props {
  data?: ITenant[];
  onSelect?: (tenantId: string) => void;
}

export const TenantSelector = ({ data = [], onSelect }: Props) => {
  const { t } = useTranslation();
  const [selectedTenant, setSelectedTenant] = React.useState<string>('');

  return (
    <>
      <RadioGroup onChange={(_: any, value: string) => setSelectedTenant(value)} sx={{ py: 2 }}>
        {data.map((item) => (
          <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.name} sx={{ span: { py: 0.5 } }} />
        ))}
      </RadioGroup>

      <div style={{ textAlign: 'right' }}>
        <Button variant="contained" onClick={() => onSelect?.(selectedTenant)} disabled={!selectedTenant}>
          {t('login.select', 'Select')}
        </Button>
      </div>
    </>
  );
};
