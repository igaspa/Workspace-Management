import './App.css';
import Routes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

function App () {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<Routes />
			</Router>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
			<ToastContainer />
		</QueryClientProvider>
	);
}

export default App;
