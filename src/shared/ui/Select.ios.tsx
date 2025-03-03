import { useState } from "react";
import {
	Modal,
	TouchableOpacity,
	View,
	Text,
	type TextStyle,
	type StyleProp,
	type ViewStyle,
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
	extends Omit<React.ComponentProps<typeof Picker>, "onValueChange"> {
	items: SelectItem[];
	className?: string;
	containerStyle?: StyleProp<ViewStyle>;
	style?: StyleProp<TextStyle>;
	placeholder?: string;
	selectedValue: ValueSelectItem;
	onValueChange: (itemValue: ValueSelectItem, itemIndex: number) => void;
}

export const Select: React.FC<SelectProps> = ({
	items,
	className,
	containerStyle,
	style,
	placeholder,
	selectedValue,
	onValueChange,
	...props
}) => {
	const textColor = useThemeColor("text");
	const backgroundColor = useThemeColor("inputBackground");
	const placeholderColor = useThemeColor("inputPlaceholderColor");

	const [isModalVisible, setModalVisible] = useState(false);

	const selectedLabel = items.find(
		(item) => item.value === selectedValue,
	)?.label;

	const openModal = () => setModalVisible(true);
	const closeModal = () => setModalVisible(false);

	return (
		<>
			<TouchableOpacity
				onPress={openModal}
				className={cn("w-full", className)}
				style={[
					{ backgroundColor, padding: 16, borderRadius: 12 },
					containerStyle,
				]}
			>
				<Text
					style={[
						{ color: selectedLabel ? textColor : placeholderColor },
						style,
					]}
				>
					{selectedLabel || placeholder || "Select..."}
				</Text>
			</TouchableOpacity>

			<Modal
				visible={isModalVisible}
				transparent
				animationType="fade"
				onRequestClose={closeModal}
			>
				<TouchableOpacity
					activeOpacity={1}
					className="flex-1 justify-end"
					style={{
						backgroundColor: "rgba(0, 0, 0, 0.5)",
					}}
					onPress={closeModal}
				>
					<View
						style={{
							backgroundColor,
							padding: 16,
							borderTopLeftRadius: 12,
							borderTopRightRadius: 12,
						}}
					>
						<Picker
							selectedValue={selectedValue}
							onValueChange={(itemValue, itemIndex) => {
								onValueChange(itemValue, itemIndex);
							}}
							style={[{ color: textColor }, style]}
							{...props}
						>
							{placeholder && (
								<Picker.Item
									label={placeholder}
									value={null}
									color={placeholderColor}
								/>
							)}
							{items.map((item) => (
								<Picker.Item
									key={item.value}
									label={item.label}
									value={item.value}
									color={textColor}
								/>
							))}
						</Picker>
					</View>
				</TouchableOpacity>
			</Modal>
		</>
	);
};
