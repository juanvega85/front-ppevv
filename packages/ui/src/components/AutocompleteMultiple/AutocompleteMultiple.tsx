import { Autocomplete, TextField } from '@mui/material';
import { useTranslation } from '@ppe/translation';

export interface Props {
  name: string;
  label: string;
  options: any[];
  value?: string[];
  onChange?: (value: string[]) => void;
  disabled?: boolean;
}

export const AutocompleteMultiple = ({ name, label, options, value, onChange, disabled }: Props) => {
  const { t } = useTranslation();
  const defaultValue = options.filter((option) => value?.includes(option.value));

  return (
    <Autocomplete
      id={name}
      multiple
      options={options}
      getOptionLabel={(option) => option.value}
      onChange={(_, value) => onChange?.(value.map((item) => item.value))}
      defaultValue={defaultValue}
      size="small"
      noOptionsText={t('general.noOptions', 'No options')}
      renderInput={(params) => <TextField {...params} variant="outlined" label={label} />}
      disabled={disabled}
    />
  );
};
