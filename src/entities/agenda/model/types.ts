import type { ISOString, DateFormat } from "@/src/shared/model";
import type { RepeatType } from "../../event-calendar";

export interface EventAgendaItem {
	id: string;
	title: string;
	start: ISOString;
	end: ISOString;
	repeat: RepeatType;
}

export type EventAgendaData = {
	[date: DateFormat]: EventAgendaItem[];
};
