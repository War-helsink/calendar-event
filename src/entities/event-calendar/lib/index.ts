import uuid from "react-native-uuid";
import type { CalendarEventType } from "../model/types";
import { formattedISOString } from "@/src/shared/utils";
import { endOfDay, startOfDay } from "date-fns";

export function isOverlapping(
	newEvent: CalendarEventType,
	existingEvents: CalendarEventType[],
): boolean {
	const newStart = new Date(newEvent.start);
	const newEnd = new Date(newEvent.end);

	return existingEvents.some((event) => {
		const eventStart = new Date(event.start);
		const eventEnd = new Date(event.end);
		return newStart < eventEnd && newEnd > eventStart;
	});
}

export function createEventCalendar(date = new Date()): CalendarEventType {
	return {
		id: uuid.v4(),
		title: "",
		start: formattedISOString(startOfDay(date)),
		end: formattedISOString(endOfDay(date)),
		repeat: "none",
	};
}