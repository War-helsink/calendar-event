import { ScheduleCalendar } from "@/src/widgets/schedule";
import { ThemedSafeAreaView } from "@/src/shared/ui";

const ScheduleScreen: React.FC = () => {
	return (
		<ThemedSafeAreaView
			className="w-full h-full px-5 pb-5"
			edges={["top", "left", "right"]}
		>
			<ScheduleCalendar />
		</ThemedSafeAreaView>
	);
};

export default ScheduleScreen;
