import React, { useState } from 'react';

interface ResourceRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
  territoryId?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  resourceType: string;
  urgency: string;
  description: string;
  culturalConsiderations: string;
}

const ResourceRequestForm: React.FC<ResourceRequestFormProps> = ({ isOpen, onClose, territoryId }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    location: '',
    resourceType: '',
    urgency: 'medium',
    description: '',
    culturalConsiderations: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock submission - simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Resource request submitted:', {
      ...formData,
      territoryId,
      timestamp: new Date().toISOString()
    });

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Reset form after success
    setTimeout(() => {
      setSubmitSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        resourceType: '',
        urgency: 'medium',
        description: '',
        culturalConsiderations: ''
      });
      onClose();
    }, 3000);
  };

  if (submitSuccess) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content success-modal" onClick={(e) => e.stopPropagation()}>
          <div className="success-content">
            <div className="success-icon">✓</div>
            <h2>Request Submitted Successfully</h2>
            <p>Thank you for your resource request. We will review your submission and get back to you within 24-48 hours.</p>
            <p><strong>Reference ID:</strong> REQ-{Date.now().toString().slice(-6)}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Request Additional Health Resources</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="resource-form">
          <div className="form-section">
            <h3>Contact Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location/Community</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Cairns, Kuranda, Port Douglas"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Resource Request Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="resourceType">Type of Resource Needed *</label>
                <select
                  id="resourceType"
                  name="resourceType"
                  value={formData.resourceType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select resource type</option>
                  <option value="mental-health">Mental Health Services</option>
                  <option value="traditional-healing">Traditional Healing</option>
                  <option value="medical-specialist">Medical Specialist</option>
                  <option value="community-health">Community Health Program</option>
                  <option value="emergency-care">Emergency Care</option>
                  <option value="maternal-health">Maternal Health</option>
                  <option value="elder-care">Elder Care</option>
                  <option value="youth-services">Youth Services</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="urgency">Urgency Level *</label>
                <select
                  id="urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleInputChange}
                  required
                >
                  <option value="low">Low - General inquiry</option>
                  <option value="medium">Medium - Needed within weeks</option>
                  <option value="high">High - Needed within days</option>
                  <option value="urgent">Urgent - Immediate need</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="form-group">
              <label htmlFor="description">Describe Your Needs *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Please provide details about the health resources you need..."
                required
              />
            </div>
          </div>

          <div className="form-section">
            <div className="form-group">
              <label htmlFor="culturalConsiderations">Cultural Considerations</label>
              <textarea
                id="culturalConsiderations"
                name="culturalConsiderations"
                value={formData.culturalConsiderations}
                onChange={handleInputChange}
                rows={3}
                placeholder="Any specific cultural requirements or preferences for care..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="action-btn secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="action-btn primary" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResourceRequestForm;
