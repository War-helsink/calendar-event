import { combineReducers } from "@reduxjs/toolkit";

import { eventCalendarReducer } from "@/src/entities/event-calendar";

export const rootReducer = combineReducers({
	eventCalendar: eventCalendarReducer,
});
