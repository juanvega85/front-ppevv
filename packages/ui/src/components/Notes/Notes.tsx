import React from 'react';
import { NotesList } from './NotesList';
import { NoteForm } from './NoteForm';
import { Grid } from '@mui/material';

export interface Props {
  data?: string[];
  readOnly?: boolean;
  onChange?: (values: string[]) => void;
  authorName?: string;
}

export const Notes = ({ data = [], onChange, readOnly = false, authorName }: Props) => {
  const [notes, setNotes] = React.useState(data);

  const handleAddNew = (value: string) => {
    setNotes([value, ...notes]);
  };

  const handleChange = (notesTemp: string[]) => {
    setNotes(notesTemp);
  };

  React.useEffect(() => {
    onChange?.(notes);
  }, [notes]);

  return (
    <Grid container spacing={2}>
      {!readOnly && (
        <Grid item xs={12} md={6}>
          <NoteForm onAdd={handleAddNew} authorName={authorName} />
        </Grid>
      )}
      <Grid item xs={12} md={readOnly ? 12 : 6}>
        <NotesList data={notes} readOnly={readOnly} onChange={handleChange} />
      </Grid>
    </Grid>
  );
};
