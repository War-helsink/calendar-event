import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import { AddEventForm } from "@/src/widgets/form";
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

	const { item } = route.params as { item?: string };

	if (item) {
		console.log(JSON.parse(item));
	}

	return (
		<GestureHandlerRootView className="flex-1">
			<ThemedBottomSheet
				index={0}
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
							onPress={() => console.log(item ? "Save" : "Create")}
							asChild
						>
							<Text className="text-blue-500 font-bold">
								{item ? "Save" : "Create"}
							</Text>
						</ButtonOpacity>
					</View>
				)}
			>
				<ScrollView className="flex-1 px-5">
					<AddEventForm />
				</ScrollView>
			</ThemedBottomSheet>
		</GestureHandlerRootView>
	);
};

export default EventFormScreen;
