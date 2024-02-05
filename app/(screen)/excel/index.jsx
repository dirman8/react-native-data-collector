import { SafeAreaView, ScrollView, View, Button, Text, StyleSheet } from "react-native";
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { kotaStorage, provinsiStorage, pusatStorage, pilpresStorage, tpsStorage, statusStorage } from '../../utils/storage';

export default function Excel() {
    const [hasilKota, setHasilKota] = useState();
    const [hasilProvinsi, setHasilProvinsi] = useState();
    const [hasilPusat, setHasilPusat] = useState();
    const [hasilPilpres, setHasilPilpres] = useState();
    const [identitasTps, setIdentitasTps] = useState({});

    const {kecamatan, kelurahan, nomortps} = identitasTps;
    // Menngambil hasil input dari seluruh tingkat
    const serializedKota = kotaStorage.getString('hasilKota');
    const serializedProvinsi = provinsiStorage.getString('hasilProvinsi');
    const serializedPusat = pusatStorage.getString('hasilPusat');
    const serializedPilpres = pilpresStorage.getString('hasilPilpres');
    const serializedTps = tpsStorage.getString('identitasTps');

   useEffect(() => {
    // Send data to Database
// const fetchHasilTps = async () => {
//     try {
//         const res = await fetch("https://data-collector-server-073fb68b758e.herokuapp.com/api/getAll");
//         const result = await res.json();
//         // setGetHasilTps(result.data || []); 
//         console.log("result :", result)
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// };
// fetchHasilTps();

    if (serializedKota){
    const getHasilKota = JSON.parse(serializedKota)
    setHasilKota(getHasilKota);
    };
    if (serializedProvinsi){
        const getHasilProvinsi = JSON.parse(serializedProvinsi)
        setHasilProvinsi(getHasilProvinsi);
    }
    if (serializedPusat){
        const getHasilPusat = JSON.parse(serializedPusat)
        setHasilPusat(getHasilPusat);
    }
    if (serializedPilpres){
        const getHasilPilpres = JSON.parse(serializedPilpres)
        setHasilPilpres(getHasilPilpres);
    }
    const getIdentitasTps = JSON.parse(serializedTps)
    setIdentitasTps(getIdentitasTps);
    },[])
    
     const generateExcel = () => {

        const header = ["A", "B", "C"];
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet([[]]);
        const ws2 = XLSX.utils.aoa_to_sheet([[]]);
        const ws3 = XLSX.utils.aoa_to_sheet([[]]);
        const ws4 = XLSX.utils.aoa_to_sheet([[]]);

        XLSX.utils.book_append_sheet(wb, ws, "DPRD Kota");
        XLSX.utils.book_append_sheet(wb, ws2, "DPRD Provinsi");
        XLSX.utils.book_append_sheet(wb, ws3, "DPR RI");
        XLSX.utils.book_append_sheet(wb, ws4, "PILPRES");
        
        /* create !cols array if it does not exist */
        if(!ws["!cols"]) ws["!cols"] = []; if(!ws["!cols"][1]) ws["!cols"][1] = {wch: 8}; if(!ws["!cols"][2]) ws["!cols"][2] = {wch: 8}; if(!ws["!cols"][3]) ws["!cols"][3] = {wch: 8}; if(!ws["!cols"][4]) ws["!cols"][4] = {wch: 8};
        if(!ws2["!cols"]) ws2["!cols"] = []; if(!ws2["!cols"][1]) ws2["!cols"][1] = {wch: 8}; if(!ws2["!cols"][2]) ws2["!cols"][2] = {wch: 8}; if(!ws2["!cols"][3]) ws2["!cols"][3] = {wch: 8}; if(!ws2["!cols"][4]) ws2["!cols"][4] = {wch: 8};
        if(!ws3["!cols"]) ws3["!cols"] = []; if(!ws3["!cols"][1]) ws3["!cols"][1] = {wch: 8}; if(!ws3["!cols"][2]) ws3["!cols"][2] = {wch: 8}; if(!ws3["!cols"][3]) ws3["!cols"][3] = {wch: 8}; if(!ws3["!cols"][4]) ws3["!cols"][4] = {wch: 8};
        if(!ws4["!cols"]) ws4["!cols"] = []; if(!ws4["!cols"][1]) ws4["!cols"][1] = {wch: 8}; if(!ws4["!cols"][2]) ws4["!cols"][2] = {wch: 8}; if(!ws4["!cols"][3]) ws4["!cols"][3] = {wch: 8}; if(!ws4["!cols"][4]) ws4["!cols"][4] = {wch: 8};
        /* set column width */
        ws["!cols"][1].wpx = 400; ws["!cols"][2].wpx = 80; ws["!cols"][3].wpx = 80; ws["!cols"][4].wpx = 80;
        ws2["!cols"][1].wpx = 400; ws2["!cols"][2].wpx = 80; ws2["!cols"][3].wpx = 80; ws2["!cols"][4].wpx = 80;
        ws3["!cols"][1].wpx = 400; ws3["!cols"][2].wpx = 80; ws3["!cols"][3].wpx = 80; ws3["!cols"][4].wpx = 80;
        ws4["!cols"][1].wpx = 400; ws4["!cols"][2].wpx = 80; ws4["!cols"][3].wpx = 80; ws4["!cols"][4].wpx = 80;

        //Masukkan teks keterangan (key) dari nilai yang akan diinput
        XLSX.utils.sheet_add_json(ws, [
            ...hasilKota
            ], {header: header, skipHeader: true});
        XLSX.utils.sheet_add_json(ws2, [
            ...hasilProvinsi
            ], {header: header, skipHeader: true});
        XLSX.utils.sheet_add_json(ws3, [
            ...hasilPusat
            ], {header: header, skipHeader: true});
        XLSX.utils.sheet_add_json(ws4, [
            ...hasilPilpres
            ], {header: header, skipHeader: true});

        // Masukkan nilainya
        // XLSX.utils.sheet_add_json(ws, [
        //     {J: "Laki-laki", K: "Perempuan", L:copiedData.nomortps}
        //     ], {header: header, skipHeader: true, origin: 2 });

        // /* Second Added */
        // XLSX.utils.sheet_add_json(ws, [
        //     { A: GERINDRA.nomer, B: GERINDRA.nama },...mapGERINDRA
        //     ], {header: header, skipHeader: true, origin: dataPemilih.length+mapPKB.length+1 });
        const base64 = XLSX.write(wb, { type: "base64" });
        const filename = FileSystem.documentDirectory + `Dapil1_${kecamatan}_${kelurahan}_${nomortps}.xlsx`;
        
        FileSystem.writeAsStringAsync(filename, base64, { encoding: FileSystem.EncodingType.Base64 })
        .then(() => {
            Sharing.shareAsync(filename)
        })

        //Mengosongkan Storage dan push ke Halaman Awal (identitas tps)
        kotaStorage.clearAll(); 
        provinsiStorage.clearAll(); 
        pusatStorage.clearAll(); 
        pilpresStorage.clearAll(); 
        tpsStorage.clearAll(); 
        statusStorage.clearAll(); 
        router.replace("/home")
    }

    return (
       <SafeAreaView style={{ flex: 1 }}>
            <View>
                <Text>Pastikan Semua Input telah Sesuai sebelum membuat file Excel</Text>
                <Button title="Generate Excel" onPress={generateExcel}>
                    <Text>Buat File Excel</Text>
                </Button>
            </View>
        </SafeAreaView>
    )
}