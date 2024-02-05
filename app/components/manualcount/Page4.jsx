import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { router, Stack} from 'expo-router';
import { useForm, FormProvider } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import { TextInput } from '../form/TextInput';
import { pilpresStorage, pusatStorage, provinsiStorage, kotaStorage, statusStorage, tpsStorage } from '../../utils/storage';
import deleteForm from "../../components/form/deleteForm";
import StoreData2 from '../../utils/storeData2';
import StoreData3 from '../../utils/storeData3';
import SendToDb from '../../utils/sendToDb';

export default function ManualCount4({parties, tingkat, bgcolor, title}) {
    const {actions, state} = useStateMachine({deleteForm});
    const {...methods} = useForm({mode: 'onChange'});

    const initSuratSuara = {
    sssah: 0,
    sstidaksah: 0,
    totalss: 0,
}

    const [dataPemilih, setDataPemilih] = useState(initSuratSuara);
    const [totalSs, setTotalSs] = useState(0);
    const [identitasTpsForStorage, setIdentitasTpsForStorage] = useState({kecamatan: "", kelurahan: "", nomortps: ""})
    
    const updateTotalSs = (text) => {
        const sssah = methods.getValues("sssah");
        const sstidaksah = methods.getValues("sstidaksah");
        const totalss = sssah + sstidaksah;
        setTotalSs(totalss);
    }

    const {kecamatan, kelurahan, nomortps} = state;
    const identitasTps = {kecamatan:kecamatan, kelurahan:kelurahan, nomortps:nomortps}
    
    const onSubmit = (data) => {
        const fullState = {...state, ...data, totalss: totalSs};
        console.log("fullState :", fullState);
        console.log("identitasTps :", identitasTps);
           tpsStorage.set("identitasTps", JSON.stringify(identitasTps));
        if (tingkat === 'kota') {
            // SendToDb(fullState);
            const dataGabungan = StoreData2(fullState, parties)
            kotaStorage.set("hasilKota", JSON.stringify(dataGabungan));
            statusStorage.set('statuskota', true);
            actions.deleteForm({ initial: 1 });
        } else if (tingkat === 'provinsi') {
            const dataGabungan = StoreData2(fullState, parties)
            provinsiStorage.set("hasilProvinsi", JSON.stringify(dataGabungan));
            statusStorage.set('statusprovinsi', true);
            actions.deleteForm({ initial: 1 });
        } else if (tingkat === 'pusat') {
            const dataGabungan = StoreData2(fullState, parties)
            pusatStorage.set("hasilPusat", JSON.stringify(dataGabungan));
            statusStorage.set('statuspusat', true);
            actions.deleteForm({ initial: 1 });
        } else if (tingkat === 'pilpres') {
            const dataGabungan = StoreData3(fullState, parties)
            pilpresStorage.set("hasilPilpres", JSON.stringify(dataGabungan));
            statusStorage.set('statuspilpres', true);
            actions.deleteForm({ initial: 1 });
        } 
        router.push(`/${tingkat}/successpage`);
    }

    const onError = (errors) => {
        console.log('errors',errors);
    }

    const navigation = useNavigation();

    useEffect(() => {
        setIdentitasTpsForStorage(identitasTps);
    }, [])
    

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
                        <Text style={styles.title}>V. DATA SUARA SAH DAN TIDAK SAH</Text>
                        <TextInput
                            name="sssah"
                            label="A. JUMLAH SELURUH SUARA SAH"
                            placeholder="000"
                            keyboardType="numeric"
                            color={bgcolor}
                            rules={{
                                required: 'Wajib diisi!',
                                validate: {
                                    isNumber: (value) => !isNaN(value) && Number(value) <= 999,
                                },
                            }}
                            updateInput={updateTotalSs}
                        />
                        {methods.formState.errors.dptlaki?.type === "isNumber" ?  
                        <Text style={styles.errorInput}>Input harus angka </Text> : null
                        }
                        
                        <TextInput
                            name="sstidaksah"
                            label="B. JUMLAH SUARA TIDAK SAH"
                            placeholder="000"
                            keyboardType="numeric"
                            color={bgcolor}
                            rules={{
                                required: 'Wajib diisi!',
                                validate: {
                                    isNumber: (value) => !isNaN(value) && Number(value) <= 999,
                                },
                            }}
                            updateInput={updateTotalSs}
                        />
                        {methods.formState.errors.terdaftarperempuan?.type === "isNumber" ?  
                        <Text style={styles.errorInput}>
                            Input harus angka 
                        </Text>:null
                        } 
                        <View style={{...styles.totalContainer, backgroundColor: bgcolor}}>
                            <Text style={{marginBottom: 10}}>C. JUMLAH SELURUH SUARA SAH DAN TIDAK SAH</Text>
                            <Text style={styles.totalText}>{totalSs}</Text>
                        </View>
                    </View>
                </FormProvider>
            </View>

            <View style={styles.button}>
                <Button
                    title="Next"
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