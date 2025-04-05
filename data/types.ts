// Add project location type
export type ProjectLocation = {
  id: number;
  projectId: string; // Format: FO-[CITY_CODE]-[NUMBER]
  name: string;
  location: string;
  status: 'Selesai' | 'Pada Jadwal' | 'Terlambat' | 'Belum Dimulai';
  position: [number, number]; // [latitude, longitude]
  isDocumented: boolean; // Boolean to indicate if project is documented
  category: 'backbone' | 'distribution' | 'access' | 'maintenance'; // Type of fiber installation
};