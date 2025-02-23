import type { EventAgendaData, EventAgendaItem } from "../model/types";
import type { DateFormat } from "@/src/shared/model";
import type { CalendarEventType } from "@/src/entities/event-calendar";
import { formattedDateFormat, formattedISOString } from "@/src/shared/utils";
import forEach from "lodash/forEach";
import keys from "lodash/keys";

import { startOfDay, endOfDay, addDays } from "date-fns";

export function transformEventsForAgenda(
	events: CalendarEventType[],
	rangeStart: Date,
	rangeEnd: Date,
): EventAgendaData {
	const agendaData: EventAgendaData = {};

	const addOccurrence = (dateKey: DateFormat, agendaItem: EventAgendaItem) => {
		if (!agendaData[dateKey]) {
			agendaData[dateKey] = [];
		}
		agendaData[dateKey].push(agendaItem);
	};

	const addMultiDayOccurrence = (
		occStart: Date,
		occEnd: Date,
		event: CalendarEventType,
	) => {
		let current = new Date(occStart);
		while (current <= occEnd) {
			const dateKey = formattedDateFormat(current);

			if (current >= occStart && current <= occEnd) {
				const isFirstDay =
					formattedDateFormat(current) === formattedDateFormat(occStart);
				const isLastDay =
					formattedDateFormat(current) === formattedDateFormat(occEnd);
				const start = isFirstDay
					? event.start
					: formattedISOString(startOfDay(current));
				const end = isLastDay
					? event.end
					: formattedISOString(endOfDay(current));

				addOccurrence(dateKey, {
					id: event.id,
					title: event.title,
					start: start,
					end: end,
				});
			}

			current = addDays(current, 1);
		}
	};

	forEach(events, (event) => {
		const eventStart = new Date(event.start);
		const eventEnd = new Date(event.end);

		if (event.repeat === "none") {
			addMultiDayOccurrence(eventStart, eventEnd, event);
		} else {
			if (event.repeat === "month") {
				const occStart = new Date(eventStart);
				const occEnd = new Date(eventEnd);
				while (occStart <= rangeEnd) {
					if (occEnd >= rangeStart) {
						addMultiDayOccurrence(occStart, occEnd, event);
					}
					occStart.setMonth(occStart.getMonth() + 1);
					occEnd.setMonth(occEnd.getMonth() + 1);
				}
			} else {
				const intervalDays = event.repeat === "weekly" ? 7 : 14;
				const occStart = new Date(eventStart);
				const occEnd = new Date(eventEnd);
				while (occStart <= rangeEnd) {
					if (occEnd >= rangeStart) {
						addMultiDayOccurrence(occStart, occEnd, event);
					}
					occStart.setDate(occStart.getDate() + intervalDays);
					occEnd.setDate(occEnd.getDate() + intervalDays);
				}
			}
		}
	});

	forEach(keys(agendaData), (dateKey) => {
		agendaData[dateKey as DateFormat].sort(
			(a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
		);
	});

	return agendaData;
}
