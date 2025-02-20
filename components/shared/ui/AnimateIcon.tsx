import Ionicons from "@expo/vector-icons/Ionicons";
import type { IconProps } from "@expo/vector-icons/build/createIconSet";
import type { ComponentProps } from "react";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	withRepeat,
	withSequence,
} from "react-native-reanimated";

import { useEffect } from "react";

export interface AnimateIconIconProps
	extends IconProps<ComponentProps<typeof Ionicons>["name"]> {
	focused?: boolean;
}

export const AnimateIcon: React.FC<AnimateIconIconProps> = ({
	style,
	focused,
	...rest
}) => {
	const rotationAnimation = useSharedValue(0);

	useEffect(() => {
		if (focused) {
			rotationAnimation.value = withRepeat(
				withSequence(
					withTiming(1.2, { duration: 200 }),
					withTiming(1, { duration: 200 }),
				),
				2,
				false,
			);
		} else {
			rotationAnimation.value = 1;
		}
	}, [focused, rotationAnimation]);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: rotationAnimation.value }],
	}));

	return (
		<Animated.View style={focused && animatedStyle}>
			<Ionicons size={24} style={[{ marginBottom: -3 }, style]} {...rest} />
		</Animated.View>
	);
};
