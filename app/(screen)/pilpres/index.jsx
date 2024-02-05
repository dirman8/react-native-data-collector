import IdentitasTps from "../../components/manualcount/identitasTps";
import {COLORS} from "../../constants/theme";
import { SafeAreaView, Image, View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default function IdentitasTpsPilpres() {
    return (
        <IdentitasTps tingkat="pilpres" bgcolor={COLORS.grayPilpres} title="Input Pilpres" />
    );
}