import { useCallback, useContext, useState, useEffect } from "react";
import { Redirect } from "expo-router";
import { AuthContext } from "./context/AuthContext";

export default function Index() {
	return <Redirect href="/home/login" />;
	// const authContext = useContext(AuthContext);
	// const [status, setStatus] = useState("loading");

	// const loadJWT = useCallback(async () => {
	// 	try {
	// 		const value = await Keychain.getGenericPassword();
	// 		const jwt = JSON.parse(value.password);

	// 		authContext.setAuthState({
	// 			accessToken: jwt.accessToken || null,
	// 			refreshToken: jwt.refreshToken || null,
	// 			authenticated: jwt.accessToken !== null,
	// 		});
	// 		setStatus("success");
	// 	} catch (error) {
	// 		setStatus("error");
	// 		console.log(`Keychain Error: ${error.message}`);
	// 		authContext.setAuthState({
	// 			accessToken: null,
	// 			refreshToken: null,
	// 			authenticated: false,
	// 		});
	// 	}
	// });

	// useEffect(() => {
	// 	loadJWT();
	// }, [loadJWT]);

	// if (authContext?.authState?.authenticated === false) {
	// 	return <Redirect href="/home/login" />;
	// } else {
	// 	return <Redirect href="/home" />;
	// }
}
