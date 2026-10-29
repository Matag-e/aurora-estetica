import { hydrateRoot } from 'react-dom/client';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

const container = document.getElementById('root');
if (!container) throw new Error('Elemento raiz não encontrado.');
if (container.hasChildNodes()) hydrateRoot(container, <App />);
else createRoot(container).render(<App />);
