import { ButtonBase, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

export interface Props {
  onClick?: (value: boolean) => void;
  text: string;
  disabled?: boolean;
  value?: boolean;
  textAlign?: 'left' | 'right' | 'center';
}

export const ToggleButton = ({ onClick, text, value, disabled, textAlign = 'center' }: Props) => {
  return (
    <ButtonBase onClick={() => onClick?.(!value)} disabled={disabled} sx={styles.button} className={value && !disabled ? 'toggleActive' : ''}>
      <Typography sx={{ width: '100%', textAlign, px: 1 }} component="div">
        {text}
      </Typography>
    </ButtonBase>
  );
};

const styles = {
  button: {
    backgroundColor: grey[100],
    border: `1px solid ${grey[500]}`,
    borderRadius: '3px',
    boxShadow: 1,
    color: grey[700],
    height: '48px',
    width: '100%',

    '&:disabled': {
      background: grey[100],
      borderColor: grey[100],
      color: grey[300],
    },
    '&:hover': {
      background: grey[200],
      borderColor: grey[700],
    },
    '&.toggleActive': {
      backgroundColor: 'primary.main',
      borderColor: grey[700],
      color: 'common.white',
      textShadow: '1px 1px #00000077',
      boxShadow: 'inset 0 1px 0 #fff7, inset 0 -1px 0 #fff3, inset 0 0 0 1px #fff5',
    },
  },
};
