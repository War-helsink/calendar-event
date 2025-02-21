import { cn } from "@/src/shared/utils";
import { TextInput } from "react-native";

import type { TextStyle, StyleProp } from "react-native";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";

export interface InputProps {
	className?: string;
	onChange?: (value: string) => void;
	style?: StyleProp<TextStyle>;
	value?: string;
	placeholder?: string;
	multiline?: boolean;
	isSecure?: boolean;
}

export const Input: React.FC<InputProps> = ({
	className,
	value,
	style,
	onChange,
	placeholder,
	multiline,
	isSecure,
}) => {
	const color = useThemeColor("text");
	const backgroundColor = useThemeColor("inputBackground");
	const placeholderColor = useThemeColor("inputPlaceholderColor");

	return (
		<TextInput
			placeholder={placeholder}
			onChangeText={onChange}
			value={value}
			multiline={multiline}
			secureTextEntry={isSecure}
			placeholderTextColor={placeholderColor}
			className={cn("rounded-xl p-4", className)}
			style={[{ color, backgroundColor }, style]}
		/>
	);
};
