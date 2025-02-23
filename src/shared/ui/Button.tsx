import { cn } from "@/src/shared/utils";
import { TouchableHighlight } from "react-native";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import { Text } from "./Text";

import type { ViewStyle, StyleProp } from "react-native";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";

export interface ButtonProps extends React.PropsWithChildren {
	asChild?: boolean;
	className?: string;
	onPress?: () => void;
	style?: StyleProp<ViewStyle>;
	disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
	asChild = false,
	className,
	children,
	onPress,
	style,
	disabled,
}) => {
	const backgroundColor = useThemeColor("buttonBackground");
	const underlayColor = useThemeColor("buttonUnderlay");
	const color = useThemeColor("buttonText");

	return (
		<TouchableHighlight
			onPress={() => {
				impactAsync(ImpactFeedbackStyle.Soft);
				onPress?.();
			}}
			disabled={disabled}
			underlayColor={underlayColor}
			className={cn("rounded-3xl w-full py-3", className)}
			style={[{ backgroundColor }, style]}
		>
			{asChild ? (
				children
			) : (
				<Text className="text-center font-medium text-lg" style={{ color }}>
					{children}
				</Text>
			)}
		</TouchableHighlight>
	);
};
