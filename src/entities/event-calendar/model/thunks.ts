import uuid from "react-native-uuid";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { State } from "./slice";
import type { EventCalendarType } from "./types";
import { StateSchema } from "./schema";
import { isOverlapping } from "../lib";

export const saveState = createAsyncThunk(
	"eventCalendar/saveState",
	async (_, { rejectWithValue, getState }) => {
		try {
			const state = getState() as { eventCalendar: State };
			const result = StateSchema.safeParse(state.eventCalendar);

			if (result.success) {
				const event: EventCalendarType = {
					id: uuid.v4(),
					title: state.eventCalendar.title,
					start: state.eventCalendar.dateStart,
					end: state.eventCalendar.dateEnd,
					repeat: state.eventCalendar.repeat,
				};

				if (!isOverlapping(event, state.eventCalendar.events)) {
					await AsyncStorage.setItem(
						"events",
						JSON.stringify([...state.eventCalendar.events, event]),
					);

					Toast.show({
						type: "success",
						text1: "Note added successfully.",
					});

					return event;
				}

				Toast.show({
					type: "error",
					text1: "Such a note already exists.",
				});

				return null;
			}

			Toast.show({
				type: "error",
				text1: "Fill in all fields.",
			});

			return null;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);

export const loadState = createAsyncThunk(
	"eventCalendar/loadState",
	async (_, { rejectWithValue }) => {
		try {
			const jsonValue = await AsyncStorage.getItem("events");
			const events = jsonValue ? JSON.parse(jsonValue) : null;

			return events;
		} catch (error) {
			return rejectWithValue(error);
		}
	},
);
