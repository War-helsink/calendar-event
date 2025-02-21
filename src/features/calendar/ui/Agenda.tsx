import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Agenda as AgendaRN } from "react-native-calendars";

export const Agenda: React.FC = () => {
	const [items, setItems] = useState({});

	const loadItems = (day) => {
        console.log("day loadItems", day);
	};

	const renderItem = (item) => {
		return (
			<TouchableOpacity
				style={{ marginRight: 10, marginTop: 17 }}
			>

            </TouchableOpacity>
		);
	};

	return (
		<View style={{ flex: 1 }}>
			<AgendaRN
				items={items}
				loadItemsForMonth={loadItems}
				selected={"2017-05-16"}
				renderItem={renderItem}
			/>
		</View>
	);
};
