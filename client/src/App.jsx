import { BaseRoutes } from './routes/baseroutes';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

import './App.css'

function App() {
  return (
    <>
      <PrimeReactProvider>
        <BaseRoutes />
      </PrimeReactProvider>
    </>
  );

}

export default App
