import { router } from "expo-router";

import { View } from "react-native";
import { ButtonOpacity, Text } from "@/src/shared/ui";

export interface CalendarEventButtonsProps {
	isUpdate?: boolean;
	isDelete?: boolean;
	
	onCreate?: () => void;
	onUpdate?: () => void;
	onDelete?: () => void;
}

export const CalendarEventButtons: React.FC<CalendarEventButtonsProps> = ({
	isUpdate = false,
	isDelete = false,
	onCreate,
	onUpdate,
	onDelete,
}) => {
	return (
		<View className="flex-row justify-between px-4 py-4">
			<ButtonOpacity onPress={() => router.back()} asChild>
				<Text className="font-bold">Cancel</Text>
			</ButtonOpacity>

			{isDelete && (
				<ButtonOpacity onPress={() => onDelete?.()} asChild>
					<Text className="font-bold">Delete</Text>
				</ButtonOpacity>
			)}

			<ButtonOpacity
				asChild
				onPress={() => (isUpdate ? onUpdate?.() : onCreate?.())}
			>
				<Text className="font-bold">{isUpdate ? "Save" : "Create"}</Text>
			</ButtonOpacity>
		</View>
	);
};
