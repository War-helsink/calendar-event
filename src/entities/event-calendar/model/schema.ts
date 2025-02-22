import { z } from "zod";

export const IsoStringSchema = z
	.string()
	.regex(
		/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
		"Invalid ISO date format",
	);

export const RepeatTypeSchema = z.enum([
	"weekly",
	"bi-weekly",
	"month",
	"none",
]);

export const StateSchema = z.object({
	title: z.string().min(1, "Title is required"),
	dateStart: IsoStringSchema,
	dateEnd: IsoStringSchema,
	repeat: RepeatTypeSchema,
});

export type TStateValues = z.infer<typeof StateSchema>;
