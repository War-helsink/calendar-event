import ToastMessage, {
	BaseToast,
	type ToastConfig,
} from "react-native-toast-message";
import { useThemeColor } from "../hooks/useThemeColor";

export const Toast: React.FC = () => {
	const colorSuccess = useThemeColor("toastSuccess");
	const colorError = useThemeColor("toastError");
	const colorInfo = useThemeColor("toastInfo");
	const color = useThemeColor("toastText");

	const toastConfig: ToastConfig = {
		success: (internalState) => (
			<BaseToast
				{...internalState}
				style={{ borderLeftColor: colorSuccess, backgroundColor: colorSuccess }}
				text1Style={{ color: color }}
				text2Style={{ color: color }}
			/>
		),
		error: (internalState) => (
			<BaseToast
				{...internalState}
				style={{ borderLeftColor: colorError, backgroundColor: colorError }}
				text1Style={{ color: color }}
				text2Style={{ color: color }}
			/>
		),
		info: (internalState) => (
			<BaseToast
				{...internalState}
				style={{ borderLeftColor: colorInfo, backgroundColor: colorInfo }}
				text1Style={{ color: color }}
				text2Style={{ color: color }}
			/>
		),
	};

	return <ToastMessage config={toastConfig} />;
};
