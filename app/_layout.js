import { Stack } from "expo-router/stack";
import { StateMachineProvider, createStore } from "little-state-machine";

createStore({});

const Layout = () => {
	return (
		<StateMachineProvider>
			<Stack initialRouteName="home">
				<Stack.Screen name="home" />
			</Stack>
		</StateMachineProvider>
	);
};

export default Layout;
