import { createTransform } from "redux-persist";

import { type State, initialState } from "./slice";
import { syncCalendarEvents } from "../lib/loading";

export const eventCalendarTransform = createTransform(
	(inboundState: State, key) => {
		return {
			concludedCalendarEvents: inboundState.concludedCalendarEvents,
			calendarEventTemplates: inboundState.calendarEventTemplates,
		};
	},
	(outboundState: State, key) => {
		const calendarEvents = syncCalendarEvents(outboundState);

		return {
			calendarData: initialState.calendarData,
			concludedCalendarEvents: calendarEvents.concludedCalendarEvents,
			calendarEventTemplates: calendarEvents.calendarEventTemplates,
		};
	},
	{ whitelist: ["eventCalendar"] },
);
