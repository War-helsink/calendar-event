import { router } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";

import type { EventAgendaItem } from "../model/types";

export interface AgendaItemProps {
	item: EventAgendaItem;
}

export const AgendaItem: React.FC<AgendaItemProps> = ({ item }) => {
	const handlePress = () => {
		if (item.type === "template") {
			router.push({
				pathname: "/event-form",
				params: { templateId: item.templateId },
			});
		} else {
			router.push({
				pathname: "/event-form",
				params: { eventId: item.id, readOnly: 1 },
			});
		}
	};

	return (
		<TouchableOpacity onPress={handlePress}>
			<View style={{ padding: 10, backgroundColor: "#fff", marginBottom: 5 }}>
				<Text style={{ fontWeight: "bold" }}>{item.title}</Text>
				<Text>
					{new Date(item.start).toLocaleTimeString()} -{" "}
					{new Date(item.end).toLocaleTimeString()}
				</Text>
			</View>
		</TouchableOpacity>
	);
};
