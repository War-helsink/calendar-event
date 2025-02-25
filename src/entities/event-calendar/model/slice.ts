import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CalendarEventTemplate, ConcludedCalendarEvent } from "./types";
import type { ISOString } from "@/src/shared/model";
import { formattedISOString } from "@/src/shared/utils";
import { startOfDay } from "date-fns";

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
		addCalendarEventTemplate: (
			state,
			action: PayloadAction<CalendarEventTemplate>,
		) => {
			const calendarEventTemplate = action.payload;

			state.calendarEventTemplates = [
				...state.calendarEventTemplates,
				calendarEventTemplate,
			];
		},

		updateCalendarEventTemplate: (
			state,
			action: PayloadAction<CalendarEventTemplate>,
		) => {
			const updateCalendarEventTemplate = action.payload;

			state.calendarEventTemplates = state.calendarEventTemplates.map(
				(calendarEventTemplate) =>
					calendarEventTemplate.id === updateCalendarEventTemplate.id
						? { ...calendarEventTemplate, ...updateCalendarEventTemplate }
						: calendarEventTemplate,
			);
		},
		removeCalendarEventTemplate: (state, action: PayloadAction<string>) => {
			const id = action.payload;
			state.calendarEventTemplates = state.calendarEventTemplates.filter(
				(item) => item.id !== id,
			);
		},
	},
});

export const {
	setCalendarData,
	addCalendarEventTemplate,
	updateCalendarEventTemplate,
	removeCalendarEventTemplate,
} = eventCalendarSlice.actions;

export const eventCalendarReducer = eventCalendarSlice.reducer;
