import { loadState } from "@/src/entities/event-calendar";
import { Agenda } from "@/src/features/calendar";
import { useAppSelector, useAppDispatch } from "@/src/provider/store";
import { useEffect } from "react";

export const ScheduleCalendar: React.FC = () => {
	const dispatch = useAppDispatch();
	const events = useAppSelector((state) => state.eventCalendar.events);

	useEffect(() => {
		dispatch(loadState());
	}, [dispatch]);

	return <Agenda events={events} />;
};
