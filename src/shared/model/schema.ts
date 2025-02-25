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
