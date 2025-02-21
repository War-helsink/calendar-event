import { useState } from "react";
import { View, TouchableHighlight } from "react-native";
import type { ViewStyle, StyleProp } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Text } from "./Text";

import { useThemeColor } from "@/src/shared/hooks/useThemeColor";
import { cn, formattedTime, formattedDate } from "@/src/shared/utils";

export interface TimePickerProps {
	className?: string;
	date?: Date;
	setDate?: (date: Date) => void;
	style?: StyleProp<ViewStyle>;
	mode?: "date" | "time";
}

export const TimePicker: React.FC<TimePickerProps> = ({
	className,
	style,
	mode = "time",
	date = new Date(),
	setDate,
}) => {
	const color = useThemeColor("inputPlaceholderColor");
	const backgroundColor = useThemeColor("inputBackground");
	const underlayColor = useThemeColor("background");

	const [isVisible, setIsVisible] = useState(false);

	const handleConfirm = (date: Date) => {
		setDate?.(date);
		setIsVisible(false);
	};

	return (
		<View>
			<TouchableHighlight
				onPress={() => setIsVisible(true)}
				className={cn("rounded-xl p-4", className)}
				underlayColor={underlayColor}
				style={[{ backgroundColor }, style]}
			>
				<Text className="text-center" style={{ color }}>
					{mode === "time" ? formattedTime(date) : formattedDate(date)}
				</Text>
			</TouchableHighlight>
			<DateTimePickerModal
				isVisible={isVisible}
				mode={mode}
				date={date}
				onConfirm={handleConfirm}
				onCancel={() => setIsVisible(false)}
			/>
		</View>
	);
};
