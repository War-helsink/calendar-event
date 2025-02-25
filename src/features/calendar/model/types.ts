import type { CalendarEventTemplate, ConcludedCalendarEvent } from "@/src/entities/event-calendar";
import type { ISOString, DateFormat } from "@/src/shared/model";

export interface EventAgendaItem {
	id: string;
	title: string;
	start: ISOString;
	end: ISOString;
	type: "template" | "concluded";
	templateId?: string;
	originalEvent: CalendarEventTemplate | ConcludedCalendarEvent;
}

export type EventAgendaData = {
	[date: DateFormat]: EventAgendaItem[];
};
