import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import { CalendarEventForm } from "@/src/widgets/calendar";
import { ButtonOpacity, Text, ThemedBottomSheet } from "@/src/shared/ui";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useMemo } from "react";
import { useRoute } from "@react-navigation/native";

const EventFormScreen: React.FC = () => {
	const route = useRoute();
	const snapPoints = useMemo(() => ["90%"], []);

	const handleSheetChanges = (index: number) => {
		if (index === -1) {
			router.back();
		}
	};

	const event = useMemo(() => {
		const { item } = route.params as { item?: string };
		return item ? JSON.parse(item) : null;
	}, [route]);

	return (
		<GestureHandlerRootView className="flex-1">
			<ThemedBottomSheet
				enablePanDownToClose={true}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
				handleComponent={() => (
					<View className="flex-row justify-between px-4 py-4">
						<ButtonOpacity onPress={() => router.back()} asChild>
							<Text className="font-bold">Cancel</Text>
						</ButtonOpacity>

						<View className="w-10 h-1 bg-gray-300 rounded-full" />

						<ButtonOpacity
							onPress={() => console.log(event ? "Save" : "Create")}
							asChild
						>
							<Text className="font-bold">
								{event ? "Save" : "Create"}
							</Text>
						</ButtonOpacity>
					</View>
				)}
			>
				<ScrollView className="flex-1 px-5">
					<CalendarEventForm event={event} />
				</ScrollView>
			</ThemedBottomSheet>
		</GestureHandlerRootView>
	);
};

export default EventFormScreen;
