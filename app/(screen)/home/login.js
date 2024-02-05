import { View, Text, StyleSheet, SafeAreaView, TextInput, Button, Alert } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import updateForm from "../../components/form/updateForm";
import { useStateMachine } from "little-state-machine";
import { dapilStorage } from "../../utils/storage";
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

			if (password === data.password) {
				console.log("Successfull Login, dapil :", data.dapil);
				router.push("/home");
			}
		} catch (error) {
			Alert.alert("Login Failed", error.response.data.message);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
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
			<Button
				title="Login"
				style={styles.button}
				onPress={() => onLogin()}
			/>
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
	button: {},
});
