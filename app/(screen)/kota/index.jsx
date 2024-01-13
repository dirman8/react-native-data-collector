import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, SafeAreaView } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { Stack, router } from "expo-router";
import { Picker } from '@react-native-picker/picker';
import { useStateMachine } from 'little-state-machine';
import { TextInput } from '../../components/form/TextInput';
import { kelurahan, kecamatan } from '../../constants/dataKelurahan';
import updateForm from "../../components/form/updateForm";

export default function IdentitasTps() {
    const {actions, state} = useStateMachine({updateForm});
    const {...methods} = useForm({mode: 'onChange'});
    
    const [formUpdated, setFormUpdated] = useState(false);
    const [formError, setError] = useState(false);
    const [kecamatanPilihan, setKecamatanPilihan] = useState("Asemrowo");
    const [kelurahanPilihan, setKelurahanPilihan] = useState("Asemrowo");

    // const postForm = async () => {
    //     try {
    //         const response = await fetch("http://localhost:3000/api/tps", {
    //                 method: "POST",
	// 				headers: {
    //                     "Content-Type": "application/json",
	// 				},
	// 				body: JSON.stringify(state),
	// 			});
    //             console.log("state from postForm : ", state);
	// 			const data = await response.json();
	// 			console.log("response status of fetching from goodForm : ", response.status);
	// 		} catch (error) {
    //             console.error("error from try Example page :", error);
	// 		}
	// 	};
        
    const onSubmit = (data) => {
        const identitastps = {
            ...data,
            kecamatan: kecamatanPilihan,
            kelurahan: kelurahanPilihan
        }
        actions.updateForm(identitastps);
        console.log("identitas tps from index :", identitastps)
        setFormUpdated(true);
        // postForm();
        router.replace('/kota/Page1');
    }

    const onError = (errors) => {
        console.log('errors',errors);
    }

        useEffect(() => {
     if (formUpdated) {
            console.log("prepare to postForm : ", state);
            // postForm(); 
            setFormUpdated(false);
        }
    }, [formUpdated, state]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
        <Stack.Screen
				options={{
					headerTitle: "Aplikasi Rekap Suara Pemilu 2024",
					headerStyle: {
						backgroundColor: "#f4511e",
					},
					headerTintColor: "#fff",
					headerTitleStyle: {
						fontWeight: "bold",
					},
				}}
			/>
        <View style={styles.container}>
            { formError ? <View><Text style={{color: 'red'}}>There was a problem with loading the form. Please try again later.</Text></View> : 
            <>
                <Text style={styles.title}>Identitas TPS</Text>

                {/* Input Kecamatan dan Kelurahan dengan react-native-picker-select */}
                <View style={styles.pickerContainer}>
                     <Text style={styles.pickerText}>Kecamatan</Text>
                     <Picker
                        style={styles.pickerStyles}
                        selectedValue={kecamatanPilihan}
                        onValueChange={(value) => {
                            setKecamatanPilihan(value)
                            setKelurahanPilihan(kelurahan[value][0])
                        }
                            }>
                            {
                                kecamatan.map(kecamatan => <Picker.Item key={kecamatan} label={kecamatan} value={kecamatan}/>)
                            }
                    </Picker>
                </View>

                <View style={styles.pickerContainer}>
                     <Text style={styles.pickerText}>Kelurahan</Text>
                     <Picker
                        style={styles.pickerStyles}
                        selectedValue={kelurahanPilihan}
                        onValueChange={(value) => setKelurahanPilihan(value)}>
                            {
                                kelurahan[kecamatanPilihan]?.map(kelurahan => <Picker.Item key={kelurahan} label={kelurahan} value={kelurahan}/>)
                            }
                    </Picker>
                </View>

                {/* Input Nomor TPS dengan react-hook-form */}
                <FormProvider {...methods} >
                    <View style={styles.pickerContainer}>
                        <TextInput
                            name="nomortps"
                            label="Nomor TPS"
                            placeholder="nomor"
                            keyboardType="numeric"
                            rules={{
                                required: 'Masukkan Nomor TPS!',
                                validate: {
                                    isNumber: (value) => !isNaN(value) && Number(value) <= 999,
                                },
                            }}
                            setFormError={setError}
                        />
                        {/* Tampilkan error jika input bukan angka atau nilainya lebih dari 999*/}
                        {methods.formState.errors.nomortps?.type === "isNumber" &&  
                        <Text style={styles.errorInput}>
                            Input must be a number
                        </Text>}
                    </View>
                </FormProvider>
            </>
            }
            <View style={styles.button}>
                <Button
                    title="Kirim"
                    color="#FF8400"
                    onPress={methods.handleSubmit(onSubmit, onError)}
                />
            </View>
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 40,
        color: 'white',
        height: 40,
        backgroundColor: '#4F200D',
        borderRadius: 4,
  },
    container: {
        flex: 1,
        padding: 8,
        backgroundColor: '#F6F1E9',
        borderColor: 'white',
        borderWidth: 1,
    },
    title: {
        color: '#4F200D',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10
    },
    errorInput: {
        color: 'red'
    },
    pickerContainer:{
        backgroundColor:'#FFD93D',
        padding: 8,
        paddingBottom: 20,
        borderColor: 'white',
        borderWidth: 1,
    },
    pickerStyles:{
        width:'100%',
        height: 40,
        padding: 8,
        backgroundColor:'white',
        color:'#4F200D'
    },
    pickerText:{
            color: '#4F200D',
            fontSize: 14,
            marginBottom: 8
    }
});