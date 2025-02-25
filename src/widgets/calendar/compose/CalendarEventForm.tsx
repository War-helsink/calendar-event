import { router } from "expo-router";
import { View, ScrollView } from "react-native";
import { Calendar } from "@/src/features/calendar";
import { RepeatEventSelect } from "../ui/RepeatEventSelect";
import { DateTimePickerGroup } from "../ui/DateTimePickerGroup";
import { EventTitleInput } from "../ui/EventTitleInput";
import { CalendarEventButtons } from "../ui/CalendarEventButtons";

import { useState } from "react";
import { useAppSelector } from "@/src/provider/store";
import { useCalendarEventTemplateChanges } from "../hooks";
import {
	createEventCalendar,
	type CalendarEventTemplate,
} from "@/src/entities/event-calendar";
import { formattedDateFormat, formattedISOString } from "@/src/shared/utils";
import { endOfDay, startOfDay } from "date-fns";

export interface CalendarEventFormProps {
	calendarEventTemplate?: CalendarEventTemplate | null;
}

export const CalendarEventForm: React.FC<CalendarEventFormProps> = ({
	calendarEventTemplate,
}) => {
	const date = useAppSelector((state) => state.eventCalendar.calendarData);
	const [calendarEvent, setCalendarEvent] = useState<CalendarEventTemplate>(
		() => {
			if (calendarEventTemplate) {
				return calendarEventTemplate;
			}
			return createEventCalendar(new Date(date));
		},
	);

	const {
		addCalendarEventTemplate,
		updateCalendarEventTemplate,
		removeCalendarEventTemplate,
	} = useCalendarEventTemplateChanges();

	return (
		<View className="flex-1">
			<CalendarEventButtons
				onCreate={() => {
					addCalendarEventTemplate(calendarEvent);
					router.back();
				}}
				onUpdate={() => {
					updateCalendarEventTemplate(calendarEvent);
					router.back();
				}}
				onDelete={() => {
					removeCalendarEventTemplate(calendarEvent.id);
					router.back();
				}}
				isUpdate={!!calendarEventTemplate}
				isDelete={!!calendarEventTemplate}
			/>

			<ScrollView className="flex-1 px-5">
				<View className="gap-6">
					<Calendar
						selectedDate={formattedDateFormat(new Date(calendarEvent.start))}
						setSelectedDate={(dateFormat) => {
							const date = new Date(dateFormat);
							const start = startOfDay(date);
							const end = endOfDay(date);

							setCalendarEvent((prev) => ({
								...prev,
								start: formattedISOString(start),
								end: formattedISOString(end),
							}));
						}}
					/>
					<EventTitleInput
						value={calendarEvent.title}
						onChange={(title) => {
							setCalendarEvent((prev) => ({ ...prev, title }));
						}}
					/>
					<DateTimePickerGroup
						label="Starts"
						dateTime={new Date(calendarEvent.start)}
						onChange={(start) => {
							setCalendarEvent((prev) => ({ ...prev, start }));
						}}
					/>
					<DateTimePickerGroup
						label="Ends"
						dateTime={new Date(calendarEvent.end)}
						onChange={(end) => {
							setCalendarEvent((prev) => ({ ...prev, end }));
						}}
					/>
					<RepeatEventSelect
						repeat={calendarEvent.repeat}
						setRepeat={(repeat) => {
							setCalendarEvent((prev) => ({ ...prev, repeat }));
						}}
					/>
				</View>
			</ScrollView>
		</View>
	);
};
