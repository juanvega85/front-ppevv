import { Box, Typography } from '@mui/material';

export interface Props {
  label: string;
  text: string | string[];
}
export const InfoField = ({ label, text }: Props) => {
  return (
    <Box mb={2}>
      <Typography variant="body2" sx={{ fontWeight: '500' }}>
        {label}
      </Typography>

      {Array.isArray(text) ? (
        <Typography component="div" sx={{ ml: 1 }}>
          {text.map((item, index) => (
            <div key={`${index}${item}`}>{`- ${item}`}</div>
          ))}
        </Typography>
      ) : (
        <Typography sx={{ ml: 1 }} dangerouslySetInnerHTML={{ __html: text }} />
      )}
    </Box>
  );
};
