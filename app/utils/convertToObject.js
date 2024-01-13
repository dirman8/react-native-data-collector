// const ConvertToObject = (party) => {
// 	const generateKeysArray = (party) => {
// 		const keysArray = Object.keys(party).filter((key) => !isNaN(key));
// 		return keysArray.map((key) => ({ id: `${party.nama}${key}`, label: party[key] }));
// 	};
const ConvertToObject = (parties) => {
	const generateKeysArray = (party) => {
		const keysArray = Object.keys(party).filter((key) => !isNaN(key));
		return keysArray.map((key) => ({ id: `${party.nama}${key}`, label: party[key] }));
	};

	// Mengambil nama-nama calon dari setiap object partai dan membuat Array of Objects baru
	const readyParties = parties.map((party) => {
		const keysArray = generateKeysArray(party);
		return { nomer: party.nomer, nama: party.nama, dapil: party.dapil, calon: [...keysArray] };
	});

	return readyParties;
};

export default ConvertToObject;
