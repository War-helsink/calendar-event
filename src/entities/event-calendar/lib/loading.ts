import forEach from "lodash/forEach";
import { addDays, addMonths } from "date-fns";
import type { ISOString } from "@/src/shared/model";
import { formattedISOString } from "@/src/shared/utils";

import type {
	RepeatType,
	CalendarEventTemplate,
	ConcludedCalendarEvent,
} from "../model/types";

export function syncCalendarEvents(state: {
	calendarEventTemplates: CalendarEventTemplate[];
	concludedCalendarEvents: ConcludedCalendarEvent[];
}): {
	calendarEventTemplates: CalendarEventTemplate[];
	concludedCalendarEvents: ConcludedCalendarEvent[];
} {
	const now = new Date();
	const updatedTemplates: CalendarEventTemplate[] = [];
	const updatedConcludedEvents: ConcludedCalendarEvent[] = [
		...state.concludedCalendarEvents,
	];

	forEach(state.calendarEventTemplates, (template) => {
		const nextEventDate = new Date(template.end);

		if (now >= nextEventDate) {
			updatedConcludedEvents.push({
				templateId: template.id,
				title: template.title,
				start: template.start,
				end: template.end,
			});

			if (template.repeat === "none") {
				return;
			}

			updatedTemplates.push({
				...template,
				start: addInterval(template.start, template.repeat),
				end: addInterval(template.end, template.repeat),
			});
		} else {
			updatedTemplates.push(template);
		}
	});

	return {
		calendarEventTemplates: updatedTemplates,
		concludedCalendarEvents: updatedConcludedEvents,
	};
}

function addInterval(dateStr: ISOString, repeat: RepeatType): ISOString {
	const date = new Date(dateStr);

	switch (repeat) {
		case "weekly":
			return formattedISOString(addDays(date, 7));
		case "bi-weekly":
			return formattedISOString(addDays(date, 14));
		case "month":
			return formattedISOString(addMonths(date, 1));
		default:
			return dateStr;
	}
}
