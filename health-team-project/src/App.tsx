import { useState, useEffect } from 'react';
import MapComponent from './components/MapComponent';
import ServiceDetailModal from './components/ServiceDetailModal';
import ResourceRequestForm from './components/ResourceRequestForm';
import SignInPage from './components/SignInPage';
import HealthSupplyForm from './components/HealthSupplyForm';
import DroneDetailModal from './components/DroneDetailModal';
import { getHealthServicesByTerritory } from './data/healthServices';
import { getFirstNationsTerritory } from './data/firstNationsBoundaries';
import type { HealthService } from './data/healthServices';
import type { User } from './data/authData';
import type { Drone } from './data/droneData';
import './App.css';

function App() {
  const [selectedService, setSelectedService] = useState<HealthService | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isResourceFormOpen, setIsResourceFormOpen] = useState(false);
  const [selectedTerritory, setSelectedTerritory] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<'map' | 'signin' | 'supplies'>('map');
  const [selectedDrone, setSelectedDrone] = useState<Drone | null>(null);
  const [isDroneModalOpen, setIsDroneModalOpen] = useState(false);

  useEffect(() => {
    // Check if user is already signed in
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleServiceClick = (service: HealthService) => {
    setSelectedService(service);
    setIsServiceModalOpen(true);
  };

  const handleTerritoryClick = (territoryId: string) => {
    setSelectedTerritory(territoryId);
    const territory = getFirstNationsTerritory(territoryId);
    const services = getHealthServicesByTerritory(territoryId);
    
    if (territory && services.length > 0) {
      setSelectedService(services[0]);
      setIsServiceModalOpen(true);
    }
  };

  const handleSignIn = (userData: User) => {
    setUser(userData);
    setCurrentPage('supplies');
  };

  const handleSignOut = () => {
    setUser(null);
    sessionStorage.removeItem('user');
    setCurrentPage('map');
  };

  const handleShowSupplies = () => {
    if (user) {
      setCurrentPage('supplies');
    } else {
      setCurrentPage('signin');
    }
  };

  const handleDroneClick = (drone: Drone) => {
    setSelectedDrone(drone);
    setIsDroneModalOpen(true);
  };

  if (currentPage === 'signin') {
    return <SignInPage onSignIn={handleSignIn} onClose={() => setCurrentPage('map')} />;
  }

  if (currentPage === 'supplies' && user) {
    return <HealthSupplyForm user={user} onSignOut={handleSignOut} />;
  }

  return (
    <div className="App">
      <div className="mobile-banner">Community Care Drone Access</div>
      
      <header className="app-header">
        <h1>First Nations Health Services</h1>
        <p>Far North Queensland Community Health Centre Locator</p>
        <div className="header-buttons">
          <button 
            onClick={() => setIsResourceFormOpen(true)}
            className="resource-request-btn"
          >
            Request Additional Services
          </button>
          <button 
            onClick={handleShowSupplies}
            className="supplies-btn"
          >
            Health Supplies
          </button>
        </div>
      </header>

      <main className="app-main">
        <MapComponent 
          onServiceClick={handleServiceClick}
          onTerritoryClick={handleTerritoryClick}
          onDroneClick={handleDroneClick}
          onRequestServices={() => setIsResourceFormOpen(true)}
          onHealthSupplies={handleShowSupplies}
        />
      </main>

      <ServiceDetailModal
        service={selectedService}
        isOpen={isServiceModalOpen}
        onClose={() => {
          setIsServiceModalOpen(false);
          setSelectedService(null);
        }}
      />

      <DroneDetailModal
        drone={selectedDrone}
        isOpen={isDroneModalOpen}
        onClose={() => {
          setIsDroneModalOpen(false);
          setSelectedDrone(null);
        }}
      />

      <ResourceRequestForm
        isOpen={isResourceFormOpen}
        onClose={() => setIsResourceFormOpen(false)}
        territoryId={selectedTerritory || undefined}
      />

      <footer className="app-footer">
        <p>Supporting Indigenous health and wellbeing across Far North Queensland</p>
        <p>Data sourced from Apunipima Cape York Health Council and Queensland Health</p>
      </footer>
    </div>
  );
}

export default App;
