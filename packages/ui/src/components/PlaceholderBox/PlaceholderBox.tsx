import { Box, SxProps } from '@mui/material';
import { keyframes } from '@mui/system';

export interface Props {
  height?: string;
  repeat?: number;
  sx?: SxProps;
}

export const PlaceholderBox = ({ height = '44px', repeat = 1, sx }: Props) => {
  return (
    <Box sx={sx} data-testid="loader">
      {[...Array(repeat).keys()].map((item) => (
        <Box key={item} sx={{ ...styles.container, height }}>
          <Box sx={styles.shade} />
        </Box>
      ))}
    </Box>
  );
};

const anim = keyframes`
  0% {
    left: -45%;
  }
  100% {
    left: 100%;
  }
`;

const styles = {
  container: {
    position: 'relative',
    backgroundColor: 'lightgray',
    overflow: 'hidden',
    borderRadius: '5px',
    marginBottom: '5px',
  },

  shade: {
    position: 'absolute',
    left: '-45%',
    height: '100%',
    width: '45%',
    backgroundImage: `linear-gradient(
      to left,
      rgba(251, 251, 251, 0.05),
      rgba(251, 251, 251, 0.2),
      rgba(251, 251, 251, 0.4),
      rgba(251, 251, 251, 0.2),
      rgba(251, 251, 251, 0.05)
    )`,
    animation: `${anim} 1.2s infinite`,
  },
};
