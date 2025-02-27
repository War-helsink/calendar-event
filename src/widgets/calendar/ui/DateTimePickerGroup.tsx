import { View } from "react-native";
import { Text, TimePicker } from "@/src/shared/ui";
import { formattedISOString } from "@/src/shared/utils";
import type { ISOString } from "@/src/shared/model";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";

interface DateTimePickerGroupProps {
	error?: boolean;
	label: string;
	dateTime: Date;
	onChange: (date: ISOString) => void;
}

export const DateTimePickerGroup: React.FC<DateTimePickerGroupProps> = ({
	error,
	label,
	dateTime,
	onChange,
}) => {
	const errorColor = useThemeColor("danger");

	return (
		<View className="gap-2">
			<View className="flex-row items-center justify-between">
				<Text
					className="font-bold text-lg w-20"
					style={error && { color: errorColor }}
				>
					{label}
				</Text>
				<TimePicker
					mode="date"
					className="min-w-32"
					date={dateTime}
					textColor={error && errorColor}
					setDate={(date) => onChange(formattedISOString(date))}
				/>
				<TimePicker
					mode="time"
					className="min-w-28"
					date={dateTime}
					textColor={error && errorColor}
					setDate={(date) => onChange(formattedISOString(date))}
				/>
			</View>
		</View>
	);
};
