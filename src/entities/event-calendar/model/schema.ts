import { z } from "zod";
import { IsoStringSchema, RepeatTypeSchema } from "@/src/shared/model";

export const CalendarEventTemplateSchema = z
	.object({
		id: z.string().min(1, "Id is required"),
		title: z.string().min(1, "Title is required"),
		start: IsoStringSchema,
		end: IsoStringSchema,
		repeat: RepeatTypeSchema,
	})
	.refine((data) => new Date(data.start) <= new Date(data.end), {
		message: "Start date must be before or equal to end date",
		path: ["start"],
	})
	.refine((data) => new Date(data.end) >= new Date(data.start), {
		message: "End date must be after or equal to start date",
		path: ["end"],
	});
