import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

import {
	eventCalendarReducer,
	eventCalendarTransform,
} from "@/src/entities/event-calendar";
import { storage } from "./localStorage";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["eventCalendar"],
	transforms: [eventCalendarTransform],
};

export const rootReducer = combineReducers({
	eventCalendar: eventCalendarReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;

export const persistedReducer = persistReducer<RootReducer>(
	persistConfig,
	rootReducer,
);
