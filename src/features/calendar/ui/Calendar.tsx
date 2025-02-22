import { View } from "react-native";
import { Calendar as CalendarRN, type DateData } from "react-native-calendars";

import { theme } from "../config/theme";
import type { Events } from "../model/types";
import type { DateFormat } from "@/src/shared/model";
import keys from "lodash/keys";

export interface CalendarProps {
	events?: Events;
	selectedDate: DateFormat;
	setSelectedDate?: (date: DateFormat) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
	events = {},
	selectedDate,
	setSelectedDate,
}) => {
	const getEventStyle = (date: DateFormat) => {
		if (events[date]?.type === "past") {
			return {
				selected: true,
				customStyles: {
					text: {
						color: "#6A6288",
					},
				},
				selectedColor: "#ECF0F4",
			};
		}
		if (events[date]?.type === "future") {
			return {
				selected: true,
				customStyles: {
					text: {
						color: "#F2AC26",
					},
				},
				selectedColor: "#FEFAE3",
			};
		}
		return {};
	};

	return (
		<View>
			<CalendarRN
				onDayPress={(day: DateData) => {
					setSelectedDate?.(day.dateString as DateFormat);
				}}
				style={{
					borderRadius: 12,
				}}
				markingType="custom"
				markedDates={{
					[selectedDate ? selectedDate : ""]: {
						selected: true,
						selectedColor: "#FFA500",
					},
					...keys(events).reduce((acc, date: DateFormat) => {
						acc[date] = getEventStyle(date);
						return acc;
					}, {}),
				}}
				theme={theme}
			/>
		</View>
	);
};
