import { router } from 'expo-router';
import { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import updateForm from "../../../components/form/updateForm"
import { TextInput } from '../../../components/form/TextInput';


export default function ManualCount1() {
    const {actions, state} = useStateMachine({updateForm});
    const {...methods} = useForm({mode: 'onChange'});

    const [dptlaki, setDptlaki] = useState(0);
    const [dptperempuan, setDptperempuan] = useState(0);

    //Update state dptlaki saat onChangeText di TextInput
    const handleLaki = (text) => {
        setDptlaki(text)
    }
     //Update state dptlaki saat onChangeText di TextInput
    const handlePerempuan = (text) => {
        setDptperempuan(text)
    }
    const total = dptlaki + dptperempuan;

    const onSubmit = (data) => {
        console.log("data from Page 1: ", data)
        actions.updateForm({...state, dptlaki: dptlaki, dptperempuan: dptperempuan, totaldpt: total});
        router.replace('/manualcount/Page2');
    }

    const onError = (errors) => {
        console.log('errors',errors);
    }

    console.log("state from Page1 :", state);
    
    return (
        <View style={styles.container}>
            <>
                <Text style={styles.title}>Input Data PILPRES</Text>
                <Text style={styles.title}>Jumlah pemilih dalam DPT - Model A.3-KPU</Text>
                <FormProvider {...methods} >
                    <TextInput
                        name="pemilihdptlaki"
                        label="Laki-laki"
                        placeholder="000"
                        keyboardType="numeric"
                        rules={{
                            required: 'Wajib diisi!',
                            validate: {
                                isNumber: (value) => !isNaN(value) && Number(value) <= 999,
                            },
                        }}
                        updateInput={handleLaki}
                    />
                    {/* Tampilkan error jika input bukan angka atau nilainya lebih dari 999*/}
                    {methods.formState.errors.pemilihdptlaki?.type === "isNumber" &&  
                    <Text style={styles.errorInput}>
                        Input harus angka 
                    </Text>} 

                    <TextInput
                        name="pemilihdptperempuan"
                        label="Perempuan"
                        placeholder="000"
                        keyboardType="numeric"
                        rules={{
                            required: 'Wajib diisi!',
                            validate: {
                                isNumber: (value) => !isNaN(value) && Number(value) <= 999,
                            },
                        }}
                        updateInput={handlePerempuan}
                    />
                    {/* Tampilkan error jika input bukan angka atau nilainya lebih dari 999*/}
                    {methods.formState.errors.pemilihdptperempuan?.type === "isNumber" &&  
                    <Text style={styles.errorInput}>
                        Input harus angka 
                    </Text>}

                    <View>
                        <View style={styles.totalContainer}>
                            <Text style={{marginBottom: 10}}>Jumlah Laki-laki + Perempuan</Text>
                            <Text style={styles.totalText}>{total}</Text>
                        </View>
                    </View>

                </FormProvider>
            </>
            <View style={styles.button}>
                <Button
                    title="Kirim"
                    color="#FF8400"
                    onPress={methods.handleSubmit(onSubmit, onError)}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
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
        color: 'white',
        height: 40,
        backgroundColor: '#4F200D',
        borderRadius: 4,
  },
})