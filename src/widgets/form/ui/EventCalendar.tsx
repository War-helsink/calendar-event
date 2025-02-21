import { Calendar } from "@/src/features/calendar";
import { formattedDateFormat } from "@/src/shared/utils";

import { useAppDispatch, useAppSelector } from "@/src/provider/store";
import { setDate } from "@/src/entities/date";

export const EventCalendar: React.FC = () => {
	const date = useAppSelector((state) => state.date.date);
	const dispatch = useAppDispatch();

	return (
		<Calendar
			selectedDate={formattedDateFormat(new Date(date))}
			setSelectedDate={(date) =>
				dispatch(setDate(new Date(date).toISOString()))
			}
		/>
	);
};
