import { loadState, setCalendarData } from "@/src/entities/event-calendar";
import { Agenda } from "@/src/features/calendar";
import { useAppSelector, useAppDispatch } from "@/src/provider/store";
import { formattedISOString } from "@/src/shared/utils";
import { useEffect } from "react";

export const ScheduleCalendar: React.FC = () => {
	const dispatch = useAppDispatch();
	const events = useAppSelector((state) => state.eventCalendar.calendarEvents);

	useEffect(() => {
		dispatch(loadState());
	}, [dispatch]);

	return (
		<Agenda
			events={events}
			onDayPress={(date) => dispatch(setCalendarData(formattedISOString(date)))}
		/>
	);
};
