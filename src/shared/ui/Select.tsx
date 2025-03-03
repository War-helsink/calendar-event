import {
	View,
	type TextStyle,
	type StyleProp,
	type ViewStyle,
	Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { cn } from "@/src/shared/utils";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";

type ValueSelectItem = string | number;

export interface SelectItem {
	label: string;
	value: ValueSelectItem;
}

export interface SelectProps
	extends Omit<
		React.ComponentProps<typeof Picker>,
		"onValueChange" | "placeholder"
	> {
	items: SelectItem[];
	className?: string;
	containerStyle?: StyleProp<ViewStyle>;
	style?: StyleProp<TextStyle>;
	selectedValue: ValueSelectItem;
	onValueChange: (itemValue: ValueSelectItem, itemIndex: number) => void;
}

export const Select: React.FC<SelectProps> = ({
	items,
	className,
	containerStyle,
	style,
	selectedValue,
	onValueChange,
	...props
}) => {
	const textColor = useThemeColor("text");
	const backgroundColor = useThemeColor("inputBackground");

	return (
		<View className={cn("w-full", className)} style={containerStyle}>
			<View
				className={cn("rounded-xl", Platform.OS === "android" && "px-2")}
				style={{
					backgroundColor,
				}}
			>
				<Picker
					mode="dropdown"
					selectedValue={selectedValue}
					onValueChange={onValueChange}
					style={[
						{ color: textColor, backgroundColor },
						Platform.OS === "web" && { padding: 16, borderRadius: 12 },
						style,
					]}
					dropdownIconColor={textColor}
					{...props}
				>
					{items.map((item) => (
						<Picker.Item
							key={item.value}
							label={item.label}
							value={item.value}
							color={textColor}
							style={{ backgroundColor }}
						/>
					))}
				</Picker>
			</View>
		</View>
	);
};
