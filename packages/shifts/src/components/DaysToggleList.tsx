import { PlaceholderBox, ToggleButton } from '@ppe/ui';
import { IWeekDay } from '@ppe/common';

interface Props {
  days: IWeekDay[];
  selected?: string[];
  onChange?: (id: string, value: boolean) => void;
  disabled?: boolean;
  loading?: boolean;
}

export const DaysToggleList = ({ days, selected = [], onChange, disabled, loading }: Props) => {
  const isSelected = (id: string) => selected?.includes(id);

  if (loading) {
    return <PlaceholderBox repeat={7} />;
  }

  return (
    <>
      {days.map((day) => (
        <ToggleButton key={day.id} disabled={disabled} value={isSelected(day.id)} onClick={(value) => onChange?.(day.id, value)} text={day.name} />
      ))}
    </>
  );
};
