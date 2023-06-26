export function deconstructName (name) {
	return name.replace(' ', '_').toLowerCase();
}

// get hours for time filter
export function getHours (date) {
	const hours = [];
	const today = new Date();
	const todayDate = today.toISOString().split('T')[0];
	const now = date && date !== todayDate ? new Date(`${date}, 00:00:00`) : today;
	now.setMinutes(Math.floor(now.getMinutes() / 5) * 5); // round down to nearest 5 minutes
	for (let hour = 0; hour < 24; hour++) {
		for (let minute = 0; minute < 60; minute += 5) {
			const hourString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
			if (hourString >= now.toTimeString()) {
				hours.push(hourString);
			}
		}
	}
	return hours;
}

export const createDate = (i) => {
	const date = new Date();
	date.setDate(date.getDate() + i);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const dateString = `${year}-${month}-${day}`;
	return dateString;
};

export function getNext7Days (maxReservationDate) {
	const dates = [];
	for (let i = 0; i < maxReservationDate; i++) {
		const dateString = createDate(i);
		dates.push(dateString);
	}
	return dates;
}
