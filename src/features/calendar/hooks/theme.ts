import { Colors } from "@/src/shared/config/colors";
import { useColorScheme } from "@/src/shared/hooks/useColorScheme";
import { useMemo } from "react";

export const useCalendarTheme = () => {
	const isDarkMode = useColorScheme() === "dark";
	return useMemo(() => {
		const themeColors = isDarkMode ? Colors.dark : Colors.light;
		return {
			dayTextColor: themeColors.dark,
			monthTextColor: themeColors.dark,
			textDisabledColor: themeColors.medium,
			textSectionTitleColor: themeColors.strong,

			backgroundColor: themeColors.toolbarBackground,
			calendarBackground: themeColors.toolbarBackground,

			selectedDayTextColor: "#ffffff",
			selectedDayBackgroundColor: themeColors.primary,

			todayTextColor: themeColors.primary,
			arrowColor: themeColors.primary,

			textDayFontSize: 16,
			textDayFontWeight: "bold",
			textMonthFontSize: 18,
			textMonthFontWeight: "bold",
			textDayHeaderFontSize: 14,
			textDayHeaderFontWeight: "bold",
		};
	}, [isDarkMode]);
};

export const useAgendaTheme = () => {
	const isDarkMode = useColorScheme() === "dark";
	return useMemo(() => {
		const themeColors = isDarkMode ? Colors.dark : Colors.light;
		return {
			agendaDayTextColor: themeColors.strong,
			agendaDayNumColor: themeColors.strong,
			agendaTodayColor: themeColors.primary,
			agendaKnobColor: themeColors.primary,
			reservationsBackgroundColor: themeColors.reservationsBackground,

			dayTextColor: themeColors.dark,
			monthTextColor: themeColors.dark,
			textDisabledColor: themeColors.medium,
			textSectionTitleColor: themeColors.strong,
			dotColor: themeColors.primary,

			backgroundColor: themeColors.toolbarBackground,
			calendarBackground: themeColors.toolbarBackground,

			selectedDayTextColor: "#ffffff",
			selectedDayBackgroundColor: themeColors.primary,

			todayTextColor: themeColors.primary,
			arrowColor: themeColors.primary,
		};
	}, [isDarkMode]);
};
