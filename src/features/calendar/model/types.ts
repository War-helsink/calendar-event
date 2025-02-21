import type { DateFormat } from "@/src/shared/model";

export type EventType = "past" | "future";

export type Events = Record<DateFormat, { type: EventType }>;
