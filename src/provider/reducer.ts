import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
	eventCalendarReducer,
	eventCalendarTransform,
} from "@/src/entities/event-calendar";

const persistConfig = {
	key: "root",
	storage: AsyncStorage,
	whitelist: ["eventCalendar"],
	transforms: [eventCalendarTransform],
};

export const rootReducer = combineReducers({
	eventCalendar: eventCalendarReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;

export const persistedReducer = persistReducer<RootReducer>(persistConfig, rootReducer);
