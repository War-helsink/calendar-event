import { useEffect, useState } from "react";
import { View } from "react-native";
import { Agenda as AgendaRN } from "react-native-calendars";
import { Text } from "@/src/shared/ui";
import {
	type EventAgendaItem,
	type EventAgendaData,
	transformEventsForAgenda,
} from "@/src/entities/agenda";
import type { EventCalendarType } from "@/src/entities/event-calendar";
import { AgendaItem } from "./AgendaItem";

export interface AgendaProps {
	events: EventCalendarType[];
}

export const Agenda: React.FC<AgendaProps> = ({ events }) => {
	const [agendaItems, setAgendaItems] = useState<EventAgendaData>({});

	useEffect(() => {
		const today = new Date();
		const rangeEnd = new Date();
		rangeEnd.setDate(today.getDate() + 30);

		const agendaData = transformEventsForAgenda(events, today, rangeEnd);

		setAgendaItems(agendaData);
	}, [events]);

	return (
		<AgendaRN
			items={agendaItems}
			renderItem={(item: EventAgendaItem) => <AgendaItem item={item} />}
			renderEmptyDate={() => (
				<View style={{ flex: 1, padding: 10 }}>
					<Text>Нет событий в этот день</Text>
				</View>
			)}
		/>
	);
};
