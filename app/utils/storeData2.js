import { DP, PHP, DPD, DPSS, DSS } from "../constants/dataSuratSuara";
import { tpsStorage, dapilStorage } from "./storage";

export default function StoreData2(fullState, parties) {
	const { dpp, dp, dpt, dptb, dpk, totaldp1 } = DP;
	const { php, phpdpt, phpdptb, phpdpk, totalphp1 } = PHP;
	const { dpd, dpdt, dpdp } = DPD;
	const { dpss, dpss1, dpss2, dpss3, dpss4 } = DPSS;
	const { dss, dss1, dss2, dss3 } = DSS;
	const {
		dptlaki,
		dptperempuan,
		totaldpt,
		dptblaki,
		dptbperempuan,
		totaldptb,
		dpklaki,
		dpkperempuan,
		totaldpk,
		totaldplaki,
		totaldpperempuan,
		totaldp,
		phpdptlaki,
		phpdptperempuan,
		totalphpdpt,
		phpdptblaki,
		phpdptbperempuan,
		totalphpdptb,
		phpdpklaki,
		phpdpkperempuan,
		totalphpdpk,
		totalphplaki,
		totalphpperempuan,
		totalphp,
		disterdaftarlaki,
		disterdaftarperempuan,
		totaldisterdaftar,
		dispenggunalaki,
		dispenggunaperempuan,
		totaldispengguna,
		ssterima,
		sskembali,
		sstidakpakai,
		sspakai,
		sssah,
		sstidaksah,
		totalss,
	} = fullState;

	//Get identitas TPS and nomer DAPIL
	const idTps = JSON.parse(tpsStorage.getString("identitasTps"));
	const dapil = JSON.parse(dapilStorage.getString("dapil"));

	// Conditionally choose sheetTittle based on tingkat
	var sheetTitle = {};
	if ((tingkat = "kota")) {
		sheetTitle.tingkat = "DPRD Kota / Kabupaten";
		sheetTitle.dapil = `KOTA SURABAYA ${dapil.dapil}`;
	} else if ((tingkat = "provinsi")) {
		sheetTitle.tingkat = "DPRD Provinsi";
		sheetTitle.dapil = `Jawa Timur 1`;
	} else {
		sheetTitle.tingkat = "DPR RI";
		sheetTitle.dapil = `JAWA TIMUR 1`;
	}

	var tps = [{ E: sheetTitle.tingkat }, { D: "Desa/Kelurahan", E: `${idTps.kelurahan}` }, { D: "Kecamatan", E: `${idTps.kecamatan}` }, { D: "Kabupaten/Kota", E: "KOTA SURABAYA", G: "TPS" }, { D: "Provinsi", E: "JAWA TIMUR", G: `${idTps.nomertps}` }, { D: "Daerah Pemilihan", E: sheetTitle.dapil }];

	var aoo = [
		{ A: "I.", D: dpp },
		{ B: "A", D: dp },
		{ D: dpt, E: "L", F: dptlaki },
		{ E: "P", F: dptperempuan },
		{ E: "JML (L+P)", F: totaldpt },
		{ B: "B", D: php },
		{ B: "1", D: phpdpt, E: "L", F: phpdptlaki },
		{ E: "P", F: phpdptperempuan },
		{ E: "JML (L+P)", F: totalphpdpt },
		{ B: "2", D: phpdptb, E: "L", F: phpdptblaki },
		{ E: "P", F: phpdptbperempuan },
		{ E: "JML (L+P)", F: totalphpdptb },
		{ B: "3", D: phpdpk, E: "L", F: phpdpklaki },
		{ E: "P", F: phpdpkperempuan },
		{ E: "JML (L+P)", F: totalphpdpk },
		{ B: "4", D: totalphp1, E: "L", F: totalphplaki },
		{ E: "P", F: totalphpperempuan },
		{ E: "JML (L+P)", F: totalphp },
		{ A: "II.", D: dpss },
		{ B: "1", D: dpss1, E: "JUMLAH", F: ssterima },
		{ B: "2", D: dpss2, E: "JUMLAH", F: sskembali },
		{ B: "3", D: dpss3, E: "JUMLAH", F: sstidakpakai },
		{ B: "4", D: dpss4, E: "JUMLAH", F: sspakai },
		{ A: "III.", D: dpd },
		{ D: dpdp, E: "L", F: dispenggunalaki },
		{ E: "P", F: dispenggunaperempuan },
		{ E: "JML (L+P)", F: totaldispengguna },
		{ A: "IV.", D: "DATA PEROLEHAN SUARA PARTAI DAN SUARA CALON" },
		{ D: "NOMOR, NAMA PARTAI DAN CALON" },
	];

	var aoo2 = [
		{ A: "V", D: dss },
		{ B: "A.", D: dss1, E: "JUMLAH", F: sssah },
		{ B: "B.", D: dss2, E: "JUMLAH", F: sstidaksah },
		{ B: "C.", D: dss3, E: "JUMLAH", F: totalss },
	];

	// MENYIAPKAN NAMA-NAMA CALON UNTUK EXCEL
	const readyNamaDanHasilPileg = [].concat(
		...parties.map((party) => {
			const keysArray = Object.keys(party).filter((key) => !isNaN(key));
			const namaCalon = keysArray.map((key) => ({ [key]: party[key] }));
			const namaCalonLengkap = [{ [party.nomer]: party.nama }, ...namaCalon];
			const mapNamaCalon = namaCalonLengkap.map((obj) =>
				Object.entries(obj).reduce((acc, [key, value]) => {
					acc.C = key;
					acc.D = value;
					return acc;
				}, {})
			);

			const kodeCalon = keysArray.map((key) => party.nama + key);
			const kodeCalonLengkap = [`${party.nama}0`, ...kodeCalon];
			const hasilCalon = kodeCalonLengkap.map((str) => fullState[str]);

			const namaDanHasil = mapNamaCalon.map((obj, index) => ({ ...obj, E: "SUARA SAH", F: hasilCalon[index] }));
			return [...namaDanHasil, { B: "B", D: "JUMLAH SUARA SAH PARTAI POLITIK DAN CALON (A.1+A.2)" }];
		})
	);

	const readyHasilGabungan = [...tps, {}, ...aoo, ...readyNamaDanHasilPileg, ...aoo2];

	return readyHasilGabungan;
}
