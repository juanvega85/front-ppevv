import PulseLoader from 'react-spinners/PulseLoader';
import { LoaderSizeMarginProps } from 'react-spinners/helpers/props';
import { grey } from '@mui/material/colors';

export const Loader = ({ ...props }: LoaderSizeMarginProps) => {
  return <PulseLoader loading={true} size="10px" color={grey[500]} {...props} data-testid="loader" />;
};
