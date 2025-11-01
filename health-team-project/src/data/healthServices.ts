// Health services data for Far North Queensland region
// Includes Apunipima Cape York Health Council centres and other health services

export interface HealthService {
  id: string;
  name: string;
  type: 'western' | 'traditional' | 'community';
  description: string;
  address: string;
  phone?: string;
  website?: string;
  services: string[];
  coordinates: [number, number]; // [lng, lat]
  territoryId: string;
  openingHours?: string;
  culturallyAppropriate: boolean;
}

export const healthServices: HealthService[] = [
  // Apunipima Cape York Health Council Head Office
  {
    id: "apunipima-head-office",
    name: "Apunipima Cape York Health Council (Head Office)",
    type: "community",
    description: "Aboriginal community controlled health service providing culturally appropriate care across Cape York",
    address: "186 McCoombe Street, Bungalow, Cairns QLD 4870",
    phone: "07 4037 7100",
    website: "https://www.apunipima.org.au",
    services: ["Primary Health Care", "Mental Health", "Chronic Disease Management", "Cultural Healing", "Community Programs"],
    coordinates: [145.7456, -16.9203],
    territoryId: "yidinji",
    openingHours: "Mon-Fri 8:00-17:00",
    culturallyAppropriate: true
  },

  // Atharpuch Family Health Centre (Kowanyama)
  {
    id: "atharpuch-kowanyama",
    name: "Atharpuch Family Health Centre (Kowanyama)",
    type: "community",
    description: "Family-focused health centre serving the Kowanyama community",
    address: "Chellikee Street, Kowanyama QLD 4892",
    phone: "07 4037 7340",
    services: ["Primary Health Care", "Family Health", "Maternal Health", "Child Health", "Chronic Disease Management"],
    coordinates: [141.7500, -15.4833],
    territoryId: "djabugay",
    openingHours: "Mon-Fri 8:00-17:00",
    culturallyAppropriate: true
  },

  // Aurukun Health Care Centre
  {
    id: "aurukun-health-centre",
    name: "Aurukun Health Care Centre",
    type: "community",
    description: "Comprehensive health care centre serving the Aurukun community",
    address: "Kang Kang Road, Aurukun QLD 4892",
    phone: "07 4037 7300",
    services: ["Primary Health Care", "Emergency Care", "Mental Health", "Chronic Disease Management", "Community Health"],
    coordinates: [141.7167, -13.3500],
    territoryId: "djabugay",
    openingHours: "Mon-Fri 8:00-17:00, Emergency 24/7",
    culturallyAppropriate: true
  },

  // Charkil Om Primary Health Care Centre (Napranum)
  {
    id: "charkil-om-napranum",
    name: "Charkil Om Primary Health Care Centre (Napranum)",
    type: "community",
    description: "Primary health care centre serving the Napranum community near Weipa",
    address: "412 Moun Ding Street, Napranum QLD 4874",
    phone: "07 4037 7390",
    services: ["Primary Health Care", "Community Health", "Chronic Disease Management", "Health Promotion"],
    coordinates: [141.8833, -12.6667],
    territoryId: "djabugay",
    openingHours: "Mon-Fri 8:00-17:00",
    culturallyAppropriate: true
  },

  // Coen Health Care Centre
  {
    id: "coen-health-centre",
    name: "Coen Health Care Centre",
    type: "community",
    description: "Health care centre serving the Coen community in Cape York",
    address: "38 Regent St, Coen QLD 4871",
    phone: "07 4037 7310",
    services: ["Primary Health Care", "Emergency Care", "Community Health", "Chronic Disease Management"],
    coordinates: [143.2000, -13.9500],
    territoryId: "djabugay",
    openingHours: "Mon-Fri 8:00-17:00",
    culturallyAppropriate: true
  },

  // Laura Primary Health Care Centre
  {
    id: "laura-health-centre",
    name: "Laura Primary Health Care Centre",
    type: "western",
    description: "Queensland Health primary health care centre serving Laura community",
    address: "1 Gladwell Street, Laura QLD 4871",
    phone: "07 4060 3320",
    services: ["Primary Health Care", "General Practice", "Community Health"],
    coordinates: [144.4333, -15.5167],
    territoryId: "djabugay",
    openingHours: "Mon-Fri 8:00-17:00",
    culturallyAppropriate: true
  },

  // Lockhart River Primary Health Care Centre
  {
    id: "lockhart-river-health-centre",
    name: "Lockhart River Primary Health Care Centre",
    type: "western",
    description: "Queensland Health primary health care centre serving Lockhart River community",
    address: "2 Paytam Street, Lockhart River QLD 4892",
    phone: "07 4060 7155",
    services: ["Primary Health Care", "General Practice", "Community Health", "Emergency Care"],
    coordinates: [143.3000, -12.7833],
    territoryId: "djabugay",
    openingHours: "Mon-Fri 8:00-17:00",
    culturallyAppropriate: true
  },

  // Thimithi-Nhii Primary Health Care Centre (Mapoon)
  {
    id: "thimithi-nhii-mapoon",
    name: "Thimithi-Nhii Primary Health Care Centre (Mapoon)",
    type: "community",
    description: "Primary health care centre serving the Mapoon community",
    address: "5 Hudson Street, Mapoon QLD 4874",
    phone: "07 4037 7370",
    services: ["Primary Health Care", "Community Health", "Chronic Disease Management", "Health Promotion"],
    coordinates: [142.0000, -12.0000],
    territoryId: "djabugay",
    openingHours: "Mon-Fri 8:00-17:00",
    culturallyAppropriate: true
  },

  // Mossman Gorge Primary Health Care Centre
  {
    id: "mossman-gorge-health-centre",
    name: "Mossman Gorge Primary Health Care Centre",
    type: "community",
    description: "Primary health care centre serving the Mossman Gorge community",
    address: "4 Kankarr Street, Mossman Gorge QLD 4873",
    phone: "07 4037 7380",
    services: ["Primary Health Care", "Community Health", "Cultural Health Programs", "Family Health"],
    coordinates: [145.3333, -16.4667],
    territoryId: "djabugay",
    openingHours: "Mon-Fri 8:00-17:00",
    culturallyAppropriate: true
  },

  // Wujal Wujal Primary Health Care Centre
  {
    id: "wujal-wujal-health-centre",
    name: "Wujal Wujal Primary Health Care Centre",
    type: "western",
    description: "Queensland Health primary health care centre serving Wujal Wujal community",
    address: "115 Douglas Street, Wujal Wujal QLD 4895",
    phone: "07 4083 9000",
    services: ["Primary Health Care", "General Practice", "Community Health", "Emergency Care"],
    coordinates: [145.2833, -16.1167],
    territoryId: "djabugay",
    openingHours: "Mon-Fri 8:00-17:00",
    culturallyAppropriate: true
  },

  // Wellbeing Centres
  {
    id: "aurukun-wellbeing-centre",
    name: "Aurukun Wellbeing Centre",
    type: "community",
    description: "Wellbeing centre focusing on mental health and community wellness",
    address: "39 Kang Kang Road, Aurukun QLD 4892",
    phone: "07 4037 7363",
    services: ["Mental Health", "Counselling", "Community Wellness", "Cultural Support", "Social Services"],
    coordinates: [141.7167, -13.3500],
    territoryId: "djabugay",
    openingHours: "Mon-Fri 8:00-17:00",
    culturallyAppropriate: true
  },

  {
    id: "coen-wellbeing-centre",
    name: "Coen Wellbeing Centre",
    type: "community",
    description: "Wellbeing centre providing mental health and social support services",
    address: "31 Taylor Street, Coen QLD 4871",
    phone: "07 4037 7470",
    services: ["Mental Health", "Counselling", "Social Support", "Community Programs", "Cultural Healing"],
    coordinates: [143.2000, -13.9500],
    territoryId: "djabugay",
    openingHours: "Mon-Fri 8:00-17:00",
    culturallyAppropriate: true
  },

  {
    id: "hope-vale-wellbeing-centre",
    name: "Hope Vale Wellbeing Centre",
    type: "community",
    description: "Wellbeing centre serving the Hope Vale community with mental health services",
    address: "1 Thupi Street, Hope Vale QLD 4895",
    phone: "07 4037 7600",
    services: ["Mental Health", "Counselling", "Community Wellness", "Family Support", "Cultural Programs"],
    coordinates: [145.1167, -15.2833],
    territoryId: "djabugay",
    openingHours: "Mon-Fri 8:00-17:00",
    culturallyAppropriate: true
  },

  {
    id: "mossman-gorge-wellbeing-centre",
    name: "Mossman Gorge Wellbeing Centre",
    type: "community",
    description: "Wellbeing centre providing mental health and cultural support services",
    address: "Lot 15 Kankarr Street, Mossman Gorge QLD 4873",
    phone: "07 4037 7434",
    services: ["Mental Health", "Counselling", "Cultural Support", "Community Wellness", "Traditional Healing"],
    coordinates: [145.3333, -16.4667],
    territoryId: "djabugay",
    openingHours: "Mon-Fri 8:00-17:00",
    culturallyAppropriate: true
  },

  // Additional services in Cairns area
  {
    id: "cairns-hospital",
    name: "Cairns Hospital",
    type: "western",
    description: "Major public hospital providing comprehensive medical services",
    address: "165 The Esplanade, Cairns City QLD 4870",
    phone: "(07) 4226 0000",
    website: "https://www.health.qld.gov.au/cairns-hinterland",
    services: ["Emergency", "Surgery", "Maternity", "Mental Health", "Specialist Care"],
    coordinates: [145.7781, -16.9186],
    territoryId: "yidinji",
    openingHours: "24/7",
    culturallyAppropriate: true
  },

  {
    id: "traditional-healing-yidinji",
    name: "Yidinji Traditional Healing Circle",
    type: "traditional",
    description: "Traditional Aboriginal healing practices and bush medicine",
    address: "Community Centre, Kuranda QLD 4881",
    services: ["Bush Medicine", "Spiritual Healing", "Cultural Counselling", "Smoking Ceremonies"],
    coordinates: [145.6378, -16.8167],
    territoryId: "yidinji",
    openingHours: "By appointment",
    culturallyAppropriate: true
  }
];

export const getHealthServicesByTerritory = (territoryId: string): HealthService[] => {
  return healthServices.filter(service => service.territoryId === territoryId);
};

export const getHealthServiceById = (serviceId: string): HealthService | undefined => {
  return healthServices.find(service => service.id === serviceId);
};
