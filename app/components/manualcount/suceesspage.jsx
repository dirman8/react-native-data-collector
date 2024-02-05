import { SafeAreaView, View, Button, Text, StyleSheet, Image } from "react-native";
import { router, Stack } from "expo-router";
import { useStateMachine } from 'little-state-machine';
import deleteForm from "../form/deleteForm"

export default function SuccessPage({storage, datakey}) {
    const {actions, state} = useStateMachine({deleteForm});

    const backToHome = () => {
        router.replace('/home/pilihTingkat');
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