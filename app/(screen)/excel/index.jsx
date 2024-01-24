import { SafeAreaView, ScrollView, View, Button, Text, StyleSheet } from "react-native";
import { router } from 'expo-router';
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { kotaStorage, provinsiStorage, pusatStorage, pilpresStorage } from '../../utils/storage';
import { DP, PHP, DPD, DPSS } from '../../constants/dataSuratSuara';
import { PKB, GERINDRA, PDIP, GOLKAR, NASDEM, PARTAI_BURUH, GELORA, PKS, PKN, HANURA, PARTAI_GARUDA, PAN, PBB, DEMOKRAT, PSI, PERINDO, PPP, PARTAI_UMMAT } from '../../constants/calegDapil1';
import { PKB as PKB_Dapil1, GERINDRA as GERINDRA_Dapil1, PDIP as PDIP_Dapil1, GOLKAR as GOLKAR_Dapil1, NASDEM as NASDEM_Dapil1, PARTAI_BURUH as PARTAI_BURUH_Dapil1, GELORA as GELORA_Dapil1, PKS as PKS_Dapil1, PKN as PKN_Dapil1, HANURA as HANURA_Dapil1, PARTAI_GARUDA as PARTAI_GARUDA_Dapil1, PAN as PAN_Dapil1, PBB as PBB_Dapil1, DEMOKRAT as DEMOKRAT_Dapil1, PSI as PSI_Dapil1, PERINDO as PERINDO_Dapil1, PPP as PPP_Dapil1, PARTAI_UMMAT as PARTAI_UMMAT_Dapil1 } from '../../constants/calegDapil1';
import { PKB as PKB_Provinsi, GERINDRA as GERINDRA_Provinsi, PDIP as PDIP_Provinsi, GOLKAR as GOLKAR_Provinsi, NASDEM as NASDEM_Provinsi, PARTAI_BURUH as PARTAI_BURUH_Provinsi, GELORA as GELORA_Provinsi, PKS as PKS_Provinsi, PKN as PKN_Provinsi, HANURA as HANURA_Provinsi, PARTAI_GARUDA as PARTAI_GARUDA_Provinsi, PAN as PAN_Provinsi, PBB as PBB_Provinsi, DEMOKRAT as DEMOKRAT_Provinsi, PSI as PSI_Provinsi, PERINDO as PERINDO_Provinsi, PPP as PPP_Provinsi, PARTAI_UMMAT as PARTAI_UMMAT_Provinsi } from '../../constants/calegProvinsi';
import { PKB as PKB_Pusat, GERINDRA as GERINDRA_Pusat, PDIP as PDIP_Pusat, GOLKAR as GOLKAR_Pusat, NASDEM as NASDEM_Pusat, PARTAI_BURUH as PARTAI_BURUH_Pusat, GELORA as GELORA_Pusat, PKS as PKS_Pusat, PKN as PKN_Pusat, HANURA as HANURA_Pusat, PARTAI_GARUDA as PARTAI_GARUDA_Pusat, PAN as PAN_Pusat, PBB as PBB_Pusat, DEMOKRAT as DEMOKRAT_Pusat, PSI as PSI_Pusat, PERINDO as PERINDO_Pusat, PPP as PPP_Pusat, PARTAI_UMMAT as PARTAI_UMMAT_Pusat } from '../../constants/calegPusat';

