import { View, Text, SafeAreaView, StyleSheet, Button } from 'react-native';
import { useStateMachine } from 'little-state-machine';
import updateForm from "../../../components/form/updateForm";

export default function ManualCount2() {
    const {actions, state} = useStateMachine({updateForm});

    const handleSubmit = () => {
        console.log("state akhir identitas tps from Page2 :", state);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <Text>Page Manual Count</Text>
            </View>
            <View style={styles.button}>
                <Button
                    title="Kirim"
                    color="#FF8400"
                    onPress={handleSubmit}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 40,
        color: 'white',
        height: 40,
        backgroundColor: '#4F200D',
        borderRadius: 4,
  },
})