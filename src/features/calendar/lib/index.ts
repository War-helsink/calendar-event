import uuid from "react-native-uuid";
import type { EventAgendaData, EventAgendaItem } from "../model/types";
import type {
	CalendarEventTemplate,
	ConcludedCalendarEvent,
	RepeatType,
} from "@/src/entities/event-calendar";
import { formattedDateFormat, formattedISOString } from "@/src/shared/utils";
import forEach from "lodash/forEach";
import {
	startOfDay,
	addDays,
	addMonths,
	eachDayOfInterval,
	startOfMonth,
} from "date-fns";
import type { DateFormat } from "@/src/shared/model";

export function transformEventsForAgenda(
	calendarEventTemplates: CalendarEventTemplate[],
	concludedCalendarEvents: ConcludedCalendarEvent[],
	viewStart: Date,
	viewEnd: Date,
): EventAgendaData {
	const agendaData: EventAgendaData = {};

	forEach(concludedCalendarEvents, (event) => {
		const dateKey = formattedDateFormat(new Date(event.start));
		if (!agendaData[dateKey]) {
			agendaData[dateKey] = [];
		}

		const agendaItem: EventAgendaItem = {
			id: uuid.v4(),
			title: event.title,
			start: event.start,
			end: event.end,
			type: "concluded",
			originalEvent: event,
		};
		agendaData[dateKey].push(agendaItem);
	});

	forEach(calendarEventTemplates, (template) => {
		let occurrenceDate = startOfDay(new Date(template.start));
		const repeatType = template.repeat;

		while (occurrenceDate < viewStart && repeatType !== "none") {
			occurrenceDate = getNextOccurrence(occurrenceDate, repeatType);
		}

		while (occurrenceDate <= viewEnd) {
			const originalStart = new Date(template.start);
			const originalEnd = new Date(template.end);

			const occurrenceStart = new Date(
				occurrenceDate.getFullYear(),
				occurrenceDate.getMonth(),
				occurrenceDate.getDate(),
				originalStart.getHours(),
				originalStart.getMinutes(),
				originalStart.getSeconds(),
			);
			const occurrenceEnd = new Date(
				occurrenceDate.getFullYear(),
				occurrenceDate.getMonth(),
				occurrenceDate.getDate(),
				originalEnd.getHours(),
				originalEnd.getMinutes(),
				originalEnd.getSeconds(),
			);

			const dateKey = formattedDateFormat(occurrenceStart);
			if (!agendaData[dateKey]) {
				agendaData[dateKey] = [];
			}
			const agendaItem: EventAgendaItem = {
				id: uuid.v4(),
				title: template.title,
				start: formattedISOString(occurrenceStart),
				end: formattedISOString(occurrenceEnd),
				type: "template",
				templateId: template.id,
				originalEvent: template,
			};
			agendaData[dateKey].push(agendaItem);

			if (repeatType === "none") break;
			occurrenceDate = getNextOccurrence(occurrenceDate, repeatType);
		}
	});

	forEach(agendaData, (events, date) => {
		agendaData[date as DateFormat] = events.sort((a, b) => {
			const startA = new Date(a.start).getTime();
			const startB = new Date(b.start).getTime();
			const endA = new Date(a.end).getTime();
			const endB = new Date(b.end).getTime();

			return startA !== startB ? startA - startB : endA - endB;
		});
	});

	const allDates = eachDayOfInterval({
		start: startOfMonth(viewStart),
		end: viewEnd,
	});

	forEach(allDates, (date) => {
		const formattedDate = formattedDateFormat(date);

		if (!agendaData[formattedDate]) {
			agendaData[formattedDate] = [];
		}
	});

	return agendaData;
}

function getNextOccurrence(date: Date, repeatType: RepeatType): Date {
	switch (repeatType) {
		case "weekly":
			return addDays(date, 7);
		case "bi-weekly":
			return addDays(date, 14);
		case "month":
			return addMonths(date, 1);
		default:
			return new Date(8640000000000000);
	}
}
