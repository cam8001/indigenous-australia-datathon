import { useState } from 'react';
import MapComponent from './components/MapComponent';
import ServiceDetailModal from './components/ServiceDetailModal';
import ResourceRequestForm from './components/ResourceRequestForm';
import { getHealthServicesByTerritory } from './data/healthServices';
import { getFirstNationsTerritory } from './data/firstNationsBoundaries';
import type { HealthService } from './data/healthServices';
import './App.css';

function App() {
  const [selectedService, setSelectedService] = useState<HealthService | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isResourceFormOpen, setIsResourceFormOpen] = useState(false);
  const [selectedTerritory, setSelectedTerritory] = useState<string | null>(null);

  const handleServiceClick = (service: HealthService) => {
    setSelectedService(service);
    setIsServiceModalOpen(true);
  };

  const handleTerritoryClick = (territoryId: string) => {
    setSelectedTerritory(territoryId);
    const territory = getFirstNationsTerritory(territoryId);
    const services = getHealthServicesByTerritory(territoryId);
    
    if (territory && services.length > 0) {
      // For now, show the first service in the territory
      // In a real app, you might show a list of all services
      setSelectedService(services[0]);
      setIsServiceModalOpen(true);
    }
  };

  const handleResourceRequest = () => {
    setIsResourceFormOpen(true);
  };

  const closeServiceModal = () => {
    setIsServiceModalOpen(false);
    setSelectedService(null);
  };

  const closeResourceForm = () => {
    setIsResourceFormOpen(false);
    setSelectedTerritory(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>First Nations Health Services</h1>
        <p>Find culturally appropriate health services in Far North Queensland</p>
        <button 
          className="resource-request-btn"
          onClick={handleResourceRequest}
        >
          Request Additional Resources
        </button>
      </header>

      <main className="app-main">
        <MapComponent 
          onServiceClick={handleServiceClick}
          onTerritoryClick={handleTerritoryClick}
        />
      </main>

      <ServiceDetailModal
        service={selectedService}
        isOpen={isServiceModalOpen}
        onClose={closeServiceModal}
      />

      <ResourceRequestForm
        isOpen={isResourceFormOpen}
        onClose={closeResourceForm}
        territoryId={selectedTerritory || undefined}
      />

      <footer className="app-footer">
        <p>This application displays mock data for demonstration purposes.</p>
        <p>In a real implementation, this would connect to actual health service databases and First Nations boundary data.</p>
      </footer>
    </div>
  );
}

export default App;
