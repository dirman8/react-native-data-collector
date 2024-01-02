import { StyleSheet } from "react-native";
import colors from "./colors";

export const formStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		paddingTop: 8,
		padding: 8,
		backgroundColor: "#ffffff",
	},
	title: {
		color: colors.dimGray,
		margin: 20,
		marginLeft: "auto",
		marginRight: "auto",
		fontSize: 20,
	},
	label: {
		color: colors.dimGray,
		margin: 10,
		marginLeft: 0,
	},
	button: {
		marginTop: 40,
		color: "black",
		height: 40,
		backgroundColor: "#ec5990",
		borderRadius: 4,
	},
	input: {
		backgroundColor: colors.white,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: colors.silver,
		height: 40,
		padding: 10,
		borderRadius: 10,
	},
});
