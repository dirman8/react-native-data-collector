import { Stack } from "expo-router/stack";
import { StateMachineProvider, createStore } from "little-state-machine";
import HomeScreen from "./HomeScreen";

createStore({});

const Layout = () => {
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

export default Layout;
