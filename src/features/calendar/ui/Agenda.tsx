import { useEffect, useState } from "react";
import { type DateData, Agenda as AgendaRN } from "react-native-calendars";
import {
	type EventAgendaItem,
	type EventAgendaData,
	transformEventsForAgenda,
} from "@/src/entities/agenda";
import type {
	CalendarEventTemplate,
	ConcludedCalendarEvent,
} from "@/src/entities/event-calendar";
import { addMonths } from "date-fns";

import { AgendaEmpty } from "./AgendaEmpty";
import { AgendaItem } from "./AgendaItem";

export interface AgendaProps {
	onDayPress?: (date: Date) => void;
	calendarEventTemplates: CalendarEventTemplate[];
	concludedCalendarEvents: ConcludedCalendarEvent[];
}

export const Agenda: React.FC<AgendaProps> = ({
	calendarEventTemplates,
	onDayPress,
}) => {
	const [agendaItems, setAgendaItems] = useState<EventAgendaData>({});

	useEffect(() => {
		const start = new Date();
		const end = addMonths(start, 1);

		const agendaData = transformEventsForAgenda(
			calendarEventTemplates,
			start,
			end,
		);
		setAgendaItems({ ...agendaData });
	}, [calendarEventTemplates]);

	const loadItemsForMonth = (month: DateData) => {
		const start = new Date(month.timestamp);
		const end = addMonths(start, 1);

		const agendaData = transformEventsForAgenda(
			calendarEventTemplates,
			start,
			end,
		);

		setAgendaItems({ ...agendaData });
	};

	return (
		<AgendaRN
			items={agendaItems}
			onDayPress={(day: DateData) => onDayPress?.(new Date(day.timestamp))}
			renderItem={(item: EventAgendaItem) => <AgendaItem item={item} />}
			renderEmptyDate={() => <AgendaEmpty />}
			loadItemsForMonth={loadItemsForMonth}
		/>
	);
};
