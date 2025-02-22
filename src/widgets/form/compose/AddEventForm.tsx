import { View } from "react-native";
import { Button } from "@/src/shared/ui";

import { EventCalendar } from "../ui/EventCalendar";
import { EventForm } from "../ui/EventForm";
import { EventSelect } from "../ui/EventSelect";

import { useAppDispatch } from "@/src/provider/store";
import { saveState } from "@/src/entities/event-calendar";

export const AddEventForm: React.FC = () => {
	const dispatch = useAppDispatch();

	return (
		<View className="flex-1 gap-6 justify-between">
			<EventCalendar />
			<EventForm />
			<EventSelect />

			<Button onPress={() => dispatch(saveState())}>SAVE</Button>
		</View>
	);
};
