export interface Drone {
  id: string;
  position: [number, number];
  from: string;
  to: string;
  payload: string[];
  status: 'in-flight' | 'loading' | 'delivering';
  estimatedArrival: string;
}

export const activeDrones: Drone[] = [
  {
    id: 'drone-001',
    position: [-16.8500, 145.7000],
    from: 'Cairns Base Hospital',
    to: 'Cooktown Hospital',
    payload: ['Insulin Pens (x10)', 'Blood Glucose Strips (x50)', 'Emergency Health Supplies'],
    status: 'in-flight',
    estimatedArrival: '2:30 PM'
  },
  {
    id: 'drone-002',
    position: [-16.9500, 145.8200],
    from: 'Mareeba Hospital',
    to: 'Tiwi Islands Health Centre',
    payload: ['COVID-19 Vaccines (x20)', 'Antiseptic Supplies', 'Digital Thermometers (x5)'],
    status: 'in-flight',
    estimatedArrival: '3:15 PM'
  },
  {
    id: 'drone-003',
    position: [-16.7800, 145.6500],
    from: 'Atherton Hospital',
    to: 'Cape York Health Centre',
    payload: ['Blood Pressure Monitors (x3)', 'Mental Health Supplies', 'First Aid Kits (x8)'],
    status: 'in-flight',
    estimatedArrival: '4:00 PM'
  }
];
