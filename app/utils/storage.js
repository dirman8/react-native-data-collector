import { MMKV } from "react-native-mmkv";

export const pilpresStorage = new MMKV({
	id: "pilpres-storage",
	// path: "../storage",
});
export const pusatStorage = new MMKV({
	id: "pusat-storage",
	// path: "../storage",
});
export const provinsiStorage = new MMKV({
	id: "provinsi-storage",
	// path: "../storage",
});
export const kotaStorage = new MMKV({
	id: "kota-storage",
	// path: "../storage",
});
export const statusStorage = new MMKV({
	id: "status-storage",
	// path: "../storage",
});
