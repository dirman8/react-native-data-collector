import { router, Stack} from 'expo-router';
import { useState } from 'react';
import { View, StyleSheet, Text, Button, SafeAreaView, ScrollView } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import updateForm from "../../components/form/updateForm"
import { TextInput } from '../../components/form/TextInput';
import { useNavigation } from '@react-navigation/native';

export default function ManualCount2B({tingkat, bgcolor, title}) {
    const {actions, state} = useStateMachine({updateForm});
    const {...methods} = useForm({mode: 'onChange'});

    const initSuratSuara = {
    ssterima: 0,
    sskembali: 0,
    sstidakpakai: 0,
    sspakai: 0,
}

    const [dataPemilih, setDataPemilih] = useState(initSuratSuara);
    const [ssPakai, setSsPakai] = useState(0);
    
    const updateTotalTerdaftar = (text) => {
        const ssterima = methods.getValues("ssterima");
        const sskembali = methods.getValues("sskembali");
        const sstidakpakai = methods.getValues("sstidakpakai");
        const sspakai = ssterima - sskembali - sstidakpakai;
        setSsPakai(ssterima - sskembali - sstidakpakai);
    }
    const onSubmit = (data) => {
        actions.updateForm({
            ...data, 
            sspakai: ssPakai,
        });
        console.log("State from Page 2B: ", state);
        router.push(`/${tingkat}/Page3`);
    }

    const onError = (errors) => {
        console.log('errors',errors);
    }

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen 
                options={{ 
                    title:title,
                    headerStyle: {
                                backgroundColor: bgcolor,
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
            <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
            <View>
                <FormProvider {...methods} >
                    <View>  
                        <Text style={styles.title}>III. DATA PENGGUNAAN SURAT SUARA</Text>
                        <TextInput
                            name="ssterima"
                            label="1. Surat Suara Diterima"
                            placeholder="000"
                            keyboardType="numeric"
                            color={bgcolor}
                            rules={{
                                required: 'Wajib diisi!',
                                validate: {
                                    isNumber: (value) => !isNaN(value) && Number(value) <= 999,
                                },
                            }}
                            updateInput={updateTotalTerdaftar}
                        />
                        {methods.formState.errors.dptlaki?.type === "isNumber" ?  
                        <Text style={styles.errorInput}>Input harus angka </Text> : null
                        }
                        
                        <TextInput
                            name="sskembali"
                            label="2. Surat Suara Dikembalikan"
                            placeholder="000"
                            keyboardType="numeric"
                            color={bgcolor}
                            rules={{
                                required: 'Wajib diisi!',
                                validate: {
                                    isNumber: (value) => !isNaN(value) && Number(value) <= 999,
                                },
                            }}
                            updateInput={updateTotalTerdaftar}
                        />

                        <TextInput
                            name="sstidakpakai"
                            label="3. Surat Suara Tidak Terpakai"
                            placeholder="000"
                            keyboardType="numeric"
                            color={bgcolor}
                            rules={{
                                required: 'Wajib diisi!',
                                validate: {
                                    isNumber: (value) => !isNaN(value) && Number(value) <= 999,
                                },
                            }}
                            updateInput={updateTotalTerdaftar}
                        />
                        {methods.formState.errors.terdaftarperempuan?.type === "isNumber" ?  
                        <Text style={styles.errorInput}>
                            Input harus angka 
                        </Text>:null
                        } 
                        <View style={{...styles.totalContainer, backgroundColor: bgcolor}}>
                            <Text style={{marginBottom: 10}}>4. Jumlah Surat Suara yang digunakan</Text>
                            <Text style={styles.totalText}>{ssPakai}</Text>
                        </View>
                    </View>
                </FormProvider>
            </View>

            <View style={styles.button}>
                <Button
                    title="Kirim"
                    color="#FF8400"
                    onPress={methods.handleSubmit(onSubmit, onError)}
                />
            </View>
        </View>
        </ScrollView>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        padding: 12,
        marginBottom: 40,
        backgroundColor: '#F6F1E9',
        borderColor: 'white',
        borderWidth: 1,
    },
    totalContainer: {
        height: 100,
        justifyContent: 'center',
        padding: 8,
        backgroundColor: '#FFD93D',
        borderColor: 'white',
        borderWidth: 1,
    },
    rowContainer: {
        padding:8,
        height: 55, //height for Page 3 = 25
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: 'white',
        borderWidth: 1,
  },
      title: {
        color: '#4F200D',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10
    },
    totalText: {
        padding: 8,
        borderRadius: 4,
        backgroundColor: 'white',
        color: '#4F200D',
        fontSize: 15,
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