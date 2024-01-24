import { SafeAreaView, Image, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { router, Stack } from "expo-router";
import { COLORS } from "../../constants/theme";
import { statusStorage } from "../../utils/storage";

const Home = () => {
	//Get Status Pengiriman tiap Tingkat
	statusStorage.set("init", true);
	const statusKota = statusStorage.getBoolean("statuskota");
	const statusProvinsi = statusStorage.getBoolean("statusprovinsi");
	const statusPusat = statusStorage.getBoolean("statuspusat");
	const statusPilpres = statusStorage.getBoolean("statuspilpres");

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
	const gotoExcel = () => {
		router.push("/excel");
	};
	const hapusStorage = () => {
		statusStorage.clearAll();
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Stack.Screen options={{ title: "Aplikasi Manual Count - PKS Surabaya" }} />
			<View style={styles.container}>
				<View style={styles.rowContainer}>
					<TouchableOpacity
						style={{ ...styles.button, backgroundColor: "#464646" }}
						onPress={handlePilpres}
					>
						<Text style={styles.text}>A. Input Pilpres</Text>
					</TouchableOpacity>
					{statusPilpres ? <Image source={require("../../assets/delivered.png")} /> : null}
				</View>

				<View style={styles.rowContainer}>
					<TouchableOpacity
						style={{ ...styles.button, backgroundColor: "#FFD500" }}
						onPress={handlePusat}
					>
						<Text style={styles.text}>B. Input DPR-RI Pusat</Text>
					</TouchableOpacity>
					{statusPusat ? <Image source={require("../../assets/delivered.png")} /> : null}
				</View>

				<View style={styles.rowContainer}>
					<TouchableOpacity
						style={{ ...styles.button, backgroundColor: "#0175C0" }}
						onPress={handleProvinsi}
					>
						<Text style={styles.text}>C. Input DPRD Provinsi</Text>
					</TouchableOpacity>
					{statusProvinsi ? <Image source={require("../../assets/delivered.png")} /> : null}
				</View>

				<View style={styles.rowContainer}>
					<TouchableOpacity
						style={{ ...styles.button, backgroundColor: "#01A836" }}
						onPress={handleKota}
					>
						<Text style={styles.text}>D. Input DPRD Kota</Text>
					</TouchableOpacity>
					{statusKota ? <Image source={require("../../assets/delivered.png")} /> : null}
				</View>

				<View style={{ marginTop: 40 }}>
					<TouchableOpacity
						style={{ ...styles.button, backgroundColor: "#1d6c41" }}
						onPress={gotoExcel}
					>
						<Text style={styles.text}>Kirim File Excel</Text>
					</TouchableOpacity>
				</View>
				<View style={{ marginTop: 40 }}>
					<TouchableOpacity
						style={{ ...styles.button, backgroundColor: "#1d6c41" }}
						onPress={hapusStorage}
					>
						<Text style={styles.text}>Hapus Storage</Text>
					</TouchableOpacity>
				</View>
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
	rowContainer: {
		padding: 8,
		height: 55, //height for Page 3 = 25
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
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
