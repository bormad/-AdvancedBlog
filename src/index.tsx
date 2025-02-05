import { createRoot } from 'react-dom/client';
import App from './app/App';
import './app/styles/index.scss';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import { StoreProvider } from './app/providers/StoreProvider';

const container = document.getElementById('root');

if (!container) {
	throw new Error(
		"Root container is missing in the DOM. Ensure that your HTML file has a <div id='root'></div> element."
	);
}

const root = createRoot(container);
root.render(
	<BrowserRouter>
		<StoreProvider>
			<ErrorBoundary>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</ErrorBoundary>
		</StoreProvider>
	</BrowserRouter>
);
