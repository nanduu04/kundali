import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalculator, 
  faSpinner, 
  faStar, 
  faMoon, 
  faSun, 
  faGlobe, 
  faClock, 
  faUser, 
  faMapMarkerAlt, 
  faSearch 
} from '@fortawesome/free-solid-svg-icons';
import { calculateAscendant, calculatePlanetaryPositions } from './utils/astrologyCalculations';
import './KundliCalculator.css';

const KundliCalculator = () => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    latitude: '',
    longitude: '',
  });
  
  const [chart, setChart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('birthChart');
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchTimeout = useRef(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // If birth place is being typed, use debounce for location search
    if (name === 'birthPlace' && value.length >= 3) {
      clearTimeout(searchTimeout.current);
      searchTimeout.current = setTimeout(() => {
        searchLocations(value);
      }, 500);
    }
  };

  // Search for locations using the free Nominatim OpenStreetMap API
  const searchLocations = async (query) => {
    if (query.length < 3) return;
    
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`,
        {
          headers: {
            'User-Agent': 'KundliCalculatorApp/1.0'
          }
        }
      );
      
      if (!response.ok) throw new Error('Geocoding API request failed');
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        const locations = data.map(result => ({
          name: result.display_name,
          lat: result.lat,
          lng: result.lon,
          type: result.type
        }));
        
        setLocationSuggestions(locations);
        setShowSuggestions(true);
      } else {
        setLocationSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
      setError('Failed to fetch location data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Select a location from suggestions
  const selectLocation = (location) => {
    setFormData(prev => ({
      ...prev,
      birthPlace: location.name,
      latitude: location.lat,
      longitude: location.lng
    }));
    setShowSuggestions(false);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Validation
    if (!formData.name || !formData.birthDate || !formData.birthTime || !formData.birthPlace) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }
    
    try {
      // Generate a more realistic Vedic chart
      await generateChart();
    } catch (err) {
      setError('Error calculating chart. Please ensure all details are correct and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Generate a more realistic Vedic chart
  const generateChart = async () => {
    try {
      console.log('Generating chart with data:', {
        date: formData.birthDate,
        time: formData.birthTime,
        latitude: formData.latitude,
        longitude: formData.longitude
      });

      // Validate coordinates
      if (!formData.latitude || !formData.longitude) {
        throw new Error('Please select a location from the suggestions');
      }

      // Calculate ascendant
      const ascendant = calculateAscendant(
        formData.birthDate,
        formData.birthTime,
        parseFloat(formData.latitude),
        parseFloat(formData.longitude)
      );

      console.log('Calculated ascendant:', ascendant);

      // Calculate planetary positions
      const planets = calculatePlanetaryPositions(
        formData.birthDate,
        formData.birthTime
      );

      console.log('Calculated planetary positions:', planets);

      const chart = {
        ascendant,
        planets,
        birthData: {
          name: formData.name,
          date: formData.birthDate,
          time: formData.birthTime,
          place: formData.birthPlace,
          latitude: formData.latitude,
          longitude: formData.longitude
        }
      };

      setChart(chart);
    } catch (error) {
      console.error('Error generating chart:', error);
      setError(error.message || 'Error calculating chart. Please ensure all details are correct and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="kundli-container">
      <div className="kundli-header">
        <h1 className="kundli-title">
          <FontAwesomeIcon icon={faStar} className="icon" />
          Vedic Kundli Calculator
          <FontAwesomeIcon icon={faMoon} className="icon" />
        </h1>
        <p className="kundli-subtitle">
          Calculate your detailed Vedic birth chart with planetary positions, houses, and interpretations
        </p>
      </div>
      
      <div className="kundli-form-container">
        <h2 className="kundli-form-title">
          <FontAwesomeIcon icon={faUser} className="icon" />
          Enter Birth Details
        </h2>
        
        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your full name"
                required
                aria-required="true"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="birthDate">
                Birth Date
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="form-input"
                required
                aria-required="true"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="birthTime">
                <FontAwesomeIcon icon={faClock} className="icon" />
                Birth Time
                <span className="required-mark" aria-hidden="true">*</span>
              </label>
              <input
                type="time"
                id="birthTime"
                name="birthTime"
                value={formData.birthTime}
                onChange={handleChange}
                className="form-input"
                required
                aria-required="true"
              />
            </div>
            
            <div className="form-group location-input-container">
              <label className="form-label" htmlFor="birthPlace">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
                Birth Place
              </label>
              <div className="location-input-wrapper">
                <input
                  type="text"
                  id="birthPlace"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleChange}
                  onFocus={() => formData.birthPlace.length >= 3 && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="form-input"
                  placeholder="Enter city, state, country"
                  required
                  aria-required="true"
                  aria-expanded={showSuggestions}
                  aria-controls="location-suggestions"
                />
                {loading && formData.birthPlace.length >= 3 ? (
                  <FontAwesomeIcon 
                    icon={faSpinner} 
                    className="icon-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <FontAwesomeIcon 
                    icon={faSearch} 
                    aria-hidden="true"
                  />
                )}
              </div>
              
              {showSuggestions && locationSuggestions.length > 0 && (
                <div 
                  id="location-suggestions"
                  className="location-suggestions"
                  role="listbox"
                >
                  {locationSuggestions.map((location, index) => (
                    <div 
                      key={index}
                      className="suggestion-item"
                      onClick={() => selectLocation(location)}
                      role="option"
                      aria-selected={false}
                    >
                      <div className="suggestion-name">{location.name}</div>
                      <div className="suggestion-coords">
                        Lat: {location.lat}, Long: {location.lng}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <button
            type="submit"
            className="submit-button"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="icon-spin" aria-hidden="true" />
                Calculating Your Kundli...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faCalculator} className="icon" aria-hidden="true" />
                Generate Vedic Kundli
              </>
            )}
          </button>
        </form>
      </div>
      
      {chart && (
        <div className="chart-container" role="region" aria-label="Birth Chart Results">
          <h2 className="chart-title">
            Vedic Kundli for {chart.birthData.name}
          </h2>
          
          <div className="birth-info">
            <div className="birth-info-grid">
              <div>
                <p className="birth-info-label">Birth Date:</p>
                <p className="birth-info-value">
                  {new Date(chart.birthData.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div>
                <p className="birth-info-label">Birth Time:</p>
                <p className="birth-info-value">{chart.birthData.time}</p>
              </div>
              <div>
                <p className="birth-info-label">Birth Place:</p>
                <p className="birth-info-value">{chart.birthData.place}</p>
              </div>
              <div>
                <p className="birth-info-label">Coordinates:</p>
                <p className="birth-info-value">
                  Lat: {chart.birthData.latitude}, Long: {chart.birthData.longitude}
                </p>
              </div>
            </div>
          </div>
          
          <div className="ascendant-container">
            <h3 className="ascendant-title">
              Ascendant (Lagna)
            </h3>
            <div className="ascendant-content">
              <p className="ascendant-sign">
                {chart.ascendant.sign} ({chart.ascendant.sanskrit})
              </p>
              <p className="ascendant-details">
                Degree: {chart.ascendant.degree}°
              </p>
              <p className="ascendant-details">
                Ruler: {chart.ascendant.ruler}
              </p>
              <p className="ascendant-details">
                Nakshatra: {chart.ascendant.nakshatra} (Pada {chart.ascendant.pada})
              </p>
              <p className="ascendant-details">
                Nakshatra Ruler: {chart.ascendant.nakshatraRuler}
              </p>
            </div>
          </div>

          <div className="planets-container">
            <h3 className="planets-title">Planetary Positions</h3>
            <div className="planets-grid">
              {Object.entries(chart.planets).map(([planet, position]) => (
                <div key={planet} className="planet-position">
                  <p className="planet-name">{planet.charAt(0).toUpperCase() + planet.slice(1)}</p>
                  <p className="planet-sign">{position.sign}</p>
                  <p className="planet-degree">{position.degree}°</p>
                  <p className="planet-nakshatra">
                    {position.nakshatra} (Pada {position.pada})
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KundliCalculator; 