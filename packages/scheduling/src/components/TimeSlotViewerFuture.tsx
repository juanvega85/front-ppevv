import { Box } from '@ppe/ui';
import { IProfile, ProfileButton } from '@ppe/profiles';
import { ITimeSlot } from '../types/ITimeSlot';

interface Props {
  timeSlot: ITimeSlot;
}

export const TimeSlotViewerFuture = ({ timeSlot }: Props) => {
  const assigned = timeSlot.assigned as IProfile[];
  return (
    <>
      {assigned.map((item) => (
        <Box key={item.id} sx={{ mb: 1.5 }}>
          <ProfileButton data={item} />
        </Box>
      ))}
    </>
  );
};
