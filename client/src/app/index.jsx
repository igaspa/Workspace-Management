import './App.css';
import Routes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const queryClient = new QueryClient();
const theme = createTheme();

function App () {
	return (
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<Router>
					<Routes />
				</Router>
				<ToastContainer />
			</QueryClientProvider>
		</ThemeProvider>
	);
}

export default App;
