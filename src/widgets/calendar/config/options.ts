import type { RepeatType } from "@/src/entities/event-calendar";

export const RepeatOptions: { label: string; value: RepeatType }[] = [
	{ label: "Not repeat", value: "none" },
	{ label: "Weekly", value: "weekly" },
	{ label: "Bi-weekly", value: "bi-weekly" },
	{ label: "Monthly", value: "month" },
];
