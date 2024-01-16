import React from 'react';
import { TextField, MenuItem, InputAdornment } from '@mui/material';
import { useTranslation } from '@ppe/translation';
import { ILanguage } from '../../types/ILanguage';
import { Translate as TranslateIcon } from '@ppe/icons';

export interface Props {
  languages: ILanguage[];
}

export const LanguageSwitcher = ({ languages }: Props) => {
  const { i18n, t } = useTranslation();
  const handleChange = (e: React.ChangeEvent<{ value: string }>) => {
    i18n.changeLanguage(e.target.value);
  };
  return (
    <TextField
      select
      size="small"
      label={t('languageSwitcher.label', 'Language')}
      value={i18n.language.split('-')[0]}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <TranslateIcon />
          </InputAdornment>
        ),
      }}
    >
      {languages.map((item) => (
        <MenuItem value={item.id} key={item.id} selected={i18n.language === item.id}>
          {item.name}
        </MenuItem>
      ))}
    </TextField>
  );
};
