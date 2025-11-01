import React from 'react';
import type { HealthService } from '../data/healthServices';

interface ServiceDetailModalProps {
  service: HealthService | null;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, isOpen, onClose }) => {
  if (!isOpen || !service) return null;

  const getServiceTypeLabel = (type: string) => {
    switch (type) {
      case 'traditional': return 'Traditional Healing';
      case 'community': return 'Community Health';
      case 'western': return 'Western Medicine';
      default: return type;
    }
  };

  const getServiceTypeColor = (type: string) => {
    switch (type) {
      case 'traditional': return '#8B4513';
      case 'community': return '#228B22';
      case 'western': return '#DC143C';
      default: return '#666';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{service.name}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          <div className="service-type-badge" style={{ backgroundColor: getServiceTypeColor(service.type) }}>
            {getServiceTypeLabel(service.type)}
          </div>
          
          {service.culturallyAppropriate && (
            <div className="cultural-badge">
              ✓ Culturally Appropriate Care
            </div>
          )}

          <div className="service-section">
            <h3>About</h3>
            <p>{service.description}</p>
          </div>

          <div className="service-section">
            <h3>Contact Information</h3>
            <p><strong>Address:</strong> {service.address}</p>
            {service.phone && <p><strong>Phone:</strong> {service.phone}</p>}
            {service.website && (
              <p><strong>Website:</strong> <a href={service.website} target="_blank" rel="noopener noreferrer">{service.website}</a></p>
            )}
            {service.openingHours && <p><strong>Hours:</strong> {service.openingHours}</p>}
          </div>

          <div className="service-section">
            <h3>Services Offered</h3>
            <ul className="services-list">
              {service.services.map((serviceItem, index) => (
                <li key={index}>{serviceItem}</li>
              ))}
            </ul>
          </div>

          <div className="service-actions">
            <button className="action-btn primary">
              Get Directions
            </button>
            <button className="action-btn secondary">
              Call Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailModal;
