import { router } from "expo-router";
import { View, ScrollView } from "react-native";
import { Calendar } from "@/src/features/calendar";
import { Formik } from "formik";
import { RepeatEventSelect } from "../ui/RepeatEventSelect";
import { DateTimePickerGroup } from "../ui/DateTimePickerGroup";
import { EventTitleInput } from "../ui/EventTitleInput";
import { CalendarEventButtons } from "../ui/CalendarEventButtons";

import { useAppSelector } from "@/src/provider/store";
import { useCalendarEventTemplateChanges } from "../hooks";
import {
	CalendarEventTemplateSchema,
	createEventCalendar,
	type CalendarEventTemplate,
} from "@/src/entities/event-calendar";
import { formattedDateFormat, formattedISOString } from "@/src/shared/utils";
import { endOfDay, startOfDay } from "date-fns";
import forEach from "lodash/forEach";

export interface CalendarEventFormProps {
	calendarEventTemplate?: CalendarEventTemplate | null;
}

export const CalendarEventForm: React.FC<CalendarEventFormProps> = ({
	calendarEventTemplate,
}) => {
	const date = useAppSelector((state) => state.eventCalendar.calendarData);
	const initialValues: CalendarEventTemplate = calendarEventTemplate
		? calendarEventTemplate
		: createEventCalendar(new Date(date));

	const validate = (values: CalendarEventTemplate) => {
		const result = CalendarEventTemplateSchema.safeParse(values);
		if (result.success) return {};
		const errors: Record<string, string> = {};

		forEach(result.error.errors, (error) => {
			if (error.path?.length > 0) {
				errors[error.path[0] as string] = error.message;
			}
		});

		return errors;
	};

	const {
		addCalendarEventTemplate,
		updateCalendarEventTemplate,
		removeCalendarEventTemplate,
	} = useCalendarEventTemplateChanges();

	const handleSubmit = (values: CalendarEventTemplate) => {
		if (calendarEventTemplate) {
			updateCalendarEventTemplate(values);
		} else {
			addCalendarEventTemplate(values);
		}
		router.back();
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleSubmit}
			validate={validate}
		>
			{(formik) => (
				<View className="flex-1">
					<CalendarEventButtons
						disabled={!formik.isValid || !formik.dirty}
						isUpdate={!!calendarEventTemplate}
						isDelete={!!calendarEventTemplate}
						onCreate={formik.handleSubmit}
						onUpdate={formik.handleSubmit}
						onDelete={() => {
							removeCalendarEventTemplate(formik.values.id);
							router.back();
						}}
					/>
					<ScrollView className="flex-1 px-5">
						<View className="gap-6">
							<Calendar
								selectedDate={formattedDateFormat(
									new Date(formik.values.start),
								)}
								setSelectedDate={(dateFormat) => {
									const date = new Date(dateFormat);
									const start = startOfDay(date);
									const end = endOfDay(date);
									formik.setValues({
										...formik.values,
										start: formattedISOString(start),
										end: formattedISOString(end),
									});
								}}
							/>
							<EventTitleInput
								value={formik.values.title}
								onChange={(title) => formik.setFieldValue("title", title)}
								error={!formik.isValid && !!formik.errors.title}
							/>
							<DateTimePickerGroup
								label="Starts"
								dateTime={new Date(formik.values.start)}
								onChange={(start) => formik.setFieldValue("start", start)}
								error={!formik.isValid && !!formik.errors.start}
							/>
							<DateTimePickerGroup
								label="Ends"
								dateTime={new Date(formik.values.end)}
								onChange={(end) => formik.setFieldValue("end", end)}
								error={!formik.isValid && !!formik.errors.end}
							/>
							<RepeatEventSelect
								repeat={formik.values.repeat}
								setRepeat={(repeat) => formik.setFieldValue("repeat", repeat)}
							/>
						</View>
					</ScrollView>
				</View>
			)}
		</Formik>
	);
};
