import { View } from "react-native";
import { Text, Select } from "@/src/shared/ui";

import { RepeatOptions } from "../config/options";
import type { RepeatType } from "@/src/entities/event-calendar";

export interface RepeatEventSelectProps {
	repeat: RepeatType;
	setRepeat?: (repeat: RepeatType) => void;
}

export const RepeatEventSelect: React.FC<RepeatEventSelectProps> = ({
	repeat,
	setRepeat,
}) => {
	return (
		<View className="gap-2">
			<Text className="font-bold text-lg">Repeat</Text>
			<Select
				className="mb-4"
				items={RepeatOptions}
				selectedValue={repeat}
				onValueChange={(value) => setRepeat?.(value as RepeatType)}
			/>
		</View>
	);
};
