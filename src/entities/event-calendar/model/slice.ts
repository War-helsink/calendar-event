import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CalendarEventTemplate, ConcludedCalendarEvent } from "./types";
import type { ISOString } from "@/src/shared/model";
import { formattedISOString } from "@/src/shared/utils";
import { startOfDay } from "date-fns";
import {
	addCalendarEventTemplate,
	updateCalendarEventTemplate,
	removeCalendarEventTemplate,
	loadState,
} from "./thunks";

export interface State {
	calendarData: ISOString;
	concludedCalendarEvents: ConcludedCalendarEvent[];
	calendarEventTemplates: CalendarEventTemplate[];
}

const initialState: State = {
	calendarData: formattedISOString(startOfDay(new Date())),
	calendarEventTemplates: [],
	concludedCalendarEvents: [],
};

export const eventCalendarSlice = createSlice({
	name: "eventCalendar",
	initialState,
	reducers: {
		setCalendarData: (state, action: PayloadAction<ISOString>) => {
			state.calendarData = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loadState.fulfilled, (state, action) => {
			if (action.payload) {
				const [calendarEventTemplates, concludedCalendarEvents] =
					action.payload;

				let newState = { ...state };

				if (calendarEventTemplates) {
					newState = { ...newState, calendarEventTemplates };
				}
				if (concludedCalendarEvents) {
					newState = { ...newState, concludedCalendarEvents };
				}

				return newState;
			}
		});
		builder.addCase(addCalendarEventTemplate.fulfilled, (state, action) => {
			if (action.payload) {
				const calendarEventTemplates = [...action.payload];
				return { ...state, calendarEventTemplates };
			}
		});
		builder.addCase(updateCalendarEventTemplate.fulfilled, (state, action) => {
			if (action.payload) {
				const calendarEventTemplates = [...action.payload];
				return { ...state, calendarEventTemplates };
			}
		});
		builder.addCase(removeCalendarEventTemplate.fulfilled, (state, action) => {
			if (action.payload) {
				const calendarEventTemplates = [...action.payload];
				return { ...state, calendarEventTemplates };
			}
		});
	},
});

export const { setCalendarData } = eventCalendarSlice.actions;

export const eventCalendarReducer = eventCalendarSlice.reducer;
