import { SafeAreaView, View, Button, Text, StyleSheet, Image } from "react-native";
import { router, Stack } from "expo-router";
import { useStateMachine } from 'little-state-machine';
import deleteForm from "../form/deleteForm"

export default function SuccessPage({storage, datakey}) {
    const {actions, state} = useStateMachine({deleteForm});

     // Ekstak data pemilih dari state
    const copiedData={...state}

       //Menyimpan data ke MMKV Storage
    storage.set(datakey, JSON.stringify(copiedData));


    const backToHome = () => {
        router.replace('/home');
    }
    const gotoPage4 = () => {
        router.replace('/kota/Page4');
    }

    const deleteState = () => {
        actions.deleteForm({
            initial: 1
        });
    }
    return (
        <SafeAreaView style={styles.safeArea}>
        <Stack.Screen 
        options={{ 
            title:"",
            headerStyle: {
						backgroundColor: "#FFFFFF",
					},
        }}  />
            <View style={styles.container}>
                <Image source={require('../../assets/success.png')}/>
                <Text style={styles.title}>Input Data Sukses !</Text>
                <Button style={styles.button}
                    title="Kembali ke Halaman Depan"
                    color="#FF8400"
                    onPress={backToHome}
                />
                <Button style={styles.button}
                    title="Page 4"
                    color="#FF8400"
                    onPress={gotoPage4}
                />
                <Button style={styles.button}
                    title="Delete State"
                    color="#FF8400"
                    onPress={deleteState}
                />
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6F1E9',
    },
    container: {
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 40,
        marginTop: 40,
    },
    button: {
        marginTop: 40,
        color: 'white',
        height: 60,
        backgroundColor: '#4F200D',
        borderRadius: 10,
  },
    image: {
        width: 100,
        height: 100,
    }
})