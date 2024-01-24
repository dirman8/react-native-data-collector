import { Stack } from "expo-router";
import { StateMachineProvider, createStore } from "little-state-machine";

createStore({});

const AppLayout = () => {
	return (
		<StateMachineProvider>
			<Stack
				screenOptions={{
					headerStyle: {
						backgroundColor: "#f4511e",
					},
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			>
				<Stack.Screen name="home" />
			</Stack>
		</StateMachineProvider>
	);
};

export default AppLayout;
