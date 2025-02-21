import { EventForm } from "@/src/widgets/form";
import { ThemedSafeAreaView } from "@/src/shared/ui";

const HomeScreen: React.FC = () => {
	return (
		<ThemedSafeAreaView
			className="w-full h-full px-5 pb-5"
			edges={["top", "left", "right"]}
		>
			<EventForm />
		</ThemedSafeAreaView>
	);
};

export default HomeScreen;
