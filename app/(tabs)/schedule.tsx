import { Agenda } from "@/src/features/calendar";
import { ThemedSafeAreaView } from "@/src/shared/ui";

const ScheduleScreen: React.FC = () => {
	return (
		<ThemedSafeAreaView
			className="w-full h-full px-5 pb-5"
			edges={["top", "left", "right"]}
		>
			<Agenda />
		</ThemedSafeAreaView>
	);
};

export default ScheduleScreen;
