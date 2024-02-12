import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { View, StyleSheet, Text, Button, SafeAreaView, ScrollView } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { TextInput } from '../../components/form/TextInput';
import { useNavigation } from '@react-navigation/native';
import { kotaStorage, provinsiStorage, pusatStorage, pilpresStorage, tpsStorage, statusStorage } from '../../utils/storage';



export default function ManualCount1B({tingkat, storage, bgcolor, title}) {

    const {...methods} = useForm({mode: 'onChange'});

    const initDataPemilih = {
    phpdptlaki: 0,
    phpdptperempuan: 0,
    totalphpdpt: 0,
    phpdptblaki: 0,
    phpdptbperempuan: 0,
    totalphpdptb: 0,
    phpdpklaki: 0,
    phpdpkperempuan: 0,
    totalphpdpk: 0,
    totalphplaki: 0,
    totalphpperempuan: 0,
    totalphp: 0
    }

    const [dataPemilih, setDataPemilih] = useState(initDataPemilih);

    const [phpDptLaki, setPhpDptLaki] = useState(0);
    const [phpDptPerempuan, setPhpDptPerempuan] = useState(0);
    const [totalPhpDpt, setTotalPhpDpt] = useState(0);

    const [phpDptbLaki, setPhpDptbLaki] = useState(0);
    const [phpDptbPerempuan, setPhpDptbPerempuan] = useState(0);
    const [totalPhpDptb, setTotalPhpDptb] = useState(0);

    const [phpDpkLaki, setPhpDpkLaki] = useState(0);
    const [phpDpkPerempuan, setPhpDpkPerempuan] = useState(0);
    const [totalPhpDpk, setTotalPhpDpk] = useState(0);

    const totalPhpLaki = phpDptLaki + phpDptbLaki + phpDpkLaki;
    const totalPhpPerempuan = phpDptPerempuan + phpDptbPerempuan + phpDpkPerempuan;
    const totalPhp = totalPhpLaki + totalPhpPerempuan;

    const updateTotalDpt = (text) => {
        const phpdptlaki = methods.getValues("phpdptlaki");
        const phpdptperempuan = methods.getValues("phpdptperempuan");
        setPhpDptLaki(phpdptlaki);
        setPhpDptPerempuan(phpdptperempuan);
        setTotalPhpDpt(phpdptlaki + phpdptperempuan);
    }
    const updateTotalDptb = (text) => {
        const phpdptblaki = methods.getValues("phpdptblaki");
        const phpdptbperempuan = methods.getValues("phpdptbperempuan");
        setPhpDptbLaki(phpdptblaki);
        setPhpDptbPerempuan(phpdptbperempuan);
        setTotalPhpDptb(phpdptblaki + phpdptbperempuan);
    }

     const updateTotalDpk = (text) => {
        const phpdpklaki = methods.getValues("phpdpklaki");
        const phpdpkperempuan = methods.getValues("phpdpkperempuan");
        setPhpDpkLaki(phpdpklaki);
        setPhpDpkPerempuan(phpdpkperempuan);
        setTotalPhpDpk(phpdpklaki + phpdpkperempuan);
    }

    const onSubmit = (data) => {
        const dataGabungan = {
            ...data, 
            totalphpdpt: totalPhpDpt,
            totalphpdptb: totalPhpDptb,
            totalphpdpk: totalPhpDpk,
            totalphplaki: totalPhpLaki,
            totalphpperempuan: totalPhpPerempuan,
            totalphp: totalPhp
        };
        storage.set("hasilInputPage1B", JSON.stringify(dataGabungan));
        router.push(`/${tingkat}/Page2`)
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
                        <Text style={styles.title}>B. PENGGUNA HAK PILIH</Text>
                        <View>  
                            <Text style={styles.title}>1. Jumlah pengguna hak pilih dalam DPT</Text>
                            <TextInput
                                name="phpdptlaki"
                                label="DPT Laki-laki"
                                placeholder="000"
                                keyboardType="numeric"
                                color={bgcolor}
                                rules={{
                                    required: 'Wajib diisi!',
                                    validate: { isNumber: (value) => !isNaN(value) && Number(value) <= 999}
                                }}
                                updateInput={updateTotalDpt}
                            />
                            {methods.formState.errors.phpdptlaki?.type === "isNumber" ?  
                            <Text style={styles.errorInput}> Input harus angka </Text>:null} 
                            <TextInput
                                name="phpdptperempuan"
                                label="DPT Perempuan"
                                placeholder="000"
                                keyboardType="numeric"
                                color={bgcolor}
                                rules={{
                                    required: 'Wajib diisi!',
                                    validate: { isNumber: (value) => !isNaN(value) && Number(value) <= 999}
                                }}
                                updateInput={updateTotalDpt}
                            />
                            {methods.formState.errors.phpdptperempuan?.type === "isNumber" ?  
                            <Text style={styles.errorInput}> Input harus angka </Text>:null}
                            <View style={{...styles.totalContainer, backgroundColor: bgcolor}}>
                                <Text style={{marginBottom: 10}}>Jumlah pengguna hak pilih DPT Laki-laki + Perempuan</Text>
                                <Text style={styles.totalText}>{totalPhpDpt}</Text>
                            </View>
                        </View>

                        <View>  
                            <Text style={styles.title}>2. Jumlah pengguna hak pilih dalam DPTb</Text>
                            <TextInput
                                name="phpdptblaki"
                                label="DPTb Laki-laki"
                                placeholder="000"
                                keyboardType="numeric"
                                color={bgcolor}
                                rules={{
                                    required: 'Wajib diisi!',
                                    validate: { isNumber: (value) => !isNaN(value) && Number(value) <= 999}
                                }}
                                updateInput={updateTotalDptb}
                            />
                            {methods.formState.errors.phpdptblaki?.type === "isNumber" ?  
                            <Text style={styles.errorInput}> Input harus angka </Text>:null} 
                            <TextInput
                                name="phpdptbperempuan"
                                label="DPTb Perempuan"
                                placeholder="000"
                                keyboardType="numeric"
                                color={bgcolor}
                                rules={{
                                    required: 'Wajib diisi!',
                                    validate: {isNumber: (value) => !isNaN(value) && Number(value) <= 999}
                                }}
                                updateInput={updateTotalDptb}
                            />
                            {methods.formState.errors.phpdptbperempuan?.type === "isNumber" ?  
                            <Text style={styles.errorInput}> Input harus angka </Text>:null}
                            <View style={{...styles.totalContainer, backgroundColor: bgcolor}}>
                                <Text style={{marginBottom: 10}}>Jumlah pengguna hak pilih DPTb Laki-laki + Perempuan</Text>
                                <Text style={styles.totalText}>{totalPhpDptb}</Text>
                            </View>
                        </View>        

                        <View>  
                            <Text style={styles.title}>3. Jumlah pemilih dalam DPK</Text>
                            <TextInput
                                name="phpdpklaki"
                                label="DPK Laki-laki"
                                placeholder="000"
                                keyboardType="numeric"
                                color={bgcolor}
                                rules={{
                                    required: 'Wajib diisi!',
                                    validate: {isNumber: (value) => !isNaN(value) && Number(value) <= 999}
                                }}
                                updateInput={updateTotalDpk}
                            />
                            {methods.formState.errors.phpdptblaki?.type === "isNumber" ?  
                            <Text style={styles.errorInput}>Input harus angka </Text>:null} 
                            <TextInput
                                name="phpdpkperempuan"
                                label="DPK Perempuan"
                                placeholder="000"
                                keyboardType="numeric"
                                color={bgcolor}
                                rules={{
                                    required: 'Wajib diisi!',
                                    validate: {
                                        isNumber: (value) => !isNaN(value) && Number(value) <= 999,
                                    },
                                }}
                                updateInput={updateTotalDpk}
                            />
                            {methods.formState.errors.phpdpkperempuan?.type === "isNumber" ?  
                            <Text style={styles.errorInput}> Input harus angka </Text>:null}
                            <View style={{...styles.totalContainer, backgroundColor: bgcolor}}>
                                <Text style={{marginBottom: 10}}>Jumlah pengguna hak pilihDPK Laki-laki + Perempuan</Text>
                                <Text style={styles.totalText}>{totalPhpDpk}</Text>
                            </View>
                        </View>        

                        <View>  
                            <Text style={styles.title}>4. Jumlah Pemilih</Text>
                            <View style={{...styles.rowContainer, backgroundColor: bgcolor}}>
                                <Text style={{marginBottom: 10, color: '#4F200D'}}>Jumlah Pemilih Laki-laki </Text>
                                <Text style={styles.totalText}>{totalPhpLaki}</Text>
                            </View>
                            <View style={{...styles.rowContainer, backgroundColor: bgcolor}}>
                                <Text style={{marginBottom: 10, color: '#4F200D'}}>Jumlah Pemilih Perempuan</Text>
                                <Text style={styles.totalText}>{totalPhpPerempuan}</Text>
                            </View>
                            <View style={{...styles.totalContainer, backgroundColor: bgcolor}}>
                                <Text style={{marginBottom: 10}}>Jumlah Pemilih Laki-laki + Perempuan</Text>
                                <Text style={styles.totalText}>{totalPhp}</Text>
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