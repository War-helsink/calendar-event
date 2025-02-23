import { View } from "react-native";
import { Text, Input, TimePicker } from "@/src/shared/ui";

import { formattedISOString } from "@/src/shared/utils";
import { setDateStart, setDateEnd, setTitle } from "@/src/entities/event-calendar";
import { useAppDispatch, useAppSelector } from "@/src/provider/store";

export const EventForm: React.FC = () => {
	const dispatch = useAppDispatch();
	const title = useAppSelector((state) => state.eventCalendar.title);
	const dateStart = useAppSelector((state) => state.eventCalendar.dateStart);
	const dateEnd = useAppSelector((state) => state.eventCalendar.dateEnd);

	return (
		<View className="gap-6">
			<View className="gap-2">
				<Text className="font-bold text-lg">Event Name</Text>
				<Input
					placeholder="Event Name"
					value={title}
					onChange={(value) => dispatch(setTitle(value))}
				/>
			</View>

			<View className="gap-2">
				<View className="flex-row items-center justify-between">
					<Text className="font-bold text-lg w-20">Starts</Text>
					<TimePicker
						mode="date"
						className="min-w-32"
						date={new Date(dateStart)}
						setDate={(date) => dispatch(setDateStart(formattedISOString(date)))}
					/>
					<TimePicker
						mode="time"
						className="min-w-28"
						date={new Date(dateStart)}
						setDate={(date) => dispatch(setDateStart(formattedISOString(date)))}
					/>
				</View>

				<View className="flex-row items-center justify-between">
					<Text className="font-bold text-lg w-20">Ends</Text>
					<TimePicker
						mode="date"
						className="min-w-32"
						date={new Date(dateEnd)}
						setDate={(date) => dispatch(setDateEnd(formattedISOString(date)))}
					/>
					<TimePicker
						mode="time"
						className="min-w-28"
						date={new Date(dateEnd)}
						setDate={(date) => dispatch(setDateEnd(formattedISOString(date)))}
					/>
				</View>
			</View>
		</View>
	);
};
