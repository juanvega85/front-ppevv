import mockedSuggestions from './googlePlacesSuggestions.mock';

export const getMockGooogleMaps = (type = 'success', data = mockedSuggestions): any => ({
  maps: {
    Geocoder: class {
      public async geocode(_: any, callback: (_: any, status: string) => void) {
        return callback(
          Promise.resolve([
            {
              address_components: [
                { long_name: '7640', short_name: '7640', types: ['street_number'] },
                { long_name: 'Lolco', short_name: 'Lolco', types: ['route'] },
                { long_name: 'Las Condes', short_name: 'Las Condes', types: ['locality', 'political'] },
                { long_name: 'Las Condes', short_name: 'Las Condes', types: ['administrative_area_level_3', 'political'] },
                { long_name: 'Santiago', short_name: 'Santiago', types: ['administrative_area_level_2', 'political'] },
                { long_name: 'Región Metropolitana', short_name: 'Región Metropolitana', types: ['administrative_area_level_1', 'political'] },
                { long_name: 'Chile', short_name: 'CL', types: ['country', 'political'] },
              ],
              formatted_address: 'Lolco 7640, Las Condes, Región Metropolitana, Chile',
              geometry: {
                location: { lat: -33.426447, lng: -70.5535254 },
                location_type: 'ROOFTOP',
                viewport: { south: -33.4279496302915, west: -70.55486933029151, north: -33.4252516697085, east: -70.5521713697085 },
              },
              partial_match: true,
              place_id: 'ChIJz4IqWPTOYpYRY9CKk0wV-54',
              plus_code: { compound_code: 'HCFW+CH Las Condes, Chile', global_code: '47RFHCFW+CH' },
              types: ['establishment', 'point_of_interest'],
            },
          ]),
          'OK'
        );
      }
    },
    places: {
      AutocompleteService: class {
        getPlacePredictions = (_: any, callback: (_: any, status: string) => void) => {
          setTimeout(() => {
            callback(type === 'success' ? data : null, type === 'success' ? 'OK' : 'ERROR');
          }, 100);
        };
      },
    },
  },
});
