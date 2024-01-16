import { IPermissions } from '@ppe/authentication';
import { IDataSource } from '../data/IDataSource';
import { IShiftCalendarEvent } from '../types/IShiftCalendarEvent';
import { ReportForm, TimeSlotViewerFuture, TimeSlotViewerReported } from '@ppe/scheduling';

interface Props {
  event: IShiftCalendarEvent;
  onFinish?: () => void;
  dataSource: IDataSource;
  permissions: IPermissions;
}

export const EventParticipant = ({ event, onFinish, dataSource, permissions }: Props) => {
  const { canCreate: canReport } = permissions;

  if (event.shiftReport) {
    return <TimeSlotViewerReported timeSlot={event.timeSlot} report={event.shiftReport} />;
  }
  if (!event.prevToday) {
    return <TimeSlotViewerFuture timeSlot={event.timeSlot} />;
  }
  if (canReport) {
    return <ReportForm timeSlot={event.timeSlot} onFinish={onFinish} dataSource={dataSource} />;
  }

  return <TimeSlotViewerFuture timeSlot={event.timeSlot} />;
};
