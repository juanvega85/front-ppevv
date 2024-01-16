export interface IAddress {
  description: string;
  formattedAddress: string;
  streetNumber?: string;
  route?: string;
  unit?: string;
  locality: string;
  city?: string;
  postalCode?: string;
  region?: string;
  country: string;
  coordinates: {
    lat: string;
    lng: string;
  };
}
