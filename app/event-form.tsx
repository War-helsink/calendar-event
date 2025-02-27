import { View, Platform } from "react-native";
import { CalendarEventForm } from "@/src/widgets/calendar";
import { ThemedSafeAreaView } from "@/src/shared/ui";

import { useRoute } from "@react-navigation/native";
import { useMemo } from "react";

const EventFormScreen: React.FC = () => {
	const route = useRoute();

	const calendarEventTemplate = useMemo(() => {
		const { item } = route.params as { item?: string };
		return item ? JSON.parse(item) : null;
	}, [route]);

	const isAndroid = Platform.OS === "android";

	return isAndroid ? (
		<ThemedSafeAreaView className="h-full w-full">
			<CalendarEventForm calendarEventTemplate={calendarEventTemplate} />
		</ThemedSafeAreaView>
	) : (
		<View className="h-full w-full">
			<CalendarEventForm calendarEventTemplate={calendarEventTemplate} />
		</View>
	);
};

export default EventFormScreen;
