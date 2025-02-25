import { TouchableOpacity } from "react-native";
import { impactAsync, ImpactFeedbackStyle } from "expo-haptics";
import { Text } from "./Text";

import type { ViewStyle, StyleProp } from "react-native";

import { useThemeColor } from "../hooks/useThemeColor";

export interface ButtonOpacityProps extends React.PropsWithChildren {
	asChild?: boolean;
	className?: string;
	onPress?: () => void;
	style?: StyleProp<ViewStyle>;
	disabled?: boolean;
}
export const ButtonOpacity: React.FC<ButtonOpacityProps> = ({
	asChild = false,
	className,
	children,
	onPress,
	style,
	disabled,
}) => {
	const color = useThemeColor("text");

	return (
		<TouchableOpacity
			onPress={() => {
				impactAsync(ImpactFeedbackStyle.Soft);
				onPress?.();
			}}
			disabled={disabled}
			className={className}
			style={style}
		>
			{asChild ? (
				children
			) : (
				<Text className="text-center font-medium text-lg" style={{ color }}>
					{children}
				</Text>
			)}
		</TouchableOpacity>
	);
};
