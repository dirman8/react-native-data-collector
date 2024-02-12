import { useState } from 'react';
import { router, Stack } from 'expo-router';
import { View, Text, SafeAreaView, StyleSheet, Button, ScrollView, Image, Dimensions } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { TextInput } from '../../components/form/TextInput';
import ConvertToObject from '../../utils/convertToObject';
import { useNavigation } from '@react-navigation/native';
import { totalStorage } from '../../utils/storage';

export default function ManualCount3({parties, tingkat, storage, bgcolor, title}) {
    const {...methods} = useForm({mode: 'onChange'});
    const [totalSuaraPartai, setTotalSuaraPartai] = useState({});
    const [pageIndex, setPageIndex] = useState(0);

    const inputParties = parties;
    const readyParties = ConvertToObject(inputParties);

    const imageUrl = (namapartai) => {
        let lambang;
        switch (namapartai) {
        case "PKB":
            lambang = require("../../assets/images/PKB.png");
            break;
        case "GERINDRA":
            lambang = require("../../assets/images/GERINDRA.png");
            break;
        case "PDIP":
            lambang = require("../../assets/images/PDIP.png");
            break;
        case "GOLKAR":
            lambang = require("../../assets/images/GOLKAR.png");
            break;
        case "NASDEM":
            lambang = require("../../assets/images/NASDEM.png");
            break;
        case "PARTAI_BURUH":
            lambang = require("../../assets/images/PARTAI_BURUH.png");
            break;
        case "GELORA":
            lambang = require("../../assets/images/GELORA.png");
            break;
        case "PKS":
            lambang = require("../../assets/images/PKS.png");
            break;
        case "PKN":
            lambang = require("../../assets/images/PKN.png");
            break;
        case "HANURA":
            lambang = require("../../assets/images/HANURA.png");
            break;
        case "PARTAI_GARUDA":
            lambang = require("../../assets/images/PARTAI_GARUDA.png");
            break;
        case "PAN":
            lambang = require("../../assets/images/PAN.png");
            break;
        case "PBB":
            lambang = require("../../assets/images/PBB.png");
            break;
        case "DEMOKRAT":
            lambang = require("../../assets/images/DEMOKRAT.png");
            break;
        case "PSI":
            lambang = require("../../assets/images/PSI.png");
            break;
        case "PERINDO":
            lambang = require("../../assets/images/PERINDO.png");
            break;
        case "PPP":
            lambang = require("../../assets/images/PPP.png");
            break;
        case "PARTAI_UMMAT":
            lambang = require("../../assets/images/PARTAI_UMMAT.png");
            break;
        }
        return lambang;
    }

    const updateTotalPartai = (text, name) => {
            setTotalSuaraPartai((prevState) => ({
            ...prevState,
            [name]: text,
        }));
    }

    // Define a function to filter and sum based on a pattern
    const sumValuesByPattern = (pattern) => {
        const filteredKeys = Object.keys(totalSuaraPartai).filter((key) => key.startsWith(pattern));
        const sum = filteredKeys.reduce((acc, key) => acc + totalSuaraPartai[key], 0);
        return sum;
    };

    const onSubmit = (data) => {
        storage.set("hasilInputPage3", JSON.stringify(data));
        totalStorage.set("total", JSON.stringify(totalSuaraPartai));
        router.push(`/${tingkat}/Page4`);
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
        <FormProvider {...methods} >
        <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            >
            {readyParties.map((party, index) => {
                return (
                <View key={index}>
                    <ScrollView style={{ width: screenWidth }}>
                        <View style={styles.container}>
                            <View style={styles.title}>
                                <Image source={imageUrl(party.nama)} style={styles.image} />
                                <Text>{party.nomer}. {party.nama}</Text>
                            </View>
                            <View>
                                <TextInput
                                        name={`${party.nama}0`}
                                        label={`${party.nama} (SUARA PARTAI)`}
                                        placeholder='0'
                                        keyboardType='numeric'
                                        color={bgcolor}
                                        height={40}
                                        rules={{ validate: { isNumber: (value) => !isNaN(value) && Number(value) <= 999, }, }}
                                        updateInput={updateTotalPartai}
                                    />
                            </View>
                            {party.calon.map((calon, index) => (
                                <View key={index}>
                                    <TextInput
                                        name={calon.id}
                                        label={`${index+1}. ${calon.label}`}
                                        placeholder='0'
                                        keyboardType='numeric'
                                        color={bgcolor}
                                        height={40}
                                        rules={{ validate: { isNumber: (value) => !isNaN(value) && Number(value) <= 999, }, }}
                                        updateInput={updateTotalPartai}
                                    />
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                    <View style={styles.totalContainer}>
                            <Text style={{marginBottom: 10, fontSize: 20}}>{` Total Suara Partai + Suara Calon : ${sumValuesByPattern(party.nama)}`}</Text>
                    </View>
                </View>
                )
            })}
        </ScrollView>
        {pageIndex===17 ? 
        <View style={{...styles.container, height: 45, backgroundColor: '#4F200D',}}>
            <Button style={styles.button}
            title="Next"
            color="#FF8400"
            onPress={methods.handleSubmit(onSubmit, onError)}
            />
        </View>:null}

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
    },
    scrollViewContent: {
      flexGrow: 1,
   },
    totalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFD93D',
        height: 60,
    },
    title: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10,
        color: 'black',
        fontSize: 40, 
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
  },
    button: {
        marginTop: 40,
        color: 'white',
        height: 60,
        backgroundColor: '#4F200D',
        borderRadius: 4,
  },
    image: {
        width: 35,
        height: 50,
        marginRight: 10,
        alignSelf: 'center',
    }
})