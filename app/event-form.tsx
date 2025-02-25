import { View } from "react-native";
import { CalendarEventForm } from "@/src/widgets/calendar";

import { useRoute } from "@react-navigation/native";
import { useMemo } from "react";

const EventFormScreen: React.FC = () => {
	const route = useRoute();

	const calendarEventTemplate = useMemo(() => {
		const { item } = route.params as { item?: string };
		return item ? JSON.parse(item) : null;
	}, [route]);

	return (
		<View className="h-full w-full">
			<CalendarEventForm calendarEventTemplate={calendarEventTemplate} />
		</View>
	);
};

export default EventFormScreen;
