import BottomSheet, { type BottomSheetProps } from "@gorhom/bottom-sheet";

import { useThemeColor } from "../hooks/useThemeColor";

export interface ThemedBottomSheetProps extends BottomSheetProps {
	ref?: React.RefObject<BottomSheet>;
}

export const ThemedBottomSheet: React.FC<ThemedBottomSheetProps> = (
	props,
	ref,
) => {
	const backgroundColor = useThemeColor("background");
	const indicatorColor = useThemeColor("buttonBackground");

	return (
		<BottomSheet
			ref={ref}
			{...props}
			backgroundStyle={{ backgroundColor }}
			handleIndicatorStyle={{ backgroundColor: indicatorColor }}
		/>
	);
};
