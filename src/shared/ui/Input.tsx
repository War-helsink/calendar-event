import { cn } from "@/src/shared/utils";
import { TextInput, type TextInputProps } from "react-native";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";

export interface InputProps extends TextInputProps {
	isSecure?: boolean;
}

export const Input: React.FC<InputProps> = ({
	className,
	value,
	style,
	isSecure,
	...props
}) => {
	const color = useThemeColor("text");
	const backgroundColor = useThemeColor("inputBackground");
	const placeholderColor = useThemeColor("inputPlaceholderColor");

	return (
		<TextInput
			value={value}
			secureTextEntry={isSecure}
			placeholderTextColor={placeholderColor}
			className={cn("rounded-xl p-4", className)}
			style={[{ color, backgroundColor }, style]}
			{...props}
		/>
	);
};
