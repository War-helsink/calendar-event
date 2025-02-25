import { View } from "react-native";
import { Calendar as CalendarRN, type DateData } from "react-native-calendars";

import type { DateFormat } from "@/src/shared/model";
import { useCalendarTheme } from "../hooks/theme";

export interface CalendarProps {
	selectedDate: DateFormat;
	setSelectedDate?: (date: DateFormat) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
	selectedDate,
	setSelectedDate,
}) => {
	const theme = useCalendarTheme();

	return (
		<View>
			<CalendarRN
				onDayPress={(day: DateData) => {
					setSelectedDate?.(day.dateString as DateFormat);
				}}
				style={{
					borderRadius: 12,
					overflow: "hidden",
				}}
				markingType="custom"
				markedDates={{
					[selectedDate ? selectedDate : ""]: {
						selected: true,
					},
				}}
				theme={theme}
			/>
		</View>
	);
};
