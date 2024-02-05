import { router, Stack} from 'expo-router';
import { useState } from 'react';
import { View, StyleSheet, Text, Button, SafeAreaView, ScrollView } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import updateForm from "../../components/form/updateForm"
import { TextInput } from '../../components/form/TextInput';
import { useNavigation } from '@react-navigation/native';

export default function ManualCount2({tingkat, bgcolor, title}) {
    const {actions, state} = useStateMachine({updateForm});
    const {...methods} = useForm({mode: 'onChange'});

    const initPemilihDis = {
    disterdaftarlaki: 0,
    disterdaftarperempuan: 0,
    totaldisterdaftar: 0,
    dispenggunalaki: 0,
    dispenggunaperempuan: 0,
    totaldispengguna: 0
}

    const [dataPemilih, setDataPemilih] = useState(initPemilihDis);
    const [totalDisTerdaftar, setTotalDisTerdaftar] = useState(0);
    const [totalDisPengguna, setTotalDisPengguna] = useState(0);

    const updateTotalTerdaftar = (text) => {
        const terdaftarLaki = methods.getValues("disterdaftarlaki");
        const terdaftarPerempuan = methods.getValues("disterdaftarperempuan");
        setTotalDisTerdaftar(terdaftarLaki + terdaftarPerempuan);
    }
    const updateTotalPengguna = (text) => {
        const penggunaLaki = methods.getValues("dispenggunalaki");
        const penggunaPerempuan = methods.getValues("dispenggunaperempuan");
        setTotalDisPengguna(penggunaLaki + penggunaPerempuan);
    }

    const onSubmit = (data) => {
        actions.updateForm({
            ...data, 
            totaldisterdaftar: totalDisTerdaftar,
            totaldispengguna: totalDisPengguna,
        });
        router.push(`/${tingkat}/Page2B`);
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
                    <Text style={styles.title}>II. DATA PEMILIH DISABILITAS</Text>
                    <View>  
                        <Text style={styles.title}>1. Jumlah seluruh pemilih disabilitas terdaftar dalam DPT, DPTb dan DPK</Text>
                        <TextInput
                            name="disterdaftarlaki"
                            label="Pemilih disabilitas terdaftar Laki-laki"
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
                            name="disterdaftarperempuan"
                            label="Pemilih disabilitas terdaftar Perempuan"
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
                            <Text style={{marginBottom: 10}}>Total pemilih disabilitas terdaftar dalam DPT, DPTb dan DPK Laki-laki + Perempuan</Text>
                            <Text style={styles.totalText}>{totalDisTerdaftar}</Text>
                        </View>
                    </View>

                    <View>  
                        <Text style={styles.title}>2. Jumlah seluruh pemilih disabilitas yang menggunaka hak pilih</Text>
                        <TextInput
                            name="dispenggunalaki"
                            label="Pemilih disabilitas pengguna Laki-laki"
                            placeholder="000"
                            keyboardType="numeric"
                            color={bgcolor}
                            rules={{
                                required: 'Wajib diisi!',
                                validate: {
                                    isNumber: (value) => !isNaN(value) && Number(value) <= 999,
                                },
                            }}
                            updateInput={updateTotalPengguna}
                        />
                        {methods.formState.errors.dptblaki?.type === "isNumber" ?  
                        <Text style={styles.errorInput}>
                            Input harus angka 
                        </Text>:null
                        } 
                        <TextInput
                            name="dispenggunaperempuan"
                            label="Pemilih disabilitas pengguna Perempuan"
                            placeholder="000"
                            keyboardType="numeric"
                            color={bgcolor}
                            rules={{
                                required: 'Wajib diisi!',
                                validate: {
                                    isNumber: (value) => !isNaN(value) && Number(value) <= 999,
                                },
                            }}
                            updateInput={updateTotalPengguna}
                        />
                        {methods.formState.errors.penggunaperempuan?.type === "isNumber" ?  
                        <Text style={styles.errorInput}>
                            Input harus angka 
                        </Text>:null}
                        <View style={{...styles.totalContainer, backgroundColor: bgcolor}}>
                            <Text style={{marginBottom: 10}}>Total pemilih disabilitas yang menggunaka hak pilih Laki-laki + Perempuan</Text>
                            <Text style={styles.totalText}>{totalDisPengguna}</Text>
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