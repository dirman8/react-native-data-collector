import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { SafeAreaView, View, Button, Text, StyleSheet } from "react-native";
import { useStateMachine } from 'little-state-machine';
import { kotaStorage } from '../../utils/storage';
import updateForm from "../../components/form/updateForm"
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { DP, PHP, DPD, DPSS } from '../../constants/dataSuratSuara';
import { PKB, GERINDRA } from '../../constants/calegDapil1';


export default function ManualCount4() {
    const {actions, state} = useStateMachine({updateForm});
    const [copyState, setCopyState] = useState({});
    console.log("copyState :", copyState);
    const [namaCalon, setNamaCalon] = useState();
    const parties = [PKB, GERINDRA];
    
    console.log("state akhir identitas tps from Page4 :", state);
     //Mengambil data ke MMKV Storage
    const serializedHasilInput = kotaStorage.getString('hasilKota');
    const getHasilInput = JSON.parse(serializedHasilInput)
    const {dptlaki,dptperempuan,totaldpt,dptblaki,dptbperempuan,totaldptb,dpklaki,dpkperempuan,totaldpk,totaldplaki,totaldpperempuan,totaldp,phpdptlaki,phpdptperempuan,totalphpdpt, phpdptblaki,phpdptbperempuan,totalphpdptb,phpdpklaki,phpdpkperempuan,totalphpdpk,totalphplaki,totalphpperempuan,totalphp,disterdaftarlaki,disterdaftarperempuan,totaldisterdaftar,dispenggunalaki,dispenggunaperempuan,totaldispengguna,ssterima,sskembali,sstidakpakai,sspakai}= state;
    
    const { dpp, dp, dpt, dptb, dpk, totaldp1 } = DP;
    const { php, phpdpt, phpdptb, phpdpk, totalphp1 } = PHP;
    const { dpd, dpdt, dpdp } = DPD;
    const { dpss, dpss1, dpss2, dpss3, dpss4 } = DPSS;

    var aoo = [
	{ A: dpp },
	{ A: dp, C: "LAKI-LAKI (L)", D: "PEREMPUAN (P)", E: "JUMLAH (L+P)" },
	{ A: dpt, C: dptlaki, D: dptperempuan, E: totaldpt },
	{ A: dptb, C: dptblaki, D: dptbperempuan, E: totaldptb },
	{ A: dpk, C: dpklaki, D: dpkperempuan, E: totaldpk },
	{ A: totaldp1, C: totaldplaki, D: totaldpperempuan, E: totaldp },
	{ A: php },
	{ A: phpdpt, C: phpdptlaki, D: phpdptperempuan, E: totalphpdpt },
	{ A: phpdptb, C: phpdptblaki, D: phpdptbperempuan, E: totalphpdptb },
	{ A: phpdpk, C: phpdpklaki, D: phpdpkperempuan, E: totalphpdpk },
	{ A: totalphp1, C: totalphplaki, D: totalphpperempuan, E: totalphp },
	{},
	{ A: dpd },
	{ A: dpdt, C: disterdaftarlaki, D: disterdaftarperempuan, E: totaldisterdaftar },
	{ A: dpdp, C: dispenggunalaki, D: dispenggunaperempuan, E: totaldispengguna },
	{},
	{ A: dpss, E: "JUMLAH" },
	{ A: dpss1, E: ssterima },
	{ A: dpss2, E: sskembali },
	{ A: dpss3, E: sstidakpakai },
	{ A: dpss4, E: sspakai },
];
    
    // MENYIAPKAN NAMA-NAMA CALON UNTUK EXCEL
    const generateKeysArray1 = (party) => {
        const keysArray = Object.keys(party).filter((key) => !isNaN(key));
        return keysArray.map((key) => ({[key]:party[key]}));
    };
	// Mengambil nama-nama calon dari setiap object partai dan membuat Array of Objects baru
    const readyNamaCalon =[].concat(...(parties.map((party) => {
        const keysArray = generateKeysArray1(party);
        const newArray = [{partai: party.nama}, ...keysArray,{}]
        const readyArray = newArray.map((obj) => Object.entries(obj).reduce((acc, [key, value]) => { acc.A = key; acc.B = value; return acc; }, {}) );
        return (readyArray)
    })));
    console.log("readyNamaCalon :", readyNamaCalon)

    // MENYIAPKAN HASIL SUARA CALON UNTUK EXCEL
    const generateKeysArray2 = (party) => {
        const keysArray = Object.keys(party).filter((key) => !isNaN(key));
        return keysArray.map((key) => party.nama+key);
    };
	// Mengambil nama-nama calon dari setiap object partai dan membuat Array of Objects baru
    const readyHasilCalon =[].concat(...(parties.map((party) => {
        const keysArray2 = generateKeysArray2(party);
        const newArray2 = [`${party.nama}0`, ...keysArray2, {}];
        const readyArray2 = newArray2.map((str) => [copyState[str]]);
        return (readyArray2)
    })));
    console.log("readyHasilCalon :", readyHasilCalon)

    const generateExcel = () => {
        const header = ["A", "B", "C"];
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet([[]]);
        // const ws = XLSX.utils.aoa_to_sheet([[dpp], [dp], [dpt], [dptb], [dptk], [totaldp], [php], [phpdpt], [phpdptb], [phpdpk], [totalphp], [dpd], [dpdt], [dpdp], [dpss], [dpss1], [dpss2], [dpss3], [dpss4]]);
 
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        //Masukkan teks keterangan (key) dari nilai yang akan diinput
        XLSX.utils.sheet_add_json(ws, [
            ...aoo
            ], {header: header, skipHeader: true, origin: 1});

        XLSX.utils.sheet_add_json(ws, [
            ...readyNamaCalon
        ], {header: header, skipHeader: true, origin: "A24"});

        XLSX.utils.sheet_add_aoa(ws, readyHasilCalon, {origin: "C24"});

        const base64 = XLSX.write(wb, { type: "base64" });
        const filename = FileSystem.documentDirectory + "OurExcel.xlsx";
        
        FileSystem.writeAsStringAsync(filename, base64, { encoding: FileSystem.EncodingType.Base64 })
        .then(() => {
            Sharing.shareAsync(filename)
        })
    }

    const switchPage = () => {
        router.replace('/kota/Page5');
    }

    useEffect(() => {
        setCopyState(state);
    },[]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <Text>Page 4 : Convert to Excel</Text>
                <Button title="Generate Excel" onPress={generateExcel}>
                    <Text>Generate Excel</Text>
                </Button>
            </View>
            <View style={styles.container}>
                <Button style={styles.button}
                title="Kirim"
                color="#FF8400"
                onPress={switchPage}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 1,
        marginBottom: 20,
        backgroundColor: '#F6F1E9',
        borderColor: 'green',
        borderWidth: 5,
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