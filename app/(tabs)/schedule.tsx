import { ScheduleCalendar } from "@/src/widgets/schedule";
import { ThemedSafeAreaView } from "@/src/shared/ui";
import { FloatingActionButton } from "@/src/features/navigate";

const ScheduleScreen: React.FC = () => {
	return (
		<ThemedSafeAreaView
			className="w-full h-full px-5 pb-5"
			edges={["top", "left", "right"]}
		>
			<ScheduleCalendar />
			<FloatingActionButton href="/event-form" />
		</ThemedSafeAreaView>
	);
};

export default ScheduleScreen;
