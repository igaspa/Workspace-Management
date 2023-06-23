import { errorToast } from '../utils/toastifyNotification';
import { ERRORS } from './constants';

export function errorHandler(apiError, navigate) {
  const { status, data } = apiError;

  if (status === ERRORS.FETCH_ERROR) {
    errorToast(apiError.error);
    navigate('/server-error');
    return;
  }

  if (Array.isArray(data.details)) {
    data.details.forEach((err) => errorToast(err));
  } else {
    errorToast(data.details);
  }

  if (status === 401) {
    navigate('sign-in');
  }
}
