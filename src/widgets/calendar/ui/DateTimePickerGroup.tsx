import { View } from "react-native";
import { Text, TimePicker } from "@/src/shared/ui";
import { formattedISOString } from "@/src/shared/utils";
import type { ISOString } from "@/src/shared/model";

interface DateTimePickerGroupProps {
	label: string;
	dateTime: Date;
	onChange: (date: ISOString) => void;
}

export const DateTimePickerGroup: React.FC<DateTimePickerGroupProps> = ({
	label,
	dateTime,
	onChange,
}) => {
	return (
		<View className="gap-2">
			<View className="flex-row items-center justify-between">
				<Text className="font-bold text-lg w-20">{label}</Text>
				<TimePicker
					mode="date"
					className="min-w-32"
					date={dateTime}
					setDate={(date) => onChange(formattedISOString(date))}
				/>
				<TimePicker
					mode="time"
					className="min-w-28"
					date={dateTime}
					setDate={(date) => onChange(formattedISOString(date))}
				/>
			</View>
		</View>
	);
};
