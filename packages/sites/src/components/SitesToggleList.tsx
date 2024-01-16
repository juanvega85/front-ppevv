import { PlaceholderBox, Box, ToggleButton } from '@ppe/ui';
import { ISite } from '../types/ISite';
import { SiteViewModalButton } from './SiteViewModalButton';

interface Props {
  sites: ISite[];
  selected?: string[];
  onChange?: (id: string, value: boolean) => void;
  disabled?: boolean;
  loading?: boolean;
}

export const SitesToggleList = ({ sites, selected = [], onChange, disabled, loading }: Props) => {
  const isSelected = (id: string) => selected?.includes(id);

  if (loading) {
    return <PlaceholderBox repeat={10} />;
  }

  return (
    <>
      {sites.map((site) => (
        <Box key={site.id} sx={{ pr: 1, position: 'relative' }}>
          <ToggleButton
            disabled={disabled}
            value={isSelected(site.id)}
            onClick={(value) => onChange?.(site.id, value)}
            text={site.name}
            textAlign="left"
          />
          <div style={{ position: 'absolute', zIndex: 5, right: 15, top: 5 }}>
            <SiteViewModalButton data={site} disabled={disabled} lightColor={isSelected(site.id)} />
          </div>
        </Box>
      ))}
    </>
  );
};
