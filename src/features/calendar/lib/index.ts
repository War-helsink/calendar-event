import uuid from "react-native-uuid";
import type { EventAgendaData, EventAgendaItem } from "../model/types";
import type {
	CalendarEventTemplate,
	ConcludedCalendarEvent,
	RepeatType,
} from "@/src/entities/event-calendar";
import { formattedDateFormat, formattedISOString } from "@/src/shared/utils";
import forEach from "lodash/forEach";
import keys from "lodash/keys";
import {
	startOfDay,
	addDays,
	addMonths,
	eachDayOfInterval,
	startOfMonth,
} from "date-fns";
import type { DateFormat } from "@/src/shared/model";

const processConcludedEvent = (
	event: ConcludedCalendarEvent,
): EventAgendaItem => ({
	id: uuid.v4(),
	title: event.title,
	start: event.start,
	end: event.end,
	type: "concluded",
	originalEvent: event,
});

function processTemplateOccurrences(
	template: CalendarEventTemplate,
	viewEnd: Date,
): EventAgendaItem[] {
	const items: EventAgendaItem[] = [];
	let occurrenceDate = startOfDay(new Date(template.start));
	const repeatType = template.repeat;

	while (occurrenceDate <= viewEnd) {
		const originalStart = new Date(template.start);
		const originalEnd = new Date(template.end);
		const occurrenceStart = setTime(occurrenceDate, originalStart);
		const occurrenceEnd = setTime(occurrenceDate, originalEnd);

		items.push({
			id: uuid.v4(),
			title: template.title,
			start: formattedISOString(occurrenceStart),
			end: formattedISOString(occurrenceEnd),
			type: "template",
			templateId: template.id,
			originalEvent: template,
		});

		if (repeatType === "none") break;
		occurrenceDate = getNextOccurrence(occurrenceDate, repeatType);
	}

	return items;
}

const groupByDate = (items: EventAgendaItem[]): EventAgendaData =>
	items.reduce((agendaData, item) => {
		const dateKey = formattedDateFormat(new Date(item.start));
		if (!agendaData[dateKey]) {
			agendaData[dateKey] = [];
		}
		agendaData[dateKey].push(item);
		return agendaData;
	}, {} as EventAgendaData);

function sortAgendaData(agendaData: EventAgendaData): EventAgendaData {
	forEach(keys(agendaData) as DateFormat[], (dateKey) => {
		agendaData[dateKey] = agendaData[dateKey].sort((a, b) => {
			const startA = new Date(a.start).getTime();
			const startB = new Date(b.start).getTime();
			const endA = new Date(a.end).getTime();
			const endB = new Date(b.end).getTime();

			return startA !== startB ? startA - startB : endA - endB;
		});
	});
	return agendaData;
}

function fillEmptyDates(
	agendaData: EventAgendaData,
	viewStart: Date,
	viewEnd: Date,
): EventAgendaData {
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

function setTime(date: Date, timeDate: Date): Date {
	return new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
		timeDate.getHours(),
		timeDate.getMinutes(),
		timeDate.getSeconds(),
	);
}

export function transformEventsForAgenda(
	calendarEventTemplates: CalendarEventTemplate[],
	concludedCalendarEvents: ConcludedCalendarEvent[],
	viewStart: Date,
	viewEnd: Date,
): EventAgendaData {
	const concludedItems = concludedCalendarEvents.map(processConcludedEvent);
	const templateItems = calendarEventTemplates.flatMap((template) =>
		processTemplateOccurrences(template, viewEnd),
	);
	const allItems = [...concludedItems, ...templateItems];

	const groupedAgenda = groupByDate(allItems);
	const sortedAgenda = sortAgendaData(groupedAgenda);

	return fillEmptyDates(sortedAgenda, viewStart, viewEnd);
}
