import { SafeAreaView, ScrollView, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS } from "../../../constants/theme";

const Home = () => {
	// const getData = async () => {
	// 	try {
	// 		const response = await fetch("https://react-native-data-collector-server-7r4d546wu-dirman8.vercel.app/api/getAll");

	// 		if (!response.ok) {
	// 			throw new Error(`HTTP error! status: ${response.status}`);
	// 		}

	// 		const data = await response.json();
	// 		setGotData(data);
	// 		console.log("gotData :", gotData);
	// 	} catch (error) {
	// 		console.error("error from try fetching in Home page :", error);
	// 	}
	// };

	// useEffect(() => {
	// 	getData();
	// }, []);
	function onChange() {
		return (val) => setSelectedTeam(val);
	}

	const router = useRouter();
	const handleManualPress = () => {
		router.push("/manualcount");
	};
	const handleRealPress = () => {
		router.push("/realcount");
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Stack.Screen
				options={{
					headerTitle: "Aplikasi Rekap Suara Pemilu 2024",
					headerStyle: {
						backgroundColor: "#f4511e",
					},
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>

			<ScrollView>
				<View style={styles.container}>
					<TouchableOpacity
						style={styles.button}
						onPress={handleManualPress}
					>
						<Text style={styles.text}>Manual Count</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.button, styles.secondaryColor]}
						onPress={handleRealPress}
					>
						<Text style={styles.text}>Real Count</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.button, styles.secondaryColor]}
						onPress={() => router.push("/manualcount/Page4")}
					>
						<Text style={styles.text}>Go to Page 4</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: COLORS.primary,
		padding: 10,
		margin: 10,
		borderRadius: 5,
		width: 200,
	},
	text: {
		fontSize: 16,
		fontWeight: "bold",
		color: "white",
		lineHeight: 21,
		letterSpacing: 0.25,
	},
	secondaryColor: {
		backgroundColor: COLORS.secondary,
	},
});
