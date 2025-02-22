import type { ISOString } from "@/src/shared/model";

export type RepeatType = "weekly" | "bi-weekly" | "month" | "none";

export interface EventCalendarType {
	id: string;
	start: ISOString;
	end: ISOString;
	title: string;
	repeat: RepeatType;
}
