import { SafeAreaView, View, Button, Text, StyleSheet, Image, Alert, DrawerLayoutAndroidBase } from "react-native";
import { router, Stack } from "expo-router";
import { statusStorage, dapilStorage, tpsStorage, totalStorage } from '../../utils/storage';
import StoreData2 from '../../utils/storeData2';
import StoreData3 from '../../utils/storeData3';
import SendToDb from '../../utils/sendToDb';
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { useState, useEffect } from "react";

export default function SuccessPage({tingkat, parties, storage, datakey, capres}) {
    totalStorage.clearAll();

    const [colWidth, setColWidth] = useState(0)
    const [colWidth2, setColWidth2] = useState(0)
    const [enabled, setEnabled] = useState(false);

    const getDapilString = dapilStorage.getString('dapil');
    const getTpsString = tpsStorage.getString('identitasTps');
    const serialized1String = storage.getString('hasilInputPage1');
    const serialized1BString = storage.getString('hasilInputPage1B');
    const serialized2String = storage.getString('hasilInputPage2');
    const serialized2BString = storage.getString('hasilInputPage2B');
    const serialized3String = storage.getString('hasilInputPage3');
    const serialized4String = storage.getString('hasilInputPage4');

    // Parse JSON strings, handling potential null values
    const getDapil = getDapilString ? JSON.parse(getDapilString) : {};
    const getTps = getTpsString ? JSON.parse(getTpsString) : {};
    const serialized1 = serialized1String ? JSON.parse(serialized1String) : {};
    const serialized1B = serialized1BString ? JSON.parse(serialized1BString) : {};
    const serialized2 = serialized2String ? JSON.parse(serialized2String) : {};
    const serialized2B = serialized2BString ? JSON.parse(serialized2BString) : {};
    const serialized3 = serialized3String ? JSON.parse(serialized3String) : {};
    const serialized4 = serialized4String ? JSON.parse(serialized4String) : {};

    const {kecamatan, kelurahan, nomertps} = getTps;

    const gabunganHasilInput = {...serialized1, ...serialized1B, ...serialized2, ...serialized2B, ...serialized3, ...serialized4};
    const databaseLengkap = {...gabunganHasilInput, ...getTps, ...getDapil};

    let dataGabungan;
    if (tingkat === "pilpres") {
        dataGabungan = StoreData3(gabunganHasilInput, capres);
  
    } else {
        dataGabungan = StoreData2(gabunganHasilInput, parties, tingkat);
    }

    useEffect(() => {
        SendToDb(databaseLengkap, tingkat);
        if (tingkat === "pilpres") {
            setColWidth(400);
            setColWidth2(80);
        } else {
            setColWidth(20);
            setColWidth2(400);
        }
    },[])
    

    const backToHome = () => {
        router.replace('/home/pilihTingkat');
    }

    const showAlertMessage = () => {
	Alert.alert(
		'File Excel belum terkirim',
		'Mohon buat file excel dan kirimkan terlebih dahulu sebelum melanjutkan input ke tingkat selanjutnya.',
		[
		{ text: 'OK', onPress: () => console.log('OK Pressed') }
		],
		{ cancelable: false }
	);
	};

    const generateExcel = () => {
        statusStorage.set(datakey, true);
        setEnabled(true);
        const header = ["A", "B", "C", "D", "E", "F"];
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet([[]]);

        XLSX.utils.book_append_sheet(wb, ws, "DPRD Kota");

        /* create !cols array if it does not exist */
        if(!ws["!cols"]) ws["!cols"]= []; if(!ws["!cols"][0]) ws["!cols"][0] = {wch: 8}; if(!ws["!cols"][1]) ws["!cols"][1] = {wch: 8}; if(!ws["!cols"][2]) ws["!cols"][2] = {wch: 8}; if(!ws["!cols"][3]) ws["!cols"][3] = {wch: 8}; if(!ws["!cols"][4]) ws["!cols"][4] = {wch: 8}; if(!ws["!cols"][5]) ws["!cols"][5] = {wch: 8}; if(!ws["!cols"][6]) ws["!cols"][6] = {wch: 8};
         /* set column width */
        ws["!cols"][0].wpx = 20; ws["!cols"][1].wpx = 20; ws["!cols"][2].wpx = colWidth; ws["!cols"][3].wpx = colWidth2; ws["!cols"][4].wpx = 80; ws["!cols"][5].wpx = 80; ws["!cols"][4].wpx = 80; ws["!cols"][5].wpx = 80; ws["!cols"][6].wpx = 80;

        //Masukkan teks keterangan (key) dari nilai yang akan diinput
        XLSX.utils.sheet_add_json(ws, [
            ...dataGabungan
            ], {header: header, skipHeader: true});

        const base64 = XLSX.write(wb, { type: "base64" });
        const filename = FileSystem.documentDirectory + `${tingkat}_dapil${getDapil.dapil}_${kecamatan}_${kelurahan}_${nomertps}.xlsx`;
        
        FileSystem.writeAsStringAsync(filename, base64, { encoding: FileSystem.EncodingType.Base64 })
        .then(() => {
            Sharing.shareAsync(filename)
        })

        storage.clearAll();
    }

    return (
        <SafeAreaView style={styles.safeArea}>
        <Stack.Screen 
        options={{ 
            title:"",
            headerStyle: {
						backgroundColor: "#FFFFFF",
					},
        }}  />
            <View style={styles.container}>
                <Image source={require('../../assets/success.png')}/>
                <Text style={styles.title}>Input Data Sukses !</Text>
                <Button style={styles.button}
                    title="Kembali ke Halaman Depan"
                    color="#FF8400"
                    onPress={enabled ? backToHome : showAlertMessage}
                    // onPress={backToHome}
                />
                <View style={styles.excelContainer}>
                    <Text style={styles.excelTitle}>Pastikan Semua Input telah Sesuai sebelum membuat file Excel</Text>
                    <Button title="Buat File Excel" onPress={generateExcel}>
                        <Text>Buat File Excel</Text>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6F1E9',
    },
    container: {
        alignItems: 'center',
    },
    excelContainer: {
        marginTop: 60,
    },
    title: {
        fontSize: 20,
        marginBottom: 40,
        marginTop: 40,
    },
    excelTitle: {
        fontSize: 18,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginTop: 40,
        color: 'white',
        height: 60,
        backgroundColor: '#4F200D',
        borderRadius: 10,
  },
    image: {
        width: 100,
        height: 100,
    }
})