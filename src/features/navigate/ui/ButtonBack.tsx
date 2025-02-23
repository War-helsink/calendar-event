import { Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useRouter } from "expo-router";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";
import { ButtonOpacity } from "@/src/shared/ui";

export const ButtonBack: React.FC = () => {
	const route = useRouter();
	const color = useThemeColor("text");
	const backgroundColor = useThemeColor("background");

	return (
		<ButtonOpacity
			onPress={() => route.back()}
			className={`p-2.5 rounded-xl justify-center items-center ${Platform.OS === "android" && "mr-4"}`}
			style={{ backgroundColor }}
			asChild
		>
			<Ionicons name="chevron-back-outline" size={16} color={color} />
		</ButtonOpacity>
	);
};
