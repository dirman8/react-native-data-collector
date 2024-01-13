import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { View, Text, SafeAreaView, StyleSheet, Button, ScrollView, Image, Dimensions } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { useStateMachine } from 'little-state-machine';
import updateForm from "../../components/form/updateForm"
import { TextInput } from '../../components/form/TextInput';
import ConvertToObject from '../../utils/convertToObject';
import { PKB, GERINDRA, PDIP, GOLKAR, NASDEM, PARTAI_BURUH, GELORA, PKS, PKN, HANURA, PARTAI_GARUDA, PAN, PBB, DEMOKRAT, PSI, PERINDO, PPP, PARTAI_UMMAT } from '../../constants/calegDapil1';

export default function ManualCount3(party) {
    const {actions, state} = useStateMachine({updateForm});
    const {...methods} = useForm({mode: 'onChange'});
    const [calonId, setCalonId] = useState();
    const [totalSuaraPartai, setTotalSuaraPartai] = useState({});
    const [pageIndex, setPageIndex] = useState(0);

    const parties = [PKB, GERINDRA, PDIP, GOLKAR, NASDEM, PARTAI_BURUH, GELORA, PKS, PKN, HANURA, PARTAI_GARUDA, PAN, PBB, DEMOKRAT, PSI, PERINDO, PPP, PARTAI_UMMAT];

    const inputParties = parties;
    console.log("inputParties: ", inputParties);
    const readyParties = ConvertToObject(inputParties);
    console.log("readyParties: ", readyParties);

    const updateTotalPartai = (text, name) => {
        setTotalSuaraPartai((prevState) => ({
            ...prevState,
            [name]: text,
        }));
        console.log("totalSuaraPartai : " , totalSuaraPartai);
    }

    // Define a function to filter and sum based on a pattern
    const sumValuesByPattern = (pattern) => {
        const filteredKeys = Object.keys(totalSuaraPartai).filter((key) => key.startsWith(pattern));
        const sum = filteredKeys.reduce((acc, key) => acc + totalSuaraPartai[key], 0);
        return sum;
    };

    const onSubmit = (data) => {
        console.log("data from Page 3: ", data)
        actions.updateForm({...data});
        router.replace('/kota/Page4');
    }

    const onError = (errors) => {
        console.log('errors',errors);
    }

    const screenWidth = Dimensions.get('window').width;
    const handleScroll = (event) => {
      const xOffset = event.nativeEvent.contentOffset.x;
      const pageIndex = Math.round(xOffset / screenWidth);
      setPageIndex(pageIndex);
    }

    useEffect(() => {
    }, [])
    

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FormProvider {...methods} >
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                >
                {readyParties.map(party => (
                    <ScrollView key={party.nomer} style={{ width: screenWidth }}>
                    <View style={styles.container}>
                        <View>
                            <View style={styles.titleContainer}>
                                <Text styles={styles.title}>{party.nama}</Text>
                                <Image source={`../../assets/images/${party.nama}.png`} style={styles.image}/>
                            </View>
                            <TextInput
                                name={`${party.nama}0`}
                                label={`${party.nama} (SUARA PARTAI)`}
                                placeholder='0'
                                keyboardType='numeric'
                                rules={{ validate: { isNumber: (value) => !isNaN(value) && Number(value) <= 999, }, }}
                                updateInput={updateTotalPartai}
                            />
                            {party.calon.map((calon, index) => (
                                <View key={index}>
                                    <TextInput
                                        name={calon.id}
                                        label={calon.label}
                                        placeholder='0'
                                        keyboardType='numeric'
                                        rules={{ validate: { isNumber: (value) => !isNaN(value) && Number(value) <= 999, }, }}
                                        updateInput={updateTotalPartai}
                                    />
                                </View>
                            ))}
                        </View>
                        <View style={styles.totalContainer}>
                                <Text style={{marginBottom: 10}}>{`${pageIndex} Total Suara Partai + Calon ${readyParties.nama}: ${sumValuesByPattern(party.nama)}`}</Text>
                        </View>
                    </View>
                    </ScrollView>
                ))}

            </ScrollView>
            <View style={styles.container}>
                <Button style={styles.button}
                title="Kirim"
                color="#FF8400"
                onPress={methods.handleSubmit(onSubmit, onError)}
                />
            </View>

            </FormProvider>

             

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        padding: 1,
        marginBottom: 20,
        backgroundColor: '#F6F1E9',
        borderColor: 'green',
        borderWidth: 5,
    },
    scrollViewContent: {
      flexGrow: 1,
   },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        flex: 1,
        color: 'black',
        fontSize: 40, 
        fontWeight: 'bold',
        backgroundColor: 'red',
        textAlign: 'center',
  },
    button: {
        marginTop: 40,
        marginBottom: 40,
        color: 'white',
        height: 40,
        backgroundColor: '#4F200D',
        borderRadius: 4,
  },
    image: {
        width: 30,
        height: 43,
        alignSelf: 'center',
    }
})