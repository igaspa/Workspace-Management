import ReactDOM from 'react-dom/client';
import App from './app';
import './index.css';
import { Provider } from 'react-redux';
import store from './app/store';
import { StyledEngineProvider } from '@mui/material/styles';

ReactDOM.createRoot(document.getElementById('root')).render(
	<StyledEngineProvider injectFirst><Provider store={store}>
		
		<App />
	</Provider></StyledEngineProvider>
);
