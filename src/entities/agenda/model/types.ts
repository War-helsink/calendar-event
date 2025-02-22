import type { ISOString, DateFormat } from "@/src/shared/model";

export interface EventAgendaItem {
	id: string;
	title: string;
	startTime: ISOString;
	endTime: ISOString;
}

export type EventAgendaData  = {
	[date: DateFormat]: EventAgendaItem[];
};
