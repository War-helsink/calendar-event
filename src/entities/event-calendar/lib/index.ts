import type { EventCalendarType } from "../model/types";

export function isOverlapping(
	newEvent: EventCalendarType,
	existingEvents: EventCalendarType[],
): boolean {
	const newStart = new Date(newEvent.start);
	const newEnd = new Date(newEvent.end);

	return existingEvents.some((event) => {
		const eventStart = new Date(event.start);
		const eventEnd = new Date(event.end);
		return newStart < eventEnd && newEnd > eventStart;
	});
}
