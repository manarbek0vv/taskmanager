import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import './index.css';
import { Auth } from './store/auth.ts';
import { IStore } from './definitions/interfaces.ts';
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip } from 'chart.js';
import { Tasks } from './store/tasks.ts';
import { registerSW } from 'virtual:pwa-register';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

const updateSW = registerSW({
    onNeedRefresh() {
        if (confirm('New version of the application is available. Update?')) {
            updateSW(true);
        }
    },
    onOfflineReady() {
        console.log('The application is ready for offline mode');
    },
});


const auth = new Auth();
const tasks = new Tasks();

export const Context = createContext<IStore>({ auth, tasks })

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Context.Provider value={{ auth, tasks }}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Context.Provider>
    </React.StrictMode>,
)
