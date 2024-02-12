export default function SendToDb(data, tingkat) {
	fetch(`https://data-collector-server-073fb68b758e.herokuapp.com/api/${tingkat}`, {
		// fetch(`http://localhost:3000/api/${tingkat}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
}
