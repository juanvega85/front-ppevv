import { IDataSource } from '../data/IDataSource';
import { IShiftCalendarEvent } from '../types/IShiftCalendarEvent';
import { TimeSlotEditor, TimeSlotViewerReported } from '@ppe/scheduling';

interface Props {
  event: IShiftCalendarEvent;
  onFinish?: () => void;
  dataSource: IDataSource;
  userFullName: string;
}

export const EventAdmin = ({ event, onFinish, dataSource, userFullName }: Props) => {
  if (event.shiftReport) {
    return <TimeSlotViewerReported timeSlot={event.timeSlot} report={event.shiftReport} />;
  }

  return (
    <TimeSlotEditor timeSlot={event.timeSlot} isPast={event.prevToday} onFinish={onFinish} dataSource={dataSource} userFullName={userFullName} />
  );
};
