import { combineReducers } from "@reduxjs/toolkit";

import { dateReducer } from "@/src/entities/date";

export const rootReducer = combineReducers({
	date: dateReducer,
});
