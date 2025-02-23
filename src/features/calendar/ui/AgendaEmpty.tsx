import { View } from "react-native";
import { Text } from "@/src/shared/ui";

export const AgendaEmpty: React.FC = () => {
	return (
		<View className="h-24 p-2.5 flex justify-center items-center">
			<Text>There are no events on this day.</Text>
		</View>
	);
};
