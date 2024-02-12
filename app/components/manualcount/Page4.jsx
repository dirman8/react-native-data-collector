import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { router, Stack} from 'expo-router';
import { useForm, FormProvider } from 'react-hook-form';
import { TextInput } from '../form/TextInput';
import { totalStorage } from '../../utils/storage';

export default function ManualCount4({parties, tingkat, storage, bgcolor, title}) {
    const [totalSs, setTotalSs] = useState(0);
    const [totalSsTs, setTotalSsTs] = useState(0);

    const {...methods} = useForm({mode: 'onChange'});
    const serializedTotal = totalStorage.getString("total");

    const updateTotalSs = (text) => {
        const sstidaksah = methods.getValues("sstidaksah");
        const totalss = totalSs + sstidaksah;
        setTotalSsTs(totalss);
    }

    useEffect(() => {
        updateTotalSs();
    //  calculateTotalSuaraPartai();
       if (serializedTotal) {
        const getTotal = JSON.parse(serializedTotal);
        const calculateTotalSuaraPartai = () => {
            const total = Object.values(getTotal).reduce((acc, curr) => acc + curr, 0)
            setTotalSs(total);
            return null
        };
        calculateTotalSuaraPartai();
    } else {
        console.log("serializedTotal doesn't exist")
    }
    }, [])
    
    const onSubmit = (data) => {
        const dataGabungan = {...data, sssah:totalSs, totalss: totalSsTs};
        storage.set("hasilInputPage4", JSON.stringify(dataGabungan));
        router.push(`/${tingkat}/successpage`);
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
                        <Text style={styles.title}>V. DATA SUARA SAH DAN TIDAK SAH</Text>
                        {/* <TextInput
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
                        } */}

                        <View style={{...styles.specialContainer, backgroundColor: bgcolor}}>
                            <Text style={{marginBottom: 10, color: "#4F200D"}}>A. JUMLAH SELURUH SUARA SAH </Text>
                            <Text style={styles.specialText}>{totalSs}</Text>
                        </View>
                        
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
                            <Text style={styles.totalText}>{totalSsTs}</Text>
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
    specialContainer: {
        flexDirection: 'row',
        height: 60,
        // backgroundColor: "#BDBDBD", 
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
    },
    specialText: {
        backgroundColor: 'white',
        padding: 8,
        height: 35,
        width: 43,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        
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
    errorInput: {
        color: 'red',
    }
})