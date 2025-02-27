import { View } from "react-native";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";
import { memo } from "react";

export const AgendaEmpty: React.FC = memo(() => {
	const backgroundColor = useThemeColor("medium");

	return (
		<View
			className="h-[1px] w-full rounded-full my-14"
			style={{ backgroundColor }}
		/>
	);
});

AgendaEmpty.displayName = "AgendaEmpty";
