import { SafeAreaView, ScrollView, View, Button, Text, StyleSheet } from "react-native";
import { kotaStorage } from '../../utils/storage';

export default function ManualCount5() {
    const serializedHasilInput = kotaStorage.getString('hasilKota');
    const getHasilInput = JSON.parse(serializedHasilInput)

    const showgetHasilInput = () => {
        console.log("getHasilInput : ", getHasilInput)
    }
    return (
        <View>
                <Text>Page 5 : Show Storage of MMKV</Text>
                <View style={styles.container}>
                    <Button style={styles.button}
                    title="Kirim"
                    color="#FF8400"
                    onPress={showgetHasilInput}
                    />
                </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 1,
        marginBottom: 20,
        backgroundColor: '#F6F1E9',
        borderColor: 'green',
        borderWidth: 5,
    },
    button: {
        marginTop: 40,
        marginBottom: 40,
        color: 'white',
        height: 40,
        backgroundColor: '#4F200D',
        borderRadius: 4,
  },
})