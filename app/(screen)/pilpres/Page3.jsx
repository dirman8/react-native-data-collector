import { useState } from 'react';
import { router, Stack } from 'expo-router';
import { View, Text, SafeAreaView, StyleSheet, Button,  Image} from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import { pilpresStorage, statusStorage } from '../../utils/storage';
import updateForm from "../../components/form/updateForm"
import { TextInput } from '../../components/form/TextInput';
import { capres } from '../../constants/capres';
import {COLORS} from "../../constants/theme";

export default function ManualCountPilpres3() {
    const {actions, state} = useStateMachine({updateForm});
    const {...methods} = useForm({mode: 'onChange'});
    const [totalSuaraCapres, setTotalSuaraCapres] = useState();

    const convertToObject = () => {
		const keysArray = Object.keys(capres).filter((key) => !isNaN(key));
		return keysArray.map((key) => ({ id: `capres${key}`, label: capres[key] }));
	};
    const readyCapres = convertToObject();
 
    const onSubmit = (data) => {
        pilpresStorage.set("hasilPilpres", JSON.stringify({...state,...data}));
        statusStorage.set('statuspilpres', true);
        console.log("data from Page 3: ", data)
        actions.updateForm({
            ...state,
            ...data,
        });
        console.log("State from Page 3: ", state);
        router.replace('/pilpres/successpage');
    }

    const onError = (errors) => {
        console.log('errors',errors);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen 
                options={{ 
                    title:"Input Pilpres",
                    headerStyle: {
                                backgroundColor: COLORS.grayPilpres,
                    },
                    headerLeft: () => {
						return (
							<Button
								title="Back"
								onPress={() => navigation.goBack()}
							/>
						);
            },
                }}  
        />
            <View styles={styles.container}>
                <Text style={styles.title}>Input Hasil Suara Calon Presiden</Text>
            </View>
            <FormProvider {...methods} >
            <View style={styles.container}>
                {readyCapres.map((capres, index) => (
                    <View key={index} style={styles.capresContainer}>
                        <TextInput
                            name={capres.id}
                            label={capres.label}
                            placeholder='0'
                            keyboardType='numeric'
                            rules={{ validate: { isNumber: (value) => !isNaN(value) && Number(value) <= 999, }, }}
                            color={COLORS.grayPilpres}
                            height={60}
                        />
                    </View>
                ))}
            </View>

            <View style={styles.container}>
                <Button style={styles.button}
                title="Kirim"
                color="#FF8400"
                onPress={methods.handleSubmit(onSubmit, onError)}
                />
            </View>

            </FormProvider>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 1,
        marginBottom: 20,
        backgroundColor: '#E0E0E0',
    },
    capresContainer: {
        marginBottom: 20,
    },
    title: {
        flex: 1,
        color: 'black',
        fontSize: 20, 
        fontWeight: 'bold',
        textAlign: 'center',
  },
    button: {
        marginTop: 40,
        marginBottom: 40,
        color: 'white',
        height: 40,
        backgroundColor: '#4F200D',
        borderRadius: 4,
  },
    image: {
        width: 30,
        height: 43,
        alignSelf: 'center',
    }
})