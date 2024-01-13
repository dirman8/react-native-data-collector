import { SafeAreaView, ScrollView, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS } from "../../constants/theme";

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
	const handlePilpres = () => {
		router.push("/pilpres");
	};
	const handlePusat = () => {
		router.push("/pusat");
	};
	const handleProvinsi = () => {
		router.push("/provinsi");
	};
	const handleKota = () => {
		router.push("/kota");
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Stack.Screen
				options={{
					headerTitle: "Aplikasi Rekap Suara Pemilu 2024",
					headerStyle: {
						backgroundColor: "#f4511e",
					},
				}}
			/>

			<View style={styles.container}>
				<TouchableOpacity
					style={{ ...styles.button, backgroundColor: COLORS.grayPilpres }}
					onPress={handlePilpres}
				>
					<Text style={styles.text}>A. Input Pilpres</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={{ ...styles.button, backgroundColor: COLORS.yellowPusat }}
					onPress={handlePusat}
				>
					<Text style={styles.text}>B. Input DPR-RI Pusat</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={{ ...styles.button, backgroundColor: COLORS.blueProvinsi }}
					onPress={handleProvinsi}
				>
					<Text style={styles.text}>C. Input DPRD Provinsi</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={{ ...styles.button, backgroundColor: COLORS.greenKota }}
					onPress={handleKota}
				>
					<Text style={styles.text}>D. Input DPRD Kota</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		marginTop: 100,
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
