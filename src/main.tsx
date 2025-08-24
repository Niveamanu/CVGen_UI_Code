import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import './styles/main.scss'
import Root from './routes/Root.js';
import { store, persistor } from '@/store';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <Root store={store} persistor={persistor} />
  </StrictMode>,
)
