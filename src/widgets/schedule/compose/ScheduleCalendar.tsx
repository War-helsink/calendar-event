import { setCalendarData } from "@/src/entities/event-calendar";
import { Agenda } from "@/src/features/calendar";
import { useAppSelector, useAppDispatch } from "@/src/provider/store";
import { formattedISOString } from "@/src/shared/utils";

export const ScheduleCalendar: React.FC = () => {
	const dispatch = useAppDispatch();
	const calendarEventTemplates = useAppSelector(
		(state) => state.eventCalendar.calendarEventTemplates,
	);
	const concludedCalendarEvents = useAppSelector(
		(state) => state.eventCalendar.concludedCalendarEvents,
	);

	return (
		<Agenda
			concludedCalendarEvents={concludedCalendarEvents}
			calendarEventTemplates={calendarEventTemplates}
			onDayPress={(date) => dispatch(setCalendarData(formattedISOString(date)))}
		/>
	);
};
