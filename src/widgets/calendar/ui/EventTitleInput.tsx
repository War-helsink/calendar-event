import { View } from "react-native";
import { Text, Input } from "@/src/shared/ui";

interface EventTitleInputProps {
	value: string;
	onChange: (value: string) => void;
}

export const EventTitleInput: React.FC<EventTitleInputProps> = ({
	value,
	onChange,
}) => {
	return (
		<View className="gap-2">
			<Text className="font-bold text-lg">Event Name</Text>
			<Input placeholder="Event Name" value={value} onChange={onChange} />
		</View>
	);
};
