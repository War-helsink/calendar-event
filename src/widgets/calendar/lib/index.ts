import uuid from "react-native-uuid";
import { addDays, setHours, setMinutes, startOfDay } from "date-fns";
import type { CalendarEventTemplate } from "@/src/entities/event-calendar";

import type { ISOString } from "@/src/shared/model";
import { formattedISOString } from "@/src/shared/utils";

export function createMultipleDayEvents(
	event: CalendarEventTemplate,
): CalendarEventTemplate[] {
	const events: CalendarEventTemplate[] = [];

	const startDate = new Date(event.start);
	const endDate = new Date(event.end);

	if (startDate.toDateString() === endDate.toDateString()) {
		events.push({ ...event });
	} else {
		let currentDate = startOfDay(startDate);

		while (currentDate <= startOfDay(endDate)) {
			const eventStart = setEventTime(
				currentDate,
				startDate.getHours(),
				startDate.getMinutes(),
			);
			const eventEnd = setEventTime(
				currentDate,
				endDate.getHours(),
				endDate.getMinutes(),
			);

			events.push({
				...event,
				start: eventStart,
				end: eventEnd,
				id: uuid.v4(),
			});

			currentDate = addDays(currentDate, 1);
		}
	}

	return events;
}

function setEventTime(date: Date, hours: number, minutes: number): ISOString {
	const newDate = setHours(setMinutes(date, minutes), hours);
	return formattedISOString(newDate);
}
