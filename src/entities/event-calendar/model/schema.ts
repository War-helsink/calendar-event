import { z } from "zod";
import { IsoStringSchema, RepeatTypeSchema } from "@/src/shared/model";

export const CalendarEventTemplateSchema = z.object({
	id: z.string().min(1, "Id is required"),
	title: z.string().min(1, "Title is required"),
	start: IsoStringSchema,
	end: IsoStringSchema,
	repeat: RepeatTypeSchema,
});
