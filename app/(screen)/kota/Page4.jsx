import { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Button, Text } from "react-native";
import { useStateMachine } from 'little-state-machine';
import updateForm from "../../components/form/updateForm"
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { DP, PHP, DPD, DPSS } from '../../constants/dataSuratSuara';
import { PKB, GERINDRA } from '../../constants/calegDapil1';


export default function ManualCount4() {
    const {actions, state} = useStateMachine({updateForm});
    const [x, setX] = useState();
    const [namaCalon, setNamaCalon] = useState();
    const parties = [PKB, GERINDRA];
    
    console.log("state akhir identitas tps from Page4 :", state);
    
    const { dpp, dp, dpt, dptb, dptk, totaldp } = DP;
    const { php, phpdpt, phpdptb, phpdpk, totalphp } = PHP;
    const { dpd, dpdt, dpdp } = DPD;
    const { dpss, dpss1, dpss2, dpss3, dpss4 } = DPSS;
    const dataPemilih = [[dpp], [dp], [dpt], [dptb], [dptk], [totaldp], [php], [phpdpt], [phpdptb], [phpdpk], [totalphp], [dpd], [dpdt], [dpdp], [dpss], [dpss1], [dpss2], [dpss3], [dpss4]];
    
    // Ekstak data pemilih dari state
    const copiedData={...state}
    const contohNilai = {nilai : 22}
    console.log("copiedData", copiedData)


    // CONVERT parties to READY EXCEL FORMATTED
    	const generateKeysArray = (party) => {
            const keysArray = Object.keys(party).filter((key) => !isNaN(key));
            return keysArray.map((key) => ({[key]:party[key]}));
        };
	// Mengambil nama-nama calon dari setiap object partai dan membuat Array of Objects baru
        const readyExcelParties =[].concat(...(parties.map((party) => {
            const keysArray = generateKeysArray(party);
            const newArray = [{partai: party.nama}, ...keysArray]
            const readyArray = newArray.map((obj) => Object.entries(obj).reduce((acc, [key, value]) => { acc.A = key; acc.B = value; return acc; }, {}) );
            return (readyArray)
        })));
        console.log("readyExcelParties :", readyExcelParties)

        // const test = [{J:nilai.dptlaki, K:nilai.dptperempuan, L:nilai.totaldpt}]
        // console.log("test", test)

    const generateExcel = () => {
        const header = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet([[dpp], [dp], [dpt], [dptb], [dptk], [totaldp], [php], [phpdpt], [phpdptb], [phpdpk], [totalphp], [dpd], [dpdt], [dpdp], [dpss], [dpss1], [dpss2], [dpss3], [dpss4]]);
 
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        //Masukkan teks keterangan (key) dari nilai yang akan diinput
        XLSX.utils.sheet_add_json(ws, [
            ...readyExcelParties
            ], {header: header, skipHeader: true, origin: dataPemilih.length+1 });

        // Masukkan nilainya
        XLSX.utils.sheet_add_json(ws, [
            {J: "Laki-laki", K: "Perempuan", L:copiedData.nomortps}
            ], {header: header, skipHeader: true, origin: 2 });

        // /* Second Added */
        // XLSX.utils.sheet_add_json(ws, [
        //     { A: GERINDRA.nomer, B: GERINDRA.nama },...mapGERINDRA
        //     ], {header: header, skipHeader: true, origin: dataPemilih.length+mapPKB.length+1 });

        
        const base64 = XLSX.write(wb, { type: "base64" });
        const filename = FileSystem.documentDirectory + "OurExcel.xlsx";
        
        FileSystem.writeAsStringAsync(filename, base64, { encoding: FileSystem.EncodingType.Base64 })
        .then(() => {
            Sharing.shareAsync(filename)
        })
    }

    useEffect(() => {
    })

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <Text>Page 4 : Convert to Excel</Text>
                <Text>{copiedData.nomortps}</Text>
                <Text>Nomor TPS</Text>
                <Button title="Generate Excel" onPress={generateExcel}>
                    <Text>Generate Excel</Text>
                </Button>
            </View>
        </SafeAreaView>
    );
}