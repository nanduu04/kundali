// Constants for Vedic Astrology
const AYANAMSA = 23.85; // Lahiri Ayanamsa
const SIGNS = [
  { name: 'Aries', sanskrit: 'Mesha', element: 'Fire', ruler: 'Mars' },
  { name: 'Taurus', sanskrit: 'Vrishabha', element: 'Earth', ruler: 'Venus' },
  { name: 'Gemini', sanskrit: 'Mithuna', element: 'Air', ruler: 'Mercury' },
  { name: 'Cancer', sanskrit: 'Karka', element: 'Water', ruler: 'Moon' },
  { name: 'Leo', sanskrit: 'Simha', element: 'Fire', ruler: 'Sun' },
  { name: 'Virgo', sanskrit: 'Kanya', element: 'Earth', ruler: 'Mercury' },
  { name: 'Libra', sanskrit: 'Tula', element: 'Air', ruler: 'Venus' },
  { name: 'Scorpio', sanskrit: 'Vrishchika', element: 'Water', ruler: 'Mars' },
  { name: 'Sagittarius', sanskrit: 'Dhanu', element: 'Fire', ruler: 'Jupiter' },
  { name: 'Capricorn', sanskrit: 'Makara', element: 'Earth', ruler: 'Saturn' },
  { name: 'Aquarius', sanskrit: 'Kumbha', element: 'Air', ruler: 'Saturn' },
  { name: 'Pisces', sanskrit: 'Meena', element: 'Water', ruler: 'Jupiter' }
];

// Nakshatra information with exact degrees
const NAKSHATRAS = [
  { name: 'Ashwini', ruler: 'Ketu', pada: 4, startDegree: 0 },
  { name: 'Bharani', ruler: 'Venus', pada: 4, startDegree: 13.333333 },
  { name: 'Krittika', ruler: 'Sun', pada: 4, startDegree: 26.666667 },
  { name: 'Rohini', ruler: 'Moon', pada: 4, startDegree: 40 },
  { name: 'Mrigashira', ruler: 'Mars', pada: 4, startDegree: 53.333333 },
  { name: 'Ardra', ruler: 'Rahu', pada: 4, startDegree: 66.666667 },
  { name: 'Punarvasu', ruler: 'Jupiter', pada: 4, startDegree: 80 },
  { name: 'Pushya', ruler: 'Saturn', pada: 4, startDegree: 93.333333 },
  { name: 'Ashlesha', ruler: 'Mercury', pada: 4, startDegree: 106.666667 },
  { name: 'Magha', ruler: 'Ketu', pada: 4, startDegree: 120 },
  { name: 'Purva Phalguni', ruler: 'Venus', pada: 4, startDegree: 133.333333 },
  { name: 'Uttara Phalguni', ruler: 'Sun', pada: 4, startDegree: 146.666667 },
  { name: 'Hasta', ruler: 'Moon', pada: 4, startDegree: 160 },
  { name: 'Chitra', ruler: 'Mars', pada: 4, startDegree: 173.333333 },
  { name: 'Swati', ruler: 'Rahu', pada: 4, startDegree: 186.666667 },
  { name: 'Vishakha', ruler: 'Jupiter', pada: 4, startDegree: 200 },
  { name: 'Anuradha', ruler: 'Saturn', pada: 4, startDegree: 213.333333 },
  { name: 'Jyeshtha', ruler: 'Mercury', pada: 4, startDegree: 226.666667 },
  { name: 'Mula', ruler: 'Ketu', pada: 4, startDegree: 240 },
  { name: 'Purva Ashadha', ruler: 'Venus', pada: 4, startDegree: 253.333333 },
  { name: 'Uttara Ashadha', ruler: 'Sun', pada: 4, startDegree: 266.666667 },
  { name: 'Shravana', ruler: 'Moon', pada: 4, startDegree: 280 },
  { name: 'Dhanishta', ruler: 'Mars', pada: 4, startDegree: 293.333333 },
  { name: 'Shatabhisha', ruler: 'Rahu', pada: 4, startDegree: 306.666667 },
  { name: 'Purva Bhadrapada', ruler: 'Jupiter', pada: 4, startDegree: 320 },
  { name: 'Uttara Bhadrapada', ruler: 'Saturn', pada: 4, startDegree: 333.333333 },
  { name: 'Revati', ruler: 'Mercury', pada: 4, startDegree: 346.666667 }
];

/**
 * Convert date and time to Julian Day
 * @param {string} date - Date in YYYY-MM-DD format
 * @param {string} time - Time in HH:MM format
 * @returns {number} Julian Day
 */
const toJulianDay = (date, time) => {
  const [year, month, day] = date.split('-').map(Number);
  const [hours, minutes] = time.split(':').map(Number);
  
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  
  let jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  
  // Add time of day
  jd += (hours - 12) / 24 + minutes / 1440;
  
  return jd;
};

