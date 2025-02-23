import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CalendarEventType } from "./types";
import type { ISOString } from "@/src/shared/model";
import { formattedISOString } from "@/src/shared/utils";
import { startOfDay } from "date-fns";
import { loadState } from "./thunks";

export interface State {
	calendarData: ISOString;
	calendarEvents: CalendarEventType[];
}

const initialState: State = {
	calendarData: formattedISOString(startOfDay(new Date())),
	calendarEvents: [],
};

export const eventCalendarSlice = createSlice({
	name: "eventCalendar",
	initialState,
	reducers: {
		setCalendarData: (state, action: PayloadAction<ISOString>) => {
			state.calendarData = action.payload;
		},
		addCalendarEvent: (state, action: PayloadAction<CalendarEventType>) => {
			state.calendarEvents = [...state.calendarEvents, action.payload];
		},
		updateCalendarEvent: (state, action: PayloadAction<CalendarEventType>) => {
			// state.calendarEvents = [...state.calendarEvents, action.payload];
		},
		removeCalendarEvent: (state, action: PayloadAction<string>) => {
			// state.calendarEvents = [...state.calendarEvents, action.payload];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loadState.fulfilled, (state, action) => {
			if (action.payload) {
				const events = [...action.payload];

				return { ...state, calendarEvents: events };
			}
		});
	},
});

export const {
	setCalendarData,
	addCalendarEvent,
	updateCalendarEvent,
	removeCalendarEvent,
} = eventCalendarSlice.actions;

export const eventCalendarReducer = eventCalendarSlice.reducer;
