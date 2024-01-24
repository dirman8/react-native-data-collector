// DATA PEMILIH
const DP = {
	dpp: "I. DATA PEMILIH DAN PENGGUNA HAK PILIH",
	dp: "A. DATA PEMILIH",
	dpt: "1. Jumlah pemilih dalam DPT (Model A.3-KPU)",
	dptb: "2. Jumlah pemilih dalam DPTb (Model A.4-KPU)",
	dpk: "3. Jumlah pemilih dalam DPK (Model A.DPK-KPU)",
	totaldp1: "4. Jumlah pemilih (A.1 + A.2 + A.3)",
};
//[ dpp, dp, dpt, dptb, dptk, totaldp ]

// PENGGUNA HAK PILIH
const PHP = {
	php: "B. DATA PENGGUNA HAK PILIH",
	phpdpt: "1. Jumlah pengguna hak pilih dalam DPT (Model C7.DPT-KPU)",
	phpdptb: "2. Jumlah pengguna hak pilih dalam DPTb (Model A.4-KPU)",
	phpdpk: "3. Jumlah pengguna hak pilih dalam DPK (Model A.DPK-KPU)",
	totalphp1: "4. Jumlah pengguna hak pilih (B.1 + B.2 + B.3)",
};
// [ php, phpdpt, phpdptb, phpdpk, totalphp ]

// DATA PEMILIH DISABILITAS
const DPD = {
	dpd: "II. DATA PEMILIH DISABILITAS",
	dpdt: "1. Jumlah seluruh pemilih disabilitas terdaftar dalam DPT, DPTb dan DPK",
	dpdp: "2. Jumlah seluruh pemilih disabilitas yang menggunaka hak pilih",
};
// [ dpd, dpdt, dpdp ]

//DATA PENGGUNA SURAT SUARA
const DPSS = {
	dpss: "III. DATA PENGGUNA SURAT SUARA",
	dpss1: "1. Jumlah surat suara yang diterima, termasuk surat suara cadangan 2% dari DPT (2+3+4)",
	dpss2: "2. Jumlah surat suara yang dikembalikan oleh pemilih karena rusak/keliru coblos",
	dpss3: "3. Jumlah surat suara yang tidak digunakan/tidak terpakai, termasuk sisa surat suara cadangan",
	dpss4: "4. Jumlah surat suara yang digunakan",
};
// [ dpss, dpss1, dpss2, dpss3, dpss4 ]

export { DP, PHP, DPD, DPSS };