/**
 * Calculate Local Sidereal Time (LST)
 * @param {number} jd - Julian Day
 * @param {number} longitude - Longitude in degrees
 * @returns {number} LST in degrees
 */
const calculateLST = (jd, longitude) => {
  const T = (jd - 2451545.0) / 36525;
  const theta = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + T * T * (0.000387933 - T / 38710000);
  const lst = (theta + longitude) % 360;
  return lst < 0 ? lst + 360 : lst;
};

/**
 * Find Nakshatra and Pada for a given degree
 * @param {number} degree - Degree in zodiac (0-360)
 * @returns {Object} Nakshatra and Pada information
 */
const findNakshatra = (degree) => {
  const nakshatraIndex = NAKSHATRAS.findIndex(n => n.startDegree > degree) - 1;
  const nakshatra = NAKSHATRAS[nakshatraIndex >= 0 ? nakshatraIndex : NAKSHATRAS.length - 1];
  const pada = Math.floor((degree - nakshatra.startDegree) / (360 / 27 / 4)) + 1;
  
  return {
    name: nakshatra.name,
    pada: pada,
    ruler: nakshatra.ruler
  };
};

/**
 * Calculate Ascendant (Lagna)
 * @param {string} date - Date in YYYY-MM-DD format
 * @param {string} time - Time in HH:MM format
 * @param {number} latitude - Latitude in degrees
 * @param {number} longitude - Longitude in degrees
 * @returns {Object} Ascendant details
 */
export const calculateAscendant = (date, time, latitude, longitude) => {
  console.log('Calculating ascendant with:', { date, time, latitude, longitude });

  // Basic validation
  if (!date || !time || isNaN(latitude) || isNaN(longitude)) {
    console.error('Invalid input parameters:', { date, time, latitude, longitude });
    throw new Error('Invalid input parameters. Please check your birth details.');
  }

  try {
    const jd = toJulianDay(date, time);
    console.log('Julian Day:', jd);

    const lst = calculateLST(jd, longitude);
    console.log('Local Sidereal Time:', lst);

    // Convert to radians
    const lstRad = lst * Math.PI / 180;
    const latRad = latitude * Math.PI / 180;
    const epsRad = 23.43929111 * Math.PI / 180; // Fixed obliquity for 2000 epoch

    // Calculate ascendant
    const y = Math.cos(epsRad) * Math.sin(lstRad);
    const x = Math.cos(lstRad) * Math.cos(latRad) - Math.sin(epsRad) * Math.sin(latRad);
    let ascendant = Math.atan2(y, x) * 180 / Math.PI;

    console.log('Raw ascendant calculation:', { y, x, ascendant });

    // Normalize and apply Ayanamsa
    ascendant = (ascendant - AYANAMSA + 360) % 360;
    console.log('Ascendant after Ayanamsa:', ascendant);

    const signIndex = Math.floor(ascendant / 30);
    const degree = ascendant % 30;
    const nakshatraInfo = findNakshatra(ascendant);

    const result = {
      sign: SIGNS[signIndex].name,
      sanskrit: SIGNS[signIndex].sanskrit,
      degree: parseFloat(degree.toFixed(2)),
      ruler: SIGNS[signIndex].ruler,
      nakshatra: nakshatraInfo.name,
      pada: nakshatraInfo.pada,
      nakshatraRuler: nakshatraInfo.ruler
    };

    console.log('Final ascendant result:', result);
    return result;
  } catch (error) {
    console.error('Error in calculateAscendant:', error);
    throw new Error('Error calculating ascendant. Please check your birth details.');
  }
};

/**
 * Calculate planetary positions
 * @param {string} date - Date in YYYY-MM-DD format
 * @param {string} time - Time in HH:MM format
 * @returns {Object} Planetary positions
 */
export const calculatePlanetaryPositions = (date, time) => {
  // This is a placeholder - in a real implementation, you would use an ephemeris library
  // like Swiss Ephemeris to calculate accurate planetary positions
  return {
    sun: { sign: 'Scorpio', degree: 17.5, nakshatra: 'Jyeshtha', pada: 3 },
    moon: { sign: 'Libra', degree: 12.3, nakshatra: 'Swati', pada: 2 },
    mars: { sign: 'Capricorn', degree: 5.7, nakshatra: 'Uttara Ashadha', pada: 1 },
    mercury: { sign: 'Scorpio', degree: 20.1, nakshatra: 'Jyeshtha', pada: 4 },
    jupiter: { sign: 'Pisces', degree: 8.9, nakshatra: 'Revati', pada: 2 },
    venus: { sign: 'Libra', degree: 15.2, nakshatra: 'Swati', pada: 3 },
    saturn: { sign: 'Aries', degree: 3.4, nakshatra: 'Ashwini', pada: 2 },
    rahu: { sign: 'Cancer', degree: 10.5, nakshatra: 'Pushya', pada: 1 },
    ketu: { sign: 'Capricorn', degree: 10.5, nakshatra: 'Pushya', pada: 3 }
  };
}; 