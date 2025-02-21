import { Tabs } from "expo-router";
import { useThemeColor } from "@/src/shared/hooks/useThemeColor";
import { AnimateIcon } from "@/src/shared/ui";

const TabLayout: React.FC = () => {
	const tabBarActiveTintColor = useThemeColor("tabIconSelected");

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: tabBarActiveTintColor,
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					tabBarIcon: ({ color, focused }) => (
						<AnimateIcon
							name={focused ? "home" : "home-outline"}
							focused={focused}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="schedule"
				options={{
					title: "Schedule",
					tabBarIcon: ({ color, focused }) => (
						<AnimateIcon
							name={focused ? "calendar" : "calendar-outline"}
							focused={focused}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default TabLayout;
