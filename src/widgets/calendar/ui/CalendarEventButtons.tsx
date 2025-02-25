import { router } from "expo-router";

import { View } from "react-native";
import { ButtonOpacity, Text } from "@/src/shared/ui";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";

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
	const colorCancel = useThemeColor("primary");
	const colorDelete = useThemeColor("danger");
	const colorSet = useThemeColor("success");

	return (
		<View className="flex-row justify-between px-4 py-4">
			<ButtonOpacity onPress={() => router.back()} asChild>
				<Text style={{ color: colorCancel }} className="font-bold">
					Cancel
				</Text>
			</ButtonOpacity>

			{isDelete && (
				<ButtonOpacity onPress={() => onDelete?.()} asChild>
					<Text style={{ color: colorDelete }} className="font-bold">
						Delete
					</Text>
				</ButtonOpacity>
			)}

			<ButtonOpacity
				asChild
				onPress={() => (isUpdate ? onUpdate?.() : onCreate?.())}
			>
				<Text style={{ color: colorSet }} className="font-bold">
					{isUpdate ? "Save" : "Create"}
				</Text>
			</ButtonOpacity>
		</View>
	);
};
