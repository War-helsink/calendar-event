import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CalendarEventTemplate, ConcludedCalendarEvent } from "./types";
import type { State } from "./slice";

export const addCalendarEventTemplate = createAsyncThunk(
	"eventCalendar/addCalendarEventTemplate",
	async (
		calendarEventTemplate: CalendarEventTemplate,
		{ rejectWithValue, getState },
	) => {
		try {
			const state = getState() as { eventCalendar: State };
			const calendarEventTemplates = [
				...state.eventCalendar.calendarEventTemplates,
				calendarEventTemplate,
			];
			await AsyncStorage.setItem(
				"calendarEventTemplates",
				JSON.stringify(calendarEventTemplates),
			);

			return calendarEventTemplates;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

export const updateCalendarEventTemplate = createAsyncThunk(
	"eventCalendar/updateCalendarEventTemplate",
	async (
		updateCalendarEventTemplate: CalendarEventTemplate,
		{ rejectWithValue, getState },
	) => {
		try {
			const state = getState() as { eventCalendar: State };

			const calendarEventTemplates =
				state.eventCalendar.calendarEventTemplates.map((event) =>
					event.id === updateCalendarEventTemplate.id
						? { ...event, ...updateCalendarEventTemplate }
						: event,
				);

			await AsyncStorage.setItem(
				"calendarEventTemplates",
				JSON.stringify(calendarEventTemplates),
			);

			return calendarEventTemplates;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

export const removeCalendarEventTemplate = createAsyncThunk(
	"eventCalendar/removeCalendarEventTemplate",
	async (id: string, { rejectWithValue, getState }) => {
		try {
			const state = getState() as { eventCalendar: State };
			const calendarEventTemplates =
				state.eventCalendar.calendarEventTemplates.filter(
					(item) => item.id !== id,
				);
			await AsyncStorage.setItem(
				"calendarEventTemplates",
				JSON.stringify(calendarEventTemplates),
			);

			return calendarEventTemplates;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

export const loadState = createAsyncThunk<
	[CalendarEventTemplate[] | null, ConcludedCalendarEvent[] | null]
>("eventCalendar/loadState", async (_, { rejectWithValue }) => {
	try {
		const jsonCalendarEventTemplates = await AsyncStorage.getItem(
			"calendarEventTemplates",
		);
		const jsonConcludedCalendarEvents = await AsyncStorage.getItem(
			"concludedCalendarEvents",
		);
		const calendarEventTemplates = jsonCalendarEventTemplates
			? (JSON.parse(jsonCalendarEventTemplates) as CalendarEventTemplate[])
			: null;
		const concludedCalendarEvents = jsonConcludedCalendarEvents
			? (JSON.parse(jsonConcludedCalendarEvents) as ConcludedCalendarEvent[])
			: null;

		return [calendarEventTemplates, concludedCalendarEvents];
	} catch (error) {
		return rejectWithValue(error);
	}
});
