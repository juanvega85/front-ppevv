// eslint-disable-next-line import/no-named-as-default
import ReCAPTCHA from 'react-google-recaptcha';

interface Props {
  onChange?: (token: string | null) => void;
  siteKey: string;
}

const ReCaptcha = ({ onChange, siteKey }: Props) => {
  return <ReCAPTCHA sitekey={siteKey} onChange={onChange} />;
};

export default ReCaptcha;
