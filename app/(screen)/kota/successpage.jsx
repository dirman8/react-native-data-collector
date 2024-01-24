import { SafeAreaView, View, Button, Text, StyleSheet, Image } from "react-native";
import SuccessPage from "../../components/manualcount/suceesspage";
import { kotaStorage } from "../../utils/storage";

export default function SuccessPageKota() {
    return (
        <SuccessPage storage={kotaStorage} datakey="kotaStorage"/>
    )
}