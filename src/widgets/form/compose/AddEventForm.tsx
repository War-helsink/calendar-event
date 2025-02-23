import { View } from "react-native";

import { EventCalendar } from "../ui/EventCalendar";
import { EventForm } from "../ui/EventForm";
import { EventSelect } from "../ui/EventSelect";

export const AddEventForm: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	return (
		<View className="flex-1 gap-6">
			<EventCalendar />
			<EventForm />
			<EventSelect />

			{children}
		</View>
	);
};
