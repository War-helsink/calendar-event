import { AddEventForm } from "@/src/widgets/form";
import { Button, ThemedSafeAreaView } from "@/src/shared/ui";
import { saveState } from "@/src/entities/event-calendar";
import { useAppDispatch } from "@/src/provider/store";

const HomeScreen: React.FC = () => {
	const dispatch = useAppDispatch();

	return (
		<ThemedSafeAreaView
			className="w-full h-full px-5 pb-5"
			edges={["top", "left", "right"]}
		>
			<AddEventForm>
				<Button onPress={() => dispatch(saveState())}>SAVE</Button>
			</AddEventForm>
		</ThemedSafeAreaView>
	);
};

export default HomeScreen;
