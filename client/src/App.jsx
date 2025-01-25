import { BaseRoutes } from './routes/BaseRoutes';
import { PrimeReactProvider } from 'primereact/api';
import './App.css';
import { Navbar } from './components/NavBar';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 text-white">
      <PrimeReactProvider>
        <Navbar />
        <div className="pt-16 container mx-auto p-4">
          <BaseRoutes />
        </div>
      </PrimeReactProvider>
    </div>
  );
}

export default App;