export default function Excel() {
    const partiesKota = [ PKB_Dapil1, GERINDRA_Dapil1, PDIP_Dapil1, GOLKAR_Dapil1, NASDEM_Dapil1, PARTAI_BURUH_Dapil1, GELORA_Dapil1, PKS_Dapil1, PKN_Dapil1, HANURA_Dapil1, PARTAI_GARUDA_Dapil1, PAN_Dapil1, PBB_Dapil1, DEMOKRAT_Dapil1, PSI_Dapil1, PERINDO_Dapil1, PPP_Dapil1, PARTAI_UMMAT_Dapil1 ];
    const partiesProvinsi = [ PKB_Provinsi, GERINDRA_Provinsi, PDIP_Provinsi, GOLKAR_Provinsi, NASDEM_Provinsi, PARTAI_BURUH_Provinsi, GELORA_Provinsi, PKS_Provinsi, PKN_Provinsi, HANURA_Provinsi, PARTAI_GARUDA_Provinsi, PAN_Provinsi, PBB_Provinsi, DEMOKRAT_Provinsi, PSI_Provinsi, PERINDO_Provinsi, PPP_Provinsi, PARTAI_UMMAT_Provinsi ];
    const partiesPusat = [ PKB_Pusat, GERINDRA_Pusat, PDIP_Pusat, GOLKAR_Pusat, NASDEM_Pusat, PARTAI_BURUH_Pusat, GELORA_Pusat, PKS_Pusat, PKN_Pusat, HANURA_Pusat, PARTAI_GARUDA_Pusat, PAN_Pusat, PBB_Pusat, DEMOKRAT_Pusat, PSI_Pusat, PERINDO_Pusat, PPP_Pusat, PARTAI_UMMAT_Pusat ];


    // Menngambil hasil input dari seluruh tingkat
    const serializedKota = kotaStorage.getString('kotaStorage');
    const getHasilKota = JSON.parse(serializedKota)
    // const serializedProvinsi = kotaStorage.getString('kotaStorage');
    // const getHasilProvinsi = JSON.parse(serializedProvinsi)
    // const serializedPusat = kotaStorage.getString('kotaStorage');
    // const getHasilPusat = JSON.parse(serializedPusat)
    // const serializedPilpres = kotaStorage.getString('kotaStorage');
    // const getHasilPilpres = JSON.parse(serializedPilpres)

    // Membuat Array untuk Keterangan Surat Suara(sebelah kiri)
    
    const { dpp, dp, dpt, dptb, dptk, totaldp } = DP;
    const { php, phpdpt, phpdptb, phpdpk, totalphp } = PHP;
    const { dpd, dpdt, dpdp } = DPD;
    const { dpss, dpss1, dpss2, dpss3, dpss4 } = DPSS;
    const dataPemilih = [[dpp], [dp], [dpt], [dptb], [dptk], [totaldp], [php], [phpdpt], [phpdptb], [phpdpk], [totalphp], [dpd], [dpdt], [dpdp], [dpss], [dpss1], [dpss2], [dpss3], [dpss4]];

    // CONVERT READY DATA to EXCEL FORMATTED
    const generateKeysArray = (party) => {
        const keysArray = Object.keys(party).filter((key) => !isNaN(key));
        return keysArray.map((key) => ({[key]:party[key]}));
    };
    // Mengambil nama-nama calon dari setiap object partai dan membuat Array of Objects baru
    const readyExcelParties =[].concat(...(partiesKota.map((party) => {
        const keysArray = generateKeysArray(party);
        const newArray = [{partai: party.nama}, ...keysArray]
        const readyArray = newArray.map((obj) => Object.entries(obj).reduce((acc, [key, value]) => { acc.A = key; acc.B = value; return acc; }, {}) );
        return (readyArray)
    })));
    console.log("readyExcelParties :", readyExcelParties)

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
        // XLSX.utils.sheet_add_json(ws, [
        //     {J: "Laki-laki", K: "Perempuan", L:copiedData.nomortps}
        //     ], {header: header, skipHeader: true, origin: 2 });

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

    return (
       <SafeAreaView style={{ flex: 1 }}>
            <View>
                <Text>Page 4 : Convert to Excel</Text>
                <Text>Nomor TPS</Text>
                <Button title="Generate Excel" onPress={generateExcel} disabled={true} >
                    <Text>Generate Excel</Text>
                </Button>
            </View>
        </SafeAreaView>
    )
}