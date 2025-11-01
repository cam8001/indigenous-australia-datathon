export interface HealthSupply {
  id: string;
  name: string;
  category: string;
}

export interface SupplyCategory {
  id: string;
  name: string;
  supplies: HealthSupply[];
}

export interface CartItem {
  supply: HealthSupply;
  quantity: number;
}

export const supplyCategories: SupplyCategory[] = [
  {
    id: 'diabetes',
    name: 'Diabetes',
    supplies: [
      { id: 'glucose-strips', name: 'Blood Glucose Strips', category: 'diabetes' },
      { id: 'insulin', name: 'Insulin Pens', category: 'diabetes' },
      { id: 'lancets', name: 'Lancets', category: 'diabetes' },
      { id: 'glucose-meter', name: 'Glucose Meter', category: 'diabetes' },
    ]
  },
  {
    id: 'mental-health',
    name: 'Mental Health',
    supplies: [
      { id: 'anxiety-meds', name: 'Anxiety Medication', category: 'mental-health' },
      { id: 'depression-meds', name: 'Depression Medication', category: 'mental-health' },
      { id: 'counseling-materials', name: 'Counseling Materials', category: 'mental-health' },
    ]
  },
  {
    id: 'hypertension',
    name: 'Hypertension',
    supplies: [
      { id: 'bp-monitor', name: 'Blood Pressure Monitor', category: 'hypertension' },
      { id: 'bp-medication', name: 'Blood Pressure Medication', category: 'hypertension' },
      { id: 'sodium-test', name: 'Sodium Test Strips', category: 'hypertension' },
    ]
  },
  {
    id: 'first-aid',
    name: 'First Aid',
    supplies: [
      { id: 'antiseptic-wipes', name: 'Antiseptic Wipes', category: 'first-aid' },
      { id: 'bandages', name: 'Bandages', category: 'first-aid' },
      { id: 'gauze', name: 'Gauze Pads', category: 'first-aid' },
      { id: 'thermometer', name: 'Digital Thermometer', category: 'first-aid' },
    ]
  }
];
