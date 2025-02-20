import { Tabs } from "expo-router";
import React from "react";

import { useThemeColor } from "@/components/shared/hooks/useThemeColor";
import { AnimateIcon } from "@/components/shared/ui";

export default function TabLayout() {
	const tabBarActiveTintColor = useThemeColor("tint");

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
		</Tabs>
	);
}
