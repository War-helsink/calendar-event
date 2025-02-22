import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { EventCalendarType, RepeatType } from "./types";
import type { ISOString } from "@/src/shared/model";
import { formattedISOString } from "@/src/shared/utils";
import { startOfDay, endOfDay } from "date-fns";
import { loadState, saveState } from "./thunks";

export interface State {
	title: string;
	dateStart: ISOString;
	dateEnd: ISOString;
	repeat: RepeatType;
	events: EventCalendarType[];
}

const initialState: State = {
	title: "",
	dateStart: formattedISOString(startOfDay(new Date())),
	dateEnd: formattedISOString(endOfDay(new Date())),
	repeat: "none",
	events: [],
};

export const eventCalendarSlice = createSlice({
	name: "eventCalendar",
	initialState,
	reducers: {
		setDate: (state, action: PayloadAction<ISOString>) => {
			const date = new Date(action.payload);
			const start = startOfDay(date);
			const end = endOfDay(date);

			state.dateStart = formattedISOString(start);
			state.dateEnd = formattedISOString(end);
		},
		setDateStart: (state, action: PayloadAction<ISOString>) => {
			const newDateStart = action.payload;
			if (new Date(newDateStart) >= new Date(state.dateEnd)) {
				return;
			}
			state.dateStart = newDateStart;
		},
		setDateEnd: (state, action: PayloadAction<ISOString>) => {
			const newDateEnd = action.payload;
			if (new Date(newDateEnd) <= new Date(state.dateStart)) {
				return;
			}
			state.dateEnd = newDateEnd;
		},
		setTitle: (state, action: PayloadAction<string>) => {
			state.title = action.payload;
		},
		setRepeat: (state, action: PayloadAction<RepeatType>) => {
			state.repeat = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loadState.fulfilled, (state, action) => {
			if (action.payload) {
				const events = [...action.payload];

				return { ...state, events };
			}
		});
		builder.addCase(saveState.fulfilled, (state, action) => {
			if (action.payload) {
				const events = [...state.events, action.payload];
				return { ...state, events };
			}
		});
	},
});

export const { setDate, setDateStart, setDateEnd, setTitle, setRepeat } =
	eventCalendarSlice.actions;

export const eventCalendarReducer = eventCalendarSlice.reducer;
