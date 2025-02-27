import { View } from "react-native";
import { Text, Input } from "@/src/shared/ui";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";

interface EventTitleInputProps {
	error?: boolean;
	value: string;
	onChange: (value: string) => void;
}

export const EventTitleInput: React.FC<EventTitleInputProps> = ({
	error = false,
	value,
	onChange,
}) => {
	const errorColor = useThemeColor("danger");

	return (
		<View className="gap-2">
			<Text
				className="font-bold text-lg"
				style={
					error && {
						color: errorColor,
					}
				}
			>
				Event Name
			</Text>
			<Input
				placeholder="Event Name"
				value={value}
				onChangeText={onChange}
				style={
					error && {
						borderColor: errorColor,
						borderWidth: 1,
					}
				}
			/>
		</View>
	);
};
