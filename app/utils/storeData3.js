import { DP, PHP, DPD, DPSS, DSS } from "../constants/dataSuratSuara";
import { tpsStorage, dapilStorage } from "./storage";
export default function StoreData3(fullState, capres) {
	const { dpp, dp, dpt, dptb, dpk, totaldp1 } = DP;
	const { php, phpdpt, phpdptb, phpdpk, totalphp1 } = PHP;
	const { dpd, dpdt, dpdp } = DPD;
	const { dpss, dpss1, dpss2, dpss3, dpss4 } = DPSS;
	const { dss, dss1, dss2, dss3 } = DSS;
	const {
		capres1,
		capres2,
		capres3,
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

	const idTps = JSON.parse(tpsStorage.getString("identitasTps"));
	const dapil = JSON.parse(dapilStorage.getString("dapil"));
	console.log("idTps :", idTps);

	var tps = [{ D: "Presiden dan Wakil Presiden" }, { C: "Desa/Kelurahan", D: `${idTps.kelurahan}` }, { C: "Kecamatan", D: `${idTps.kecamatan}` }, { C: "Kabupaten/Kota", D: "KOTA SURABAYA", F: "TPS" }, { C: "Provinsi", D: "JAWA TIMUR", F: `${idTps.nomertps}` }, { C: "Putaran", D: `1` }];

	var aoo = [
		{ A: "I.", C: dpp },
		{ B: "A", C: dp },
		{ C: dpt, D: "L", E: dptlaki },
		{ D: "P", E: dptperempuan },
		{ D: "JML (L+P)", E: totaldpt },
		{ B: "B", C: php },
		{ B: "1", C: phpdpt, D: "L", E: phpdptlaki },
		{ D: "P", E: phpdptperempuan },
		{ D: "JML (L+P)", E: totalphpdpt },
		{ B: "2", C: phpdptb, D: "L", E: phpdptblaki },
		{ D: "P", E: phpdptbperempuan },
		{ D: "JML (L+P)", E: totalphpdptb },
		{ B: "3", C: phpdpk, D: "L", E: phpdpklaki },
		{ D: "P", E: phpdpkperempuan },
		{ D: "JML (L+P)", E: totalphpdpk },
		{ B: "4", C: totalphp1, D: "L", E: totalphplaki },
		{ D: "P", E: totalphpperempuan },
		{ D: "JML (L+P)", E: totalphp },
		{ A: "II.", C: dpss },
		{ B: "1", C: dpss1, D: "JUMLAH", E: ssterima },
		{ B: "2", C: dpss2, D: "JUMLAH", E: sskembali },
		{ B: "3", C: dpss3, D: "JUMLAH", E: sstidakpakai },
		{ B: "4", C: dpss4, D: "JUMLAH", E: sspakai },
		{ A: "III.", C: dpd },
		{ C: dpdp, D: "L", E: dispenggunalaki },
		{ D: "P", E: dispenggunaperempuan },
		{ D: "JML (L+P)", E: totaldispengguna },
		{ A: "IV.", C: "DATA PEROLEHAN SUARA PASANGAN CALON PRESIDEN DAN WAKIL PRESIDEN" },
	];

	var aoo2 = [
		{ A: "V", C: dss },
		{ B: "A.", C: dss1, D: "JUMLAH", E: sssah },
		{ B: "B.", C: dss2, D: "JUMLAH", E: sstidaksah },
		{ B: "C.", C: dss3, D: "JUMLAH", E: totalss },
	];

	const readyNamaDanHasilPilpres = [
		{ B: "1", C: "ANIES RASYID BASWEDAN & ABD MUHAIMIN ISKANDAR", D: "JUMLAH", E: fullState.capres1 },
		{ B: "2", C: "PRABOWO SUBIANTO & GIBRAN RAKABUMING RAKA", D: "JUMLAH", E: fullState.capres2 },
		{ B: "3", C: "GANJAR PRANOWO, SH & MOH. MAHFUD MD", D: "JUMLAH", E: fullState.capres3 },
	];

	const readyHasilGabungan = [...tps, {}, ...aoo, ...readyNamaDanHasilPilpres, ...aoo2];

	return readyHasilGabungan;
}
