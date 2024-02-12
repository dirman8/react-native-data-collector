import { TouchableOpacity, View, Text, StyleSheet, SafeAreaView, TextInput, Button, Alert } from "react-native";
import { useState } from "react";
import { router, Stack } from "expo-router";
import updateForm from "../../components/form/updateForm";
import { useStateMachine } from "little-state-machine";
import { dapilStorage, statusStorage } from "../../utils/storage";

export default function Login() {
	const { actions, state } = useStateMachine({ updateForm });
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const onLogin = async () => {
		try {
			const response = await fetch("https://data-collector-server-073fb68b758e.herokuapp.com/api/user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username: username }),
			});
			const data = await response.json();

			// Update Dapil Storage
			dapilStorage.set("dapil", JSON.stringify({ username: data.username, dapil: data.dapil }));
			statusStorage.clearAll();

			if (password === data.password) {
				router.replace("/home");
			}
		} catch (error) {
			Alert.alert("Login Failed", error.response.data.message);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<Stack.Screen
				options={{
					title: "",
					headerShown: false, // Hide the header for this screen
				}}
			/>
			<Text style={styles.logo}>Log In</Text>
			<View style={styles.form}>
				<TextInput
					style={styles.input}
					placeholder="Username"
					placeholderTextColor="#fefefe"
					autoCapitalize="none"
					onChangeText={(text) => setUsername(text)}
					value={username}
				/>

				<TextInput
					style={styles.input}
					placeholder="Password"
					placeholderTextColor="#fefefe"
					secureTextEntry
					onChangeText={(text) => setPassword(text)}
					value={password}
				/>
			</View>
			<TouchableOpacity
				style={[styles.button]}
				onPress={onLogin}
			>
				<Text style={styles.buttonText}>Login</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
		alignItems: "center",
		justifyContent: "flex-start",
		width: "100%",
	},
	logo: {
		fontSize: 60,
		color: "#fff",
		margin: "20%",
	},
	form: {
		width: "80%",
		margin: "10%",
	},
	input: {
		fontSize: 20,
		color: "#fff",
		paddingBottom: 10,
		borderBottomColor: "#fff",
		borderBottomWidth: 1,
		marginVertical: 20,
	},
	button: {
		alignItems: "center",
		backgroundColor: "#2196f3",
		justifyContent: "center",
		padding: 10,
		margin: 10,
		borderRadius: 5,
		width: 200,
		height: 40,
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
	},
});
