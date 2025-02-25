import { router } from "expo-router";
import { View, StyleSheet } from "react-native";
import { ButtonOpacity, Text } from "@/src/shared/ui";
import { formattedTime, formattedDate } from "@/src/shared/utils";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";

import type { EventAgendaItem } from "../model/types";

export interface AgendaItemProps {
	item: EventAgendaItem;
}

export const AgendaItem: React.FC<AgendaItemProps> = ({ item }) => {
	const backgroundColor = useThemeColor("toolbarBackground");

	const templateColor = useThemeColor("primary");
	const concludedColor = useThemeColor("strong");

	const handlePress = () => {
		if (item.type === "template") {
			router.push({
				pathname: "/event-form",
				params: { item: JSON.stringify(item.originalEvent) },
			});
		}
	};

	return (
		<ButtonOpacity
			disabled={item.type === "concluded"}
			onPress={handlePress}
			asChild
		>
			<View
				className={"px-6 py-2.5 m-5 rounded-xl gap-2"}
				style={[style.shadow, { backgroundColor }]}
			>
				<View className="flex-row gap-2 items-center">
					<View
						className="w-4 h-4 rounded-full"
						style={{
							backgroundColor:
								item.type === "concluded"
									? concludedColor
									: templateColor,
						}}
					/>
					<Text className="text-xl font-bold">{item.title}</Text>
				</View>

				<View className="flex-row gap-2 items-center justify-between">
					<Text className="font-medium text-sm">
						{formattedTime(new Date(item.start))} -{" "}
						{formattedTime(new Date(item.end))}
					</Text>
					<Text className="font-medium text-sm">
						{formattedDate(new Date(item.start))}
					</Text>
				</View>

				{item.type === "concluded" && (
					<Text
						className="text-xs italic"
						style={{ color: concludedColor }}
					>
						Completed
					</Text>
				)}
				<View
					className="w-full h-1 rounded-full"
					style={{
						backgroundColor:
							item.type === "concluded"
								? concludedColor
								: templateColor,
					}}
				/>
			</View>
		</ButtonOpacity>
	);
};

export const style = StyleSheet.create({
	shadow: {
		shadowColor: "#000",
		shadowOffset: {
			width: 1,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 12,
		elevation: 5,
	},
});
