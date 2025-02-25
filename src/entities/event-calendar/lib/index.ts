import uuid from "react-native-uuid";
import type { CalendarEventTemplate } from "../model/types";
import { formattedISOString } from "@/src/shared/utils";
import { endOfDay, startOfDay } from "date-fns";

export function isOverlapping(
	newEvent: CalendarEventTemplate,
	existingEvents: CalendarEventTemplate[],
): boolean {
	const newStart = new Date(newEvent.start);
	const newEnd = new Date(newEvent.end);

	return existingEvents.some((event) => {
		const eventStart = new Date(event.start);
		const eventEnd = new Date(event.end);
		return newStart < eventEnd && newEnd > eventStart;
	});
}

export function createEventCalendar(date = new Date()): CalendarEventTemplate {
	return {
		id: uuid.v4(),
		nextEvent: formattedISOString(startOfDay(date)),
		title: "",
		start: formattedISOString(startOfDay(date)),
		end: formattedISOString(endOfDay(date)),
		repeat: "none",
	};
}