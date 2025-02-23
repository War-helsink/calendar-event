import { View } from "react-native";
import { Calendar } from "@/src/features/calendar";
import { RepeatEventSelect } from "../ui/RepeatEventSelect";
import { DateTimePickerGroup } from "../ui/DateTimePickerGroup";
import { EventTitleInput } from "../ui/EventTitleInput";

import { useState } from "react";
import { useAppSelector } from "@/src/provider/store";
import {
	createEventCalendar,
	type CalendarEventType,
} from "@/src/entities/event-calendar";
import { formattedDateFormat, formattedISOString } from "@/src/shared/utils";
import { endOfDay, startOfDay } from "date-fns";

export interface CalendarEventFormProps {
	event?: CalendarEventType | null;
}

export const CalendarEventForm: React.FC<CalendarEventFormProps> = ({
	event: calendarEvent,
}) => {
	const date = useAppSelector((state) => state.eventCalendar.calendarData);
	const [event, setEvent] = useState<CalendarEventType>(() => {
		if (calendarEvent) {
			return calendarEvent;
		}
		return createEventCalendar(new Date(date));
	});

	console.log("<-- Calendar Event Form Render -->");

	return (
		<View className="flex-1 gap-6">
			<Calendar
				selectedDate={formattedDateFormat(new Date(event.start))}
				setSelectedDate={(dateFormat) => {
					const date = new Date(dateFormat);
					const start = startOfDay(date);
					const end = endOfDay(date);

					setEvent((prev) => ({
						...prev,
						start: formattedISOString(start),
						end: formattedISOString(end),
					}));
				}}
			/>
			<EventTitleInput
				value={event.title}
				onChange={(title) => setEvent((prev) => ({ ...prev, title }))}
			/>
			<DateTimePickerGroup
				label="Starts"
				dateTime={new Date(event.start)}
				onChange={(start) => setEvent((prev) => ({ ...prev, start }))}
			/>
			<DateTimePickerGroup
				label="Ends"
				dateTime={new Date(event.end)}
				onChange={(end) => setEvent((prev) => ({ ...prev, end }))}
			/>
			<RepeatEventSelect
				repeat={event.repeat}
				setRepeat={(repeat) => setEvent((prev) => ({ ...prev, repeat }))}
			/>
		</View>
	);
};
