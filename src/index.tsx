import { createRoot } from 'react-dom/client';
import { Counter } from './components/Counter';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
