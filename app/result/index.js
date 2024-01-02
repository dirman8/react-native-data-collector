import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import Result from "../../components/form/result";
import ClearForm from "../../components/form/clearForm";

export default function Index() {
	console.log("From Root's Result");
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView>
				<Result />
				{/* <ClearForm /> */}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 8,
		backgroundColor: "#0e101c",
		borderColor: "white",
		borderWidth: 1,
	},
});
