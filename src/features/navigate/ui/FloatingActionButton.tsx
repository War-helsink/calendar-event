import { Ionicons } from "@expo/vector-icons";
import { router, type Href } from "expo-router";
import { ButtonOpacity } from "@/src/shared/ui";

import { useThemeColor } from "@/src/shared/hooks/useThemeColor";

export interface FloatingActionButtonProps {
	href?: Href;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
	href,
}) => {
	const backgroundColor = useThemeColor("primary");

	return (
		<ButtonOpacity
			onPress={() => {
				if (!href) {
					return;
				}

				router.push(href);
			}}
			style={{ backgroundColor }}
			className="absolute bottom-4 right-4 w-10 h-10 rounded-full justify-center items-center shadow-lg"
		>
			<Ionicons name="add" size={24} color="#fff" />
		</ButtonOpacity>
	);
};
