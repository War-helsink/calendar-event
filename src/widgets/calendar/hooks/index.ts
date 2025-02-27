import Toast from "react-native-toast-message";
import { useCallback } from "react";

import {
	addCalendarEventTemplate as addCalendarEvent,
	updateCalendarEventTemplate as updateCalendarEvent,
	removeCalendarEventTemplate as removeCalendarEvent,
	CalendarEventTemplateSchema,
	isOverlapping,
	type CalendarEventTemplate,
} from "@/src/entities/event-calendar";
import { useAppDispatch, store } from "@/src/provider/store";
import { createMultipleDayEvents } from "../lib";
import forEach from "lodash/forEach";

export const useCalendarEventTemplateChanges = () => {
	const dispatch = useAppDispatch();

	const addCalendarEventTemplate = useCallback(
		(event: CalendarEventTemplate) => {
			const result = CalendarEventTemplateSchema.safeParse(event);
			if (result.success) {
				const currentState = store.getState();

				if (
					!isOverlapping(
						event,
						currentState.eventCalendar.calendarEventTemplates,
					)
				) {
					const eventsToAdd = createMultipleDayEvents(event);

					forEach(eventsToAdd, (newEvent) => {
						dispatch(addCalendarEvent(newEvent));
					});

					return Toast.show({
						type: "success",
						text1: "Note added successfully.",
					});
				}

				return Toast.show({
					type: "error",
					text1: "Such a note already exists.",
				});
			}

			return Toast.show({
				type: "error",
				text1: "Fill in all fields.",
			});
		},
		[dispatch],
	);

	const updateCalendarEventTemplate = useCallback(
		(event: CalendarEventTemplate) => {
			const result = CalendarEventTemplateSchema.safeParse(event);
			if (result.success) {
				const currentState = store.getState();
				const calendarEventTemplates =
					currentState.eventCalendar.calendarEventTemplates.filter(
						(item) => item.id !== event.id,
					);

				if (!isOverlapping(event, calendarEventTemplates)) {
					dispatch(updateCalendarEvent(event));

					return Toast.show({
						type: "success",
						text1: "Note added successfully.",
					});
				}
				return Toast.show({
					type: "error",
					text1: "Such a note already exists.",
				});
			}
			return Toast.show({
				type: "error",
				text1: "Fill in all fields.",
			});
		},
		[dispatch],
	);

	const removeCalendarEventTemplate = useCallback(
		(id: string) => {
			dispatch(removeCalendarEvent(id));
		},
		[dispatch],
	);

	return {
		addCalendarEventTemplate,
		updateCalendarEventTemplate,
		removeCalendarEventTemplate,
	};
};
