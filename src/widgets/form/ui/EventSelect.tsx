import { View } from "react-native";
import { Text, Select } from "@/src/shared/ui";

import { options } from "../config/options";

import { setRepeat } from "@/src/entities/event-calendar";
import { useAppDispatch, useAppSelector } from "@/src/provider/store";

export const EventSelect: React.FC = () => {
	const repeat = useAppSelector((state) => state.eventCalendar.repeat);
	const dispatch = useAppDispatch();
	
	return (
		<View className="gap-2">
			<Text className="font-bold text-lg">Repeat</Text>
			<Select
				className="mb-4"
				data={options}
				value={repeat}
				onChange={(item) => dispatch(setRepeat(item.value))}
			/>
		</View>
	);
};
