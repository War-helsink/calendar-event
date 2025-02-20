import { Text as TextRN, type TextProps as TextPropsRN } from "react-native";
import { useThemeColor } from "@/components/shared/hooks/useThemeColor";

export type TextProps = TextPropsRN & {
	lightColor?: string;
	darkColor?: string;
};

export function Text({ style, lightColor, darkColor, ...rest }: TextProps) {
	const color = useThemeColor("text", { light: lightColor, dark: darkColor });

	return <TextRN style={[{ color }, style]} {...rest} />;
}
