import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "@/global.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/src/provider/store";

import { useColorScheme } from "@/src/shared/hooks/useColorScheme";
import { Toast } from "@/src/shared/ui";

SplashScreen.preventAutoHideAsync();

const RootLayout: React.FC = () => {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Stack>
						<Stack.Screen name="index" options={{ headerShown: false }} />
						<Stack.Screen
							name="event-form"
							options={{
								presentation: "modal",
								headerShown: false,
							}}
						/>
						<Stack.Screen name="+not-found" />
					</Stack>
					<StatusBar style="auto" />
					<Toast />
				</PersistGate>
			</Provider>
		</ThemeProvider>
	);
};

export default RootLayout;
