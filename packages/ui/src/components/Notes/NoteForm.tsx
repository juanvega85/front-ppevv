import React from 'react';
import { useTranslation } from '@ppe/translation';
import format from 'date-fns/format';
import { Button, TextField } from '@mui/material';

interface Props {
  onAdd?: (value: string) => void;
  authorName?: string;
}

export const NoteForm = ({ onAdd, authorName }: Props) => {
  const [content, setContent] = React.useState('');
  const { t } = useTranslation();

  const handleAddNote = () => {
    onAdd?.(`${content.replace('|', '_')}|${format(new Date(), 'dd-MMM-yyyy HH:mm:ss')}|${authorName}`);
    setContent('');
  };

  return (
    <>
      <TextField
        fullWidth
        sx={{ mb: 1 }}
        label={t('notes.new', 'New note')}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => e.code === 'Enter' && handleAddNote()}
        size="small"
      />
      <Button variant="contained" onClick={handleAddNote} disabled={!content.trim().length}>
        {t('notes.add', 'Add')}
      </Button>
    </>
  );
};
