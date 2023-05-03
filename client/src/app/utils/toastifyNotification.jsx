import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// toast.configure({ autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER });
const options = {
	position: 'bottom-right',
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: 'dark'
};

// add more config via the options object
const successToast = (message) =>
	toast.success(message, options);

const errorToast = (message) =>
	toast.error(message, options);

export { successToast, errorToast };
