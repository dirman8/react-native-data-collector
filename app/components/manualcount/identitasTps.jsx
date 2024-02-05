import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { router, Stack, Link } from "expo-router";
import { Picker } from '@react-native-picker/picker';
import { useStateMachine } from 'little-state-machine';
import { kelurahan, kecamatan } from '../../constants/dataKelurahan';
import { tps } from '../../constants/tps';
import updateForm from "../../components/form/updateForm";


export default function IdentitasTps({tingkat, bgcolor, title}) {
    const {actions, state} = useStateMachine({updateForm});
    const {...methods} = useForm({mode: 'onChange'});
    
    const [formUpdated, setFormUpdated] = useState(false);
    const [formError, setError] = useState(false);
    const [kecamatanPilihan, setKecamatanPilihan] = useState("Asemrowo");
    const [kelurahanPilihan, setKelurahanPilihan] = useState("Asemrowo");
    const [nomerTps, setNomerTps] = useState();
    const [nomerTpsPilihan, setNomerTpsPilihan] = useState();

    console.log ("kecamatanPilihan :", kecamatanPilihan)

    // Menggenerate nomer tps sebanyak jumlah tps dari masing-masing kelurahan yang dipilih
    const getNomerTps = () => {
        const jumlahTps = tps[kecamatanPilihan][0][kelurahanPilihan]
        const numbers = Array.from({ length: jumlahTps }, (_, index) => index + 1);
        if ((kecamatanPilihan === "Wonocolo" && kelurahanPilihan === "Siwalan Kerto") || (kecamatanPilihan === "Sukolilo" && kelurahanPilihan === "Keputih")) {
            completeNumbers = numbers.push(901, 902);
        } else if ((kecamatanPilihan === "Jambangan" && kelurahanPilihan === "Jambangan") || (kecamatanPilihan === "Sambikerep" && kelurahanPilihan === "Sambikerep")) {
            completeNumbers = numbers.push(901);
        } else {
            completeNumbers = numbers;
        }
        console.log("completeNumbers :", completeNumbers);
        const stringNumbers = completeNumbers.map(number => number.toString());
        return stringNumbers
    }

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
        
    const onSubmit = () => {
        actions.updateForm({
            kecamatan: kecamatanPilihan,
            kelurahan: kelurahanPilihan,
            nomortps: nomerTpsPilihan
        });
        setFormUpdated(true);
        // postForm();
        router.push(`/${tingkat}/Page1`);
    }

    const onError = (errors) => {
        console.log('errors',errors);
    }

    const navigation = useNavigation();

    //     useEffect(() => {
    //  if (formUpdated) {
    //         console.log("prepare to postForm : ", state);
    //         // postForm(); 
    //         setFormUpdated(false);
    //     }
    // }, [formUpdated, state]);

    useEffect(() => {
        setNomerTps(getNomerTps());
    }, [kelurahanPilihan, kecamatanPilihan]);
    

    return (
        <SafeAreaView style={{ flex: 1 }}>
        <Stack.Screen 
        options={{ 
            title:title,
            headerStyle: {
						backgroundColor: bgcolor,
					},
            // headerLeft: () => {
			// 			return (
			// 				<Button
			// 					title="Back"
			// 					onPress={navigation.dispatch(StackActions.popToTop())}
			// 				/>
			// 			);
            // },
        }}  />
        <View style={styles.container}>
            { formError ? <View><Text style={{color: 'red'}}>There was a problem with loading the form. Please try again later.</Text></View> : 
            <>
                <Text style={styles.title}>Identitas TPS</Text>

                {/* Input Kecamatan dan Kelurahan dengan react-native-picker-select */}
                <View style={{...styles.pickerContainer, backgroundColor: bgcolor}}>
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

                <View style={{...styles.pickerContainer, backgroundColor: bgcolor}}>
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

                <View style={{...styles.pickerContainer, backgroundColor: bgcolor}}>
                     <Text style={styles.pickerText}>Nomer TPS</Text>
                     <Picker
                        style={styles.pickerStyles}
                        selectedValue={nomerTpsPilihan}
                        multiple={false}
                        onValueChange={(value) => setNomerTpsPilihan(value)}>
                            {
                                nomerTps?.map(nomer => <Picker.Item key={nomer} label={nomer} value={nomer}/>)
                            }
                    </Picker>
                </View>

            </>
            }
            <View style={styles.button}>
                <Button
                    title="Next"
                    color="#FF8400"
                    onPress={methods.handleSubmit(onSubmit, onError)}
                />
            </View>
        </View>
        </SafeAreaView>
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
    button: {
        marginTop: 40,
        color: 'white',
        height: 40,
        backgroundColor: '#4F200D',
        borderRadius: 4,
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
        // backgroundColor:'#FFD93D',
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