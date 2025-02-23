import type { ISOString, DateFormat } from "@/src/shared/model";

export interface EventAgendaItem {
	id: string;
	title: string;
	start: ISOString;
	end: ISOString;
}

export type EventAgendaData  = {
	[date: DateFormat]: EventAgendaItem[];
};
