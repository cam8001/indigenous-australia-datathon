import React, { useState } from 'react';
import { regions } from '../data/authData';
import type { User } from '../data/authData';

interface SignInPageProps {
  onSignIn: (user: User) => void;
  onClose: () => void;
}

const SignInPage: React.FC<SignInPageProps> = ({ onSignIn, onClose }) => {
  const [formData, setFormData] = useState({
    region: '',
    community: '',
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const selectedRegion = regions.find(r => r.id === formData.region);
  const availableCommunities = selectedRegion?.communities || [];

  const handleRegionChange = (regionId: string) => {
    setFormData({
      ...formData,
      region: regionId,
      community: '' // Reset community when region changes
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.region || !formData.community || !formData.username || !formData.password) {
      setError('All fields are required');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    // Mock authentication - any password works
    const regionName = regions.find(r => r.id === formData.region)?.name || '';
    const communityName = availableCommunities.find(c => c.id === formData.community)?.name || '';

    const user: User = {
      region: regionName,
      community: communityName,
      username: formData.username
    };

    // Store in session storage
    sessionStorage.setItem('user', JSON.stringify(user));
    onSignIn(user);
  };

  const isFormValid = formData.region && formData.community && formData.username && formData.password.length >= 8;

  return (
    <div className="signin-container">
      <div className="signin-content">
        <div className="signin-branding">
          <h1>Indigenous Health Supply Portal</h1>
          <p>Connecting communities with essential healthcare resources</p>
          <p><em>For the demo, any username and password will work. The forms do not save any data.</em></p>
        </div>

        <div className="signin-form-container">
          <form onSubmit={handleSubmit} className="signin-form">
            <button className="close-btn signin-close" onClick={onClose}>&times;</button>
            <h2>Sign In</h2>

            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="region">Region</label>
              <select
                id="region"
                value={formData.region}
                onChange={(e) => handleRegionChange(e.target.value)}
                required
              >
                <option value="">Select Region</option>
                {regions.map(region => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="community">Community</label>
              <select
                id="community"
                value={formData.community}
                onChange={(e) => setFormData({ ...formData, community: e.target.value })}
                disabled={!formData.region}
                required
              >
                <option value="">Select Community</option>
                {availableCommunities.map(community => (
                  <option key={community.id} value={community.id}>
                    {community.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
                minLength={8}
                required
              />
            </div>

            <button
              type="submit"
              className="signin-btn"
              disabled={!isFormValid}
            >
              Sign In
            </button>

            <a href="#" className="forgot-password">Forgot Password?</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
