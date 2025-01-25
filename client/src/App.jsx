import { BaseRoutes } from './routes/BaseRoutes';
import { PrimeReactProvider } from 'primereact/api';
import './App.css';
import { Navbar } from './components/NavBar';

function App() {
  return (
      <PrimeReactProvider>
        <Navbar />
        <div className="pt-16 container mx-auto p-4">
          <BaseRoutes />
        </div>
      </PrimeReactProvider>
  );
}

export default App;
