import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { View, StyleSheet, Text, Button, SafeAreaView, ScrollView } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import updateForm from "../../components/form/updateForm"
import { TextInput } from '../../components/form/TextInput';
import { useNavigation } from '@react-navigation/native';


export default function ManualCount1({tingkat, bgcolor, title}) {
    const {actions, state} = useStateMachine({updateForm});
    const {...methods} = useForm({mode: 'onChange'});

    const initDataPemilih = {
    dptlaki: 0,
    dptperempuan: 0,
    totaldpt: 0,
    dptblaki: 0,
    dptbperempuan: 0,
    totaldptb: 0,
    dpklaki: 0,
    dpkperempuan: 0,
    totaldpk: 0,
    totaldplaki: 0,
    totaldpperempuan: 0,
    totaldp: 0
    }

    const [dataPemilih, setDataPemilih] = useState(initDataPemilih);

    const [dptLaki, setDptLaki] = useState(0);
    const [dptPerempuan, setDptPerempuan] = useState(0);
    const [totalDpt, setTotalDpt] = useState(0);

     const [dptbLaki, setDptbLaki] = useState(0);
    const [dptbPerempuan, setDptbPerempuan] = useState(0);
    const [totalDptb, setTotalDptb] = useState(0);

    const [dpkLaki, setDpkLaki] = useState(0);
    const [dpkPerempuan, setDpkPerempuan] = useState(0);
    const [totalDpk, setTotalDpk] = useState(0);
    
    const totalDpLaki = dptLaki + dptbLaki + dpkLaki;
    const totalDpPerempuan = dptPerempuan + dptbPerempuan + dpkPerempuan;
    const totalDp = totalDpLaki + totalDpPerempuan;

    const updateTotalDpt = (text) => {
        const dptLaki = methods.getValues("dptlaki");
        const dptPerempuan = methods.getValues("dptperempuan");
        setDptLaki(dptLaki);
        setDptPerempuan(dptPerempuan);
        setTotalDpt(dptLaki + dptPerempuan);
    }
    const updateTotalDptb = (text) => {
        const dptbLaki = methods.getValues("dptblaki");
        const dptbPerempuan = methods.getValues("dptbperempuan");
        setDptbLaki(dptbLaki);
        setDptbPerempuan(dptbPerempuan);
        setTotalDptb(dptbLaki + dptbPerempuan);
    }

     const updateTotalDpk = (text) => {
        const dpkLaki = methods.getValues("dpklaki");
        const dpkPerempuan = methods.getValues("dpkperempuan");
        setDpkLaki(dpkLaki);
        setDpkPerempuan(dpkPerempuan);
        setTotalDpk(dpkLaki + dpkPerempuan);
    }

    const onSubmit = (data) => {
        actions.updateForm({
            ...data, 
            dptlaki: dptLaki,
            dptperempuan: dptPerempuan,
            totaldpt: totalDpt,
            dptblaki: dptbLaki,
            dptbperempuan: dptbPerempuan,
            totaldptb: totalDptb,
            dpklaki: dpkLaki,
            dpkperempuan:  dpkPerempuan,
            totaldpk: totalDpk,
            totaldplaki: totalDpLaki,
            totaldpperempuan: totalDpPerempuan,
            totaldp: totalDp
        })
        console.log("State from Page1 :", state)
        router.push(`/${tingkat}/Page1B`)
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
                        <Text style={styles.title}>A. DATA PEMILIH</Text>
                        <View>  
                            <Text style={styles.title}>1. Jumlah pemilih dalam DPT</Text>
                            <TextInput
                                name="dptlaki"
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
                            {methods.formState.errors.dptlaki?.type === "isNumber" ?  
                            <Text style={styles.errorInput}> Input harus angka </Text>:null} 
                            <TextInput
                                name="dptperempuan"
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
                            {methods.formState.errors.dptperempuan?.type === "isNumber" ?  
                            <Text style={styles.errorInput}> Input harus angka </Text>:null}
                            <View style={{...styles.totalContainer, backgroundColor: bgcolor}}>
                                <Text style={{marginBottom: 10}}>Jumlah DPT Laki-laki + Perempuan</Text>
                                <Text style={styles.totalText}>{totalDpt}</Text>
                            </View>
                        </View>

                        <View>  
                            <Text style={styles.title}>2. Jumlah pemilih dalam DPTb</Text>
                            <TextInput
                                name="dptblaki"
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
                            {methods.formState.errors.dptblaki?.type === "isNumber" ?  
                            <Text style={styles.errorInput}> Input harus angka </Text>:null} 
                            <TextInput
                                name="dptbperempuan"
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
                            {methods.formState.errors.dptbperempuan?.type === "isNumber" ?  
                            <Text style={styles.errorInput}> Input harus angka </Text>:null}
                            <View style={{...styles.totalContainer, backgroundColor: bgcolor}}>
                                <Text style={{marginBottom: 10}}>Jumlah DPTb Laki-laki + Perempuan</Text>
                                <Text style={styles.totalText}>{totalDptb}</Text>
                            </View>
                        </View>        

                        <View>  
                            <Text style={styles.title}>3. Jumlah pemilih dalam DPK</Text>
                            <TextInput
                                name="dpklaki"
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
                            {methods.formState.errors.dptblaki?.type === "isNumber" ?  
                            <Text style={styles.errorInput}>Input harus angka </Text>:null} 
                            <TextInput
                                name="dpkperempuan"
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
                            {methods.formState.errors.dpkperempuan?.type === "isNumber" ?  
                            <Text style={styles.errorInput}> Input harus angka </Text>:null}
                            <View style={{...styles.totalContainer, backgroundColor: bgcolor}}>
                                <Text style={{marginBottom: 10}}>Jumlah DPK Laki-laki + Perempuan</Text>
                                <Text style={styles.totalText}>{totalDpk}</Text>
                            </View>
                        </View>        

                        <View>  
                            <Text style={styles.title}>4. Jumlah Pemilih</Text>
                            <View style={{...styles.rowContainer, backgroundColor: bgcolor}}>
                                <Text style={{marginBottom: 10, color: '#4F200D'}}>Jumlah Pemilih Laki-laki </Text>
                                <Text style={styles.totalText}>{totalDpLaki}</Text>
                            </View>
                            <View style={{...styles.rowContainer, backgroundColor: bgcolor}}>
                                <Text style={{marginBottom: 10, color: '#4F200D'}}>Jumlah Pemilih Perempuan</Text>
                                <Text style={styles.totalText}>{totalDpPerempuan}</Text>
                            </View>
                            <View style={{...styles.totalContainer, backgroundColor: bgcolor}}>
                                <Text style={{marginBottom: 10}}>Jumlah Pemilih Laki-laki + Perempuan</Text>
                                <Text style={styles.totalText}>{totalDp}</Text>
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