import { cn } from "@/src/shared/utils";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";

export interface SelectProps
	extends Omit<
			React.ComponentProps<typeof Dropdown>,
			"labelField" | "valueField"
		>,
		Partial<
			Pick<React.ComponentProps<typeof Dropdown>, "labelField" | "valueField">
		> {
	className?: string;
}

export const Select: React.FC<SelectProps> = ({
	labelField = "label",
	valueField = "value",
	className,
	style,
	containerStyle,
	...props
}) => {
	const color = useThemeColor("text");
	const backgroundColor = useThemeColor("inputBackground");
	const backgroundActiveColor = useThemeColor("inputActiveBackground");
	const backgroundPlaceholderColor = useThemeColor("inputPlaceholderColor");

	return (
		<View className={cn("w-full", className)}>
			<Dropdown
				{...props}
				labelField={labelField}
				valueField={valueField}
				selectedTextStyle={{
					color,
				}}
				itemContainerStyle={{
					borderRadius: 12,
				}}
				itemTextStyle={{
					color,
				}}
				activeColor={backgroundActiveColor}
				style={[
					{
						borderRadius: 12,
						padding: 16,
						backgroundColor,
					},
					style,
				]}
				placeholderStyle={{
					color: backgroundPlaceholderColor,
				}}
				containerStyle={[
					{
						backgroundColor,
						borderWidth: 0,
						borderRadius: 12,
					},
					containerStyle,
				]}
			/>
		</View>
	);
};
