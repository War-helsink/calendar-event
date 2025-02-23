import { router } from "expo-router";
import type { EventAgendaItem } from "@/src/entities/agenda";
import { ButtonOpacity, Text } from "@/src/shared/ui";

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
		<ButtonOpacity
			asChild
			style={{
				backgroundColor: "white",
			}}
			onPress={() =>
				router.push({
					pathname: "/event-form",
					params: { item: JSON.stringify(item) },
				})
			}
			className="px-6 py-2.5 mt-5 justify-center items-center rounded-xl"
		>
			<Text className="font-bold">{formatDate(item.startTime)}</Text>
			<Text>
				с {formatTime(item.startTime)} по {formatTime(item.endTime)}
			</Text>
			<Text>{item.title}</Text>
		</ButtonOpacity>
	);
};
