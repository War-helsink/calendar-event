import { Ionicons } from "@expo/vector-icons";
import { router, type Href } from "expo-router";
import { ButtonOpacity } from "@/src/shared/ui";

export interface FloatingActionButtonProps {
	href?: Href;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
	href,
}) => {
	return (
		<ButtonOpacity
			onPress={() => {
				if (!href) {
					return;
				}

				router.push(href);
			}}
			className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-blue-500 justify-center items-center shadow-lg"
		>
			<Ionicons name="add" size={24} color="white" />
		</ButtonOpacity>
	);
};
