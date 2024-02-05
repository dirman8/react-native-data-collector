import { DP, PHP, DPD, DPSS, DSS } from "../constants/dataSuratSuara";

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

	var aoo2 = [{ A: dss }, { A: dss1, E: sssah }, { A: dss2, E: sstidaksah }, { A: dss3, E: totalss }];

	// MENYIAPKAN NAMA-NAMA CALON UNTUK EXCEL
	const readyNamaDanHasilPileg = [].concat(
		...parties.map((party) => {
			const keysArray = Object.keys(party).filter((key) => !isNaN(key));
			const namaCalon = keysArray.map((key) => ({ [key]: party[key] }));
			const namaCalonLengkap = [{ partai: party.nama }, ...namaCalon];
			const mapNamaCalon = namaCalonLengkap.map((obj) =>
				Object.entries(obj).reduce((acc, [key, value]) => {
					acc.A = key;
					acc.B = value;
					return acc;
				}, {})
			);

			const kodeCalon = keysArray.map((key) => party.nama + key);
			const kodeCalonLengkap = [`${party.nama}0`, ...kodeCalon];
			const hasilCalon = kodeCalonLengkap.map((str) => fullState[str]);

			const namaDanHasil = mapNamaCalon.map((obj, index) => ({ ...obj, C: hasilCalon[index] }));
			return [...namaDanHasil, {}];
		})
	);

	const readyHasilGabungan = [...aoo, {}, ...readyNamaDanHasilPileg, {}, ...aoo2];

	return readyHasilGabungan;
}
