import { useEffect, useState } from "react";
import { type DateData, Agenda as AgendaRN } from "react-native-calendars";
import {
	type EventAgendaItem,
	type EventAgendaData,
	transformEventsForAgenda,
} from "@/src/entities/agenda";
import type { CalendarEventType } from "@/src/entities/event-calendar";
import { addMonths } from "date-fns";

import { AgendaEmpty } from "./AgendaEmpty";
import { AgendaItem } from "./AgendaItem";
import { formattedDateFormat } from "@/src/shared/utils";

export interface AgendaProps {
	events: CalendarEventType[];
	onDayPress?: (date: Date) => void;
}

export const Agenda: React.FC<AgendaProps> = ({ events, onDayPress }) => {
	const [agendaItems, setAgendaItems] = useState<EventAgendaData>({});

	useEffect(() => {
		const start = new Date();
		const end = addMonths(start, 1);

		const agendaData = transformEventsForAgenda(events, start, end);
		setAgendaItems((prev) => ({ ...prev, ...agendaData }));
	}, [events]);

	const loadItemsForMonth = (month: DateData) => {
		const start = new Date(month.timestamp);
		const end = addMonths(start, 1);

		const agendaData = transformEventsForAgenda(events, start, end);

		const filledAgendaData = { ...agendaData };

		while (start <= end) {
			const dateString = formattedDateFormat(start);
			if (!filledAgendaData[dateString]) {
				filledAgendaData[dateString] = [];
			}
			start.setDate(start.getDate() + 1);
		}

		setAgendaItems((prev) => ({ ...prev, ...filledAgendaData }));
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
