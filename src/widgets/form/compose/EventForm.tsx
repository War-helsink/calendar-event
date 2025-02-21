import { View } from "react-native";
import { Text, Button, Input, Select, TimePicker } from "@/src/shared/ui";
import { EventCalendar } from "../ui/EventCalendar";

import { useState } from "react";

import { options } from "../config/options";

export const EventForm: React.FC = () => {
	const [selected, setSelected] = useState<string>("weekly");

	return (
		<View className="flex-1 gap-6 justify-between">
			<EventCalendar />

			<View className="flex-1 gap-6">
				<View className="gap-2">
					<Text className="font-bold text-lg">Event Name</Text>
					<Input placeholder="Event Name" />
				</View>

				<View className="gap-2">
					<View className="flex-row items-center justify-between">
						<Text className="font-bold text-lg w-20">Starts</Text>
						<TimePicker className="min-w-32" mode="date" />
						<TimePicker className="min-w-28" mode="time" />
					</View>

					<View className="flex-row items-center justify-between">
						<Text className="font-bold text-lg w-20">Ends</Text>
						<TimePicker className="min-w-32" mode="date" />
						<TimePicker className="min-w-28" mode="time" />
					</View>
				</View>
			</View>

			<View className="gap-2">
				<Text className="font-bold text-lg">Repeat</Text>
				<Select
					data={options}
					value={selected}
					onChange={setSelected}
					className="mb-4"
				/>
			</View>

			<Button>SAVE</Button>
		</View>
	);
};
