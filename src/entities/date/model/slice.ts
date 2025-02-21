import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RepeatType } from "./types";

export interface State {
	date: string;
	dateStart: string | null;
	dateEnd: string | null;
	repeat: RepeatType,
}

const initialState: State = {
	date: new Date().toISOString(),
	dateStart: null,
	dateEnd: null,
	repeat: "weekly",
};

export const dateSlice = createSlice({
	name: "date",
	initialState,
	reducers: {
		setDate: (state, action: PayloadAction<string>) => {
			state.date = action.payload;
		},
	},
});

export const { setDate } = dateSlice.actions;

export const dateReducer = dateSlice.reducer;
