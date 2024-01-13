import { router } from 'expo-router';
import { useState } from 'react';
import { View, StyleSheet, Text, Button, SafeAreaView, ScrollView } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import updateForm from "../../components/form/updateForm"
import { TextInput } from '../../components/form/TextInput';


export default function ManualCount1() {
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
    totaldpk: 0
    }

    const [dataPemilih, setDataPemilih] = useState(initDataPemilih);
    const [totalDpt, setTotalDpt] = useState(0);
    const [totalDptb, setTotalDptb] = useState(0);
    const [totalDpk, setTotalDpk] = useState(0);

    const updateTotalDpt = (text) => {
        const dptLaki = methods.getValues("dptlaki");
        const dptPerempuan = methods.getValues("dptperempuan");
        setTotalDpt(dptLaki + dptPerempuan);
    }
    const updateTotalDptb = (text) => {
        const dptbLaki = methods.getValues("dptblaki");
        const dptbPerempuan = methods.getValues("dptbperempuan");
        setTotalDptb(dptbLaki + dptbPerempuan);
    }

     const updateTotalDpk = (text) => {
        const dpkLaki = methods.getValues("dpklaki");
        const dpkPerempuan = methods.getValues("dpkperempuan");
        setTotalDpk(dpkLaki + dpkPerempuan);
    }

    const onSubmit = (data) => {
        console.log("data from Page 1: ", data)
        actions.updateForm({
            ...state, 
            ...data, 
            totaldpt: totalDpt,
            totaldptb: totalDptb,
            totaldpk: totalDpk
        })
        router.replace('/kota/Page2')
    }

    const onError = (errors) => {
        console.log('errors',errors);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Input Data PILPRES</Text>
                    <FormProvider {...methods} >

                        <View>  
                            <Text style={styles.title}>1. Jumlah pemilih dalam DPT - Model A.3-KPU</Text>
                            <TextInput
                                name="dptlaki"
                                label="DPT Laki-laki"
                                placeholder="000"
                                keyboardType="numeric"
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
                                rules={{
                                    required: 'Wajib diisi!',
                                    validate: { isNumber: (value) => !isNaN(value) && Number(value) <= 999}
                                }}
                                updateInput={updateTotalDpt}
                            />
                            {methods.formState.errors.dptperempuan?.type === "isNumber" ?  
                            <Text style={styles.errorInput}> Input harus angka </Text>:null}
                            <View style={styles.totalContainer}>
                                <Text style={{marginBottom: 10}}>Jumlah DPT Laki-laki + Perempuan</Text>
                                <Text style={styles.totalText}>{totalDpt}</Text>
                            </View>
                        </View>

                        <View>  
                            <Text style={styles.title}>2. Jumlah pemilih dalam DPTb (Model A.4-KPU)</Text>
                            <TextInput
                                name="dptblaki"
                                label="DPTb Laki-laki"
                                placeholder="000"
                                keyboardType="numeric"
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
                                rules={{
                                    required: 'Wajib diisi!',
                                    validate: {isNumber: (value) => !isNaN(value) && Number(value) <= 999}
                                }}
                                updateInput={updateTotalDptb}
                            />
                            {methods.formState.errors.dptbperempuan?.type === "isNumber" ?  
                            <Text style={styles.errorInput}> Input harus angka </Text>:null}
                            <View style={styles.totalContainer}>
                                <Text style={{marginBottom: 10}}>Jumlah DPTb Laki-laki + Perempuan</Text>
                                <Text style={styles.totalText}>{totalDptb}</Text>
                            </View>
                        </View>        

                        <View>  
                            <Text style={styles.title}>3. Jumlah pemilih dalam DPK (Model A.DPK-KPU)</Text>
                            <TextInput
                                name="dpklaki"
                                label="DPK Laki-laki"
                                placeholder="000"
                                keyboardType="numeric"
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
                            <View style={styles.totalContainer}>
                                <Text style={{marginBottom: 10}}>Jumlah DPK Laki-laki + Perempuan</Text>
                                <Text style={styles.totalText}>{totalDpk}</Text>
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