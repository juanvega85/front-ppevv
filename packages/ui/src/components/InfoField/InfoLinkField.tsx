import { Box, Typography, useTheme } from '@mui/material';

interface Props {
  label: string;
  text: string;
  link: string;
}

export const InfoLinkField = ({ label, text, link }: Props) => {
  const theme = useTheme();

  return (
    <Box mb={2}>
      <Typography variant="body2" sx={{ fontWeight: '500' }}>
        {label}
      </Typography>

      <Typography sx={{ ml: 1 }}>
        <a style={{ color: theme.palette.primary.main, textDecoration: 'none' }} href={link} target="_blank" rel="noreferrer">
          {text}
        </a>
      </Typography>
    </Box>
  );
};
