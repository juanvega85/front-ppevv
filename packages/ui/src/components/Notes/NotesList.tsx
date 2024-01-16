import { Box, IconButton, Typography } from '@mui/material';
import { Delete as DeleteIcon } from '@ppe/icons';

const getNoteContent = (note: string) => note.split('|')[0];
const getNoteDateTime = (note: string) => note.split('|')[1];
const getNoteAuthor = (note: string) => note.split('|')[2];

interface Props {
  data?: string[];
  readOnly?: boolean;
  onChange?: (data: string[]) => void;
}

export const NotesList = ({ data = [], onChange, readOnly = false }: Props) => {
  const handleRemove = (index: number) => {
    const newArray = [...data];
    newArray.splice(index, 1);
    onChange?.(newArray);
  };

  return (
    <Box sx={styles.container}>
      {data.map((item, index) => (
        <Box key={`${getNoteDateTime(item)}-${getNoteAuthor(item)}`} sx={styles.containerNote}>
          <Box sx={styles.paperNote}>
            <Box sx={styles.content}>{getNoteContent(item)}</Box>
            <Box sx={styles.footer}>
              {!readOnly ? (
                <IconButton onClick={() => handleRemove(index)}>
                  <DeleteIcon />
                </IconButton>
              ) : (
                <div />
              )}
              <div>
                <Typography sx={styles.alignRight} variant="caption" display="block" gutterBottom>
                  <i>{getNoteAuthor(item)}</i>
                </Typography>
                <Typography sx={styles.alignRight} variant="caption" display="block" gutterBottom>
                  {getNoteDateTime(item)}
                </Typography>
              </div>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default NotesList;

const styles = {
  container: {
    overflowY: 'auto',
    height: 500,
    pr: 2,
  },
  paperNote: {
    p: 1,
    mb: 1,
    width: '100%',
    minHeight: '100px',
    lineHeight: 1,
    position: 'relative',
    border: '1px solid rgb(232, 232, 232)',
    borderBottomRightRadius: '60px 10px',
    display: 'inline-block',
    background: 'linear-gradient(135deg, rgb(255, 255, 136) 81%, rgb(255, 255, 136) 82%, rgb(255, 255, 136) 82%, rgb(255, 255, 198) 100%)',
    boxShadow: 'rgb(0 0 0 / 50%) 0px 10px 13px -11px',
  },
  alignRight: {
    textAlign: 'right',
  },
  content: {
    lineHeight: 1,
    padding: 2,
  },
  containerNote: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
  },
};
