import { useState } from 'react';
import { router, Stack } from 'expo-router';
import { View, Text, SafeAreaView, StyleSheet, Button,  Image} from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { TextInput } from '../../components/form/TextInput';
import { capres } from '../../constants/capres';
import {COLORS} from "../../constants/theme";
import { pilpresStorage} from '../../utils/storage';
import { useNavigation } from '@react-navigation/native';
import { totalStorage } from '../../utils/storage';

export default function ManualCountPilpres3() {
    const {...methods} = useForm({mode: 'onChange'});
    const [totalSuaraCapres, setTotalSuaraCapres] = useState({capres1:0, capres2:0, capres3:0});
    const [jumlahSuaraSah, setJumlahSuaraSah] = useState(0);

    // Prepare readySuaraCapres
    const convertToObject = () => {
		const keysArray = Object.keys(capres).filter((key) => !isNaN(key));
		return keysArray.map((key) => ({ id: `capres${key}`, label: capres[key] }));
	};
    const readyCapres = convertToObject();

    const updateSuaraCapres = (text, name) => {
        setTotalSuaraCapres((prevState) => ({
        ...prevState,
        [name]: text,
        }));
    };
    // Convert totalSuaraCapres object to array
    const totalSuaraCapresArray = Object.entries(totalSuaraCapres).map(([key, value]) => ({
        name: key,
        value: value
    }));
 
    const onSubmit = (data) => {
        const sum = totalSuaraCapresArray.reduce((acc, currentValue) => acc + currentValue.value, 0);
        totalStorage.set("total", JSON.stringify({total: sum}));
        pilpresStorage.set("hasilInputPage3", JSON.stringify(data));
        router.replace('/pilpres/Page4');
    }

    const onError = (errors) => {
        console.log('errors',errors);
    }

    const navigation = useNavigation();

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
                            updateInput={updateSuaraCapres}
                        />
                    </View>
                ))}
            </View>

            <View style={styles.container}>
                <Button style={styles.button}
                title="Next"
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
        color: '#4F200D',
        fontSize: 20, 
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
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