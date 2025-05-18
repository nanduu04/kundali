import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import KundliCalculator from '../KundliCalculator';
import { calculateAscendant } from '../utils/astrologyCalculations';

// Mock the fetch for location search
global.fetch = jest.fn();

describe('KundliCalculator', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('Form Validation', () => {
    test('should show error when required fields are empty', async () => {
      render(<KundliCalculator />);
      
      const submitButton = screen.getByRole('button', { name: /Generate Vedic Kundli/i });
      await act(async () => {
        fireEvent.click(submitButton);
      });
      
      const errorMessage = await screen.findByText(/Please fill in all required fields/i);
      expect(errorMessage).toBeInTheDocument();
    });

    test('should accept valid form data', async () => {
      render(<KundliCalculator />);
      
      await act(async () => {
        // Fill in the form
        fireEvent.change(screen.getByLabelText(/Full Name/i), {
          target: { value: 'John Doe' }
        });
        
        fireEvent.change(screen.getByLabelText(/Birth Date/i), {
          target: { value: '1998-12-03' }
        });
        
        fireEvent.change(screen.getByLabelText(/Birth Time/i), {
          target: { value: '11:50' }
        });
        
        fireEvent.change(screen.getByLabelText(/Birth Place/i), {
          target: { value: 'Kathmandu' }
        });
      });
      
      const submitButton = screen.getByRole('button', { name: /Generate Vedic Kundli/i });
      await act(async () => {
        fireEvent.click(submitButton);
      });
      
      // Check if loading state is shown
      expect(screen.getByText(/Calculating Your Kundli/i)).toBeInTheDocument();
    });
  });

  describe('Location Search', () => {
    test('should fetch location suggestions for Kathmandu', async () => {
      const mockLocations = [
        {
          display_name: 'Kathmandu, Central Region, Nepal',
          lat: '27.7172',
          lon: '85.3240'
        }
      ];
      
      fetch.mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockLocations)
        })
      );

      render(<KundliCalculator />);
      
      const locationInput = screen.getByLabelText(/Birth Place/i);
      await act(async () => {
        fireEvent.change(locationInput, {
          target: { value: 'Kathmandu' }
        });
      });
      
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
          expect.stringContaining('nominatim.openstreetmap.org/search'),
          expect.any(Object)
        );
      });
    });
  });

  describe('Astrological Calculations', () => {
    test('should calculate ascendant correctly for Kathmandu birth details', () => {
      const testCases = [
        {
          date: '1998-12-03',
          time: '11:50',
          latitude: 27.7172,
          longitude: 85.3240,
          expectedSign: 'Libra',
          expectedDegree: 15.5,
          expectedNakshatra: 'Swati',
          expectedPada: 2,
          description: 'Kathmandu birth chart example'
        }
      ];

      testCases.forEach(({ 
        date, 
        time, 
        latitude, 
        longitude, 
        expectedSign, 
        expectedDegree, 
        expectedNakshatra,
        expectedPada,
        description 
      }) => {
        const result = calculateAscendant(date, time, latitude, longitude);
        console.log(`Test case: ${description}`);
        console.log(`Calculated: ${result.sign} ${result.degree}° ${result.nakshatra} Pada ${result.pada}`);
        console.log(`Expected: ${expectedSign} ${expectedDegree}° ${expectedNakshatra} Pada ${expectedPada}`);
        
        expect(result.sign).toBe(expectedSign);
        expect(result.degree).toBeCloseTo(expectedDegree, 1);
        expect(result.nakshatra).toBe(expectedNakshatra);
        expect(result.pada).toBe(expectedPada);
      });
    });

    test('should handle edge cases in calculations', () => {
      const edgeCases = [
        {
          date: '1998-12-03',
          time: '00:00',
          latitude: 27.7172,
          longitude: 85.3240,
          description: 'Midnight birth'
        },
        {
          date: '1998-12-03',
          time: '12:00',
          latitude: 27.7172,
          longitude: 85.3240,
          description: 'Noon birth'
        },
        {
          date: '1998-12-03',
          time: '11:50',
          latitude: 0,
          longitude: 0,
          description: 'Equator and Prime Meridian'
        }
      ];

      edgeCases.forEach(({ date, time, latitude, longitude, description }) => {
        const result = calculateAscendant(date, time, latitude, longitude);
        console.log(`Edge case: ${description}`);
        console.log(`Result: ${result.sign} ${result.degree}° ${result.nakshatra} Pada ${result.pada}`);
        
        // Basic validation
        expect(result.sign).toBeDefined();
        expect(result.degree).toBeGreaterThanOrEqual(0);
        expect(result.degree).toBeLessThan(30);
        expect(result.sanskrit).toBeDefined();
        expect(result.ruler).toBeDefined();
        expect(result.nakshatra).toBeDefined();
        expect(result.pada).toBeGreaterThanOrEqual(1);
        expect(result.pada).toBeLessThanOrEqual(4);
        expect(result.nakshatraRuler).toBeDefined();
      });
    });

    test('should handle invalid inputs gracefully', () => {
      const invalidCases = [
        {
          date: 'invalid-date',
          time: '11:50',
          latitude: 27.7172,
          longitude: 85.3240,
          description: 'Invalid date'
        },
        {
          date: '1998-12-03',
          time: 'invalid-time',
          latitude: 27.7172,
          longitude: 85.3240,
          description: 'Invalid time'
        },
        {
          date: '1998-12-03',
          time: '11:50',
          latitude: 'invalid',
          longitude: 85.3240,
          description: 'Invalid latitude'
        }
      ];

      invalidCases.forEach(({ date, time, latitude, longitude, description }) => {
        expect(() => {
          calculateAscendant(date, time, latitude, longitude);
        }).toThrow();
      });
    });
  });
}); 