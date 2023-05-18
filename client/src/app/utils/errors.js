
import { errorToast } from '../utils/toastifyNotification';

export function errorHandler (apiError) {
	if (Array.isArray(apiError.data.details)) apiError.data.details.forEach(err => errorToast(err));
	else errorToast(apiError.data.details);

	if (apiError.status === 401) return true;
}
