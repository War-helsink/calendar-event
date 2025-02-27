import { router } from "expo-router";

import { View } from "react-native";
import { ButtonOpacity, Text } from "@/src/shared/ui";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";
import { cn } from "@/src/shared/utils";

export interface CalendarEventButtonsProps {
	disabled?: boolean;

	isUpdate?: boolean;
	isDelete?: boolean;

	onCreate?: () => void;
	onUpdate?: () => void;
	onDelete?: () => void;
}

export const CalendarEventButtons: React.FC<CalendarEventButtonsProps> = ({
	disabled = false,
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
				<Text style={{ color: colorCancel }} className="text-lg font-bold">
					Cancel
				</Text>
			</ButtonOpacity>

			{isDelete && (
				<ButtonOpacity onPress={() => onDelete?.()} asChild>
					<Text
						style={{ color: colorDelete }}
						className="text-lg font-bold cursor-pointer"
					>
						Delete
					</Text>
				</ButtonOpacity>
			)}

			<ButtonOpacity
				asChild
				onPress={() => (isUpdate ? onUpdate?.() : onCreate?.())}
				disabled={disabled}
			>
				<Text
					style={{ color: colorSet }}
					className={cn("text-lg font-bold", disabled && "opacity-50")}
				>
					{isUpdate ? "Save" : "Create"}
				</Text>
			</ButtonOpacity>
		</View>
	);
};
