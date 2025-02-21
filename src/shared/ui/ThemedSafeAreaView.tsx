import { useThemeColor } from "@/src/shared/hooks/useThemeColor";
import {
	SafeAreaView,
	type SafeAreaViewProps,
} from "react-native-safe-area-context";

export interface ThemedSafeAreaViewProps extends SafeAreaViewProps {
	lightColor?: string;
	darkColor?: string;
}

export const ThemedSafeAreaView: React.FC<ThemedSafeAreaViewProps> = ({
	className,
	style,
	lightColor,
	darkColor,
	...otherProps
}) => {
	const backgroundColor = useThemeColor("background", {
		light: lightColor,
		dark: darkColor,
	});

	return (
		<SafeAreaView
			className={className}
			style={[{ backgroundColor }, style]}
			{...otherProps}
		/>
	);
};
