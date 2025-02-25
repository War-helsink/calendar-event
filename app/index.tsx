import { View } from "react-native";
import { ScheduleCalendar } from "@/src/widgets/schedule";
import { ThemedSafeAreaView } from "@/src/shared/ui";
import { FloatingActionButton } from "@/src/features/navigate";

const HomeScreen: React.FC = () => {
	return (
		<ThemedSafeAreaView className="w-full h-full relative">
			<View className="w-full h-full px-2 relative">
				<ScheduleCalendar />
				<FloatingActionButton href="/event-form" />
			</View>
		</ThemedSafeAreaView>
	);
};

export default HomeScreen;
