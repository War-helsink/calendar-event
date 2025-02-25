import type { ISOString } from "@/src/shared/model";

export type RepeatType = "weekly" | "bi-weekly" | "month" | "none";

export interface CalendarEventTemplate {
	id: string;
	nextEvent: ISOString;
	title: string;
	start: ISOString;
	end: ISOString;
	repeat: RepeatType;
}

export interface ConcludedCalendarEvent {
	templateId: string;
	title: string;
	start: ISOString;
	end: ISOString;
}
