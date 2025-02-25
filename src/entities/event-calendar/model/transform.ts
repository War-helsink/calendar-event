import { createTransform } from "redux-persist";
import type { State } from "./slice";

export const eventCalendarTransform = createTransform(
	(inboundState: State, key) => {
		console.log("Transform inbound", key, inboundState);
		return inboundState;
	},
	(outboundState: State, key) => {
		console.log("Transform outbound", key, outboundState);

		return outboundState;
	},
	{ whitelist: ["eventCalendar"] },
);
