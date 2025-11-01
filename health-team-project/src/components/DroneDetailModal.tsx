import React from 'react';
import type { Drone } from '../data/droneData';

interface DroneDetailModalProps {
  drone: Drone | null;
  isOpen: boolean;
  onClose: () => void;
}

const DroneDetailModal: React.FC<DroneDetailModalProps> = ({ drone, isOpen, onClose }) => {
  if (!isOpen || !drone) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-flight': return '#007bff';
      case 'loading': return '#ffc107';
      case 'delivering': return '#28a745';
      default: return '#6c757d';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content drone-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🚀 Drone {drone.id.split('-')[1]}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          <div className="drone-status">
            <span
              className="status-badge"
              style={{ backgroundColor: getStatusColor(drone.status) }}
            >
              {drone.status.replace('-', ' ').toUpperCase()}
            </span>
          </div>

          <div className="service-section">
            <h3>Flight Details</h3>
            <p><strong>From:</strong> {drone.from}</p>
            <p><strong>To:</strong> {drone.to}</p>
            <p><strong>Estimated Arrival:</strong> {drone.estimatedArrival}</p>
          </div>

          <div className="service-section">
            <h3>Payload</h3>
            <ul className="services-list">
              {drone.payload.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DroneDetailModal;
