import { Calendar } from "@/src/features/calendar";
import { formattedDateFormat, formattedISOString } from "@/src/shared/utils";

import { useAppDispatch, useAppSelector } from "@/src/provider/store";
import { setDate } from "@/src/entities/event-calendar";

export const EventCalendar: React.FC = () => {
	const date = useAppSelector((state) => state.eventCalendar.dateStart);
	const dispatch = useAppDispatch();

	return (
		<Calendar
			selectedDate={formattedDateFormat(new Date(date))}
			setSelectedDate={(date) =>
				dispatch(setDate(formattedISOString(new Date(date))))
			}
		/>
	);
};
