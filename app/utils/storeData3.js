import { DP, PHP, DPD, DPSS } from "../constants/dataSuratSuara";
export default function StoreData3(fullState, capres) {
	const { dpp, dp, dpt, dptb, dpk, totaldp1 } = DP;
	const { php, phpdpt, phpdptb, phpdpk, totalphp1 } = PHP;
	const { dpd, dpdt, dpdp } = DPD;
	const { dpss, dpss1, dpss2, dpss3, dpss4 } = DPSS;
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
	} = fullState;

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

	const readyNamaDanHasilPilpres = () => {
		const keysArray = Object.keys(capres).filter((key) => !isNaN(key));
		const excelFormat = keysArray.map((key) => ({ A: key, B: capres[key], C: fullState[`capres${key}`] }));
		return excelFormat;
	};

	const readyData = readyNamaDanHasilPilpres();
	readyHasilGabungan = [...aoo, {}, ...readyData];

	return readyHasilGabungan;
}
