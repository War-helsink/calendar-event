import { View } from "react-native";
import { Text } from "@/src/shared/ui";
import type { EventAgendaItem } from "@/src/entities/agenda";

const formatDate = (dateStr: string): string => {
	const date = new Date(dateStr);
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	return `${day} числа ${month} месяца ${year} года`;
};

const formatTime = (dateStr: string): string => {
	const date = new Date(dateStr);
	return date.toLocaleTimeString("ru-RU", {
		hour: "2-digit",
		minute: "2-digit",
	});
};

export interface AgendaItemProps {
	item: EventAgendaItem;
}

export const AgendaItem: React.FC<AgendaItemProps> = ({ item }) => {
	return (
		<View
			style={{
				backgroundColor: "white",
				padding: 10,
				marginRight: 10,
				marginTop: 17,
			}}
		>
			<Text style={{ fontWeight: "bold" }}>{formatDate(item.startTime)}</Text>
			<Text>
				с {formatTime(item.startTime)} по {formatTime(item.endTime)}
			</Text>
			<Text>{item.title}</Text>
		</View>
	);
};
