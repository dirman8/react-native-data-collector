import { Stack } from "expo-router";
import { StateMachineProvider, createStore } from "little-state-machine";
import { AuthProvider } from "./context/AuthContext";
import { AxiosProvider } from "./context/AxiosContext";

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
				<Stack.Screen name="index" />
			</Stack>
		</StateMachineProvider>
	);
};

export default AppLayout;
