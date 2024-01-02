import { SafeAreaView, ScrollView, View, Button, Text } from "react-native";
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';


export default function ManualCount4() {
    const generateExcel = () => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet([
            ["Odd", "Even", "Total"],
            [1, 2],
            [3, 4],
            [5, 6],
        ]);

        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        
        const base64 = XLSX.write(wb, { type: "base64" });
        const filename = FileSystem.documentDirectory + "myexcel.xlsx";
        
        FileSystem.writeAsStringAsync(filename, base64, { encoding: FileSystem.EncodingType.Base64 })
        .then(() => {
            Sharing.shareAsync(filename)
        })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <Text>Page 4 Manual Count</Text>
                  <Button title="Generate Excel" onPress={generateExcel}>
                    <Text>Generate Excel</Text>
                </Button>
            </View>
        </SafeAreaView>
    );
}