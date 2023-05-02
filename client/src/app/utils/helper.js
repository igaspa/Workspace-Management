export function deconstructName (name) {
	return name.replace(' ', '_').toLowerCase();
}

export function getHours () {
	const hours = [];
	const now = new Date();
	now.setMinutes(Math.floor(now.getMinutes() / 5) * 5); // round down to nearest 5 minutes
	for (let i = 0; i < 24; i++) {
		for (let j = 0; j < 60; j += 5) {
			const hourString = `${i.toString().padStart(2, '0')}:${j.toString().padStart(2, '0')}`;
			if (hourString >= now.toTimeString().slice(0, 5)) { // compare with current time
				hours.push(hourString);
			}
		}
	}
	return hours;
}

export function getNext7Days () {
	const dates = [];
	for (let i = 0; i < 8; i++) {
		const date = new Date();
		date.setDate(date.getDate() + i);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const dateString = `${year}-${month}-${day}`;
		dates.push(dateString);
	}
	return dates;
}
