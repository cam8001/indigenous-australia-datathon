export interface Region {
  id: string;
  name: string;
  communities: Community[];
}

export interface Community {
  id: string;
  name: string;
  regionId: string;
}

export interface User {
  region: string;
  community: string;
  username: string;
}

export const regions: Region[] = [
  {
    id: 'nt',
    name: 'Northern Territory',
    communities: [
      { id: 'tiwi', name: 'Tiwi Islands', regionId: 'nt' },
      { id: 'arnhem', name: 'Arnhem Land', regionId: 'nt' },
      { id: 'alice', name: 'Alice Springs', regionId: 'nt' },
    ]
  },
  {
    id: 'qld',
    name: 'Queensland',
    communities: [
      { id: 'cape-york', name: 'Cape York', regionId: 'qld' },
      { id: 'torres', name: 'Torres Strait', regionId: 'qld' },
      { id: 'cairns', name: 'Cairns', regionId: 'qld' },
    ]
  },
  {
    id: 'wa',
    name: 'Western Australia',
    communities: [
      { id: 'kimberley', name: 'Kimberley', regionId: 'wa' },
      { id: 'pilbara', name: 'Pilbara', regionId: 'wa' },
      { id: 'perth', name: 'Perth Metro', regionId: 'wa' },
    ]
  },
  {
    id: 'nsw',
    name: 'New South Wales',
    communities: [
      { id: 'sydney', name: 'Sydney Metro', regionId: 'nsw' },
      { id: 'hunter', name: 'Hunter Valley', regionId: 'nsw' },
      { id: 'riverina', name: 'Riverina', regionId: 'nsw' },
    ]
  }
];
