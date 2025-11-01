// Mock First Nations boundaries data for Cairns region
// This is placeholder data that can be easily replaced with real boundary data

export interface FirstNationsTerritory {
  id: string;
  name: string;
  description: string;
  language?: string;
}

export const firstNationsBoundaries = {
  "type": "FeatureCollection" as const,
  "features": [
    {
      "type": "Feature" as const,
      "id": "yidinji",
      "properties": {
        "id": "yidinji",
        "name": "Yidinji Country",
        "description": "Traditional owners of the Cairns region, including the coastal areas and rainforest.",
        "language": "Yidinji"
      },
      "geometry": {
        "type": "Polygon" as const,
        "coordinates": [[
          [145.7000, -16.8500],
          [145.8000, -16.8500],
          [145.8000, -16.9500],
          [145.7000, -16.9500],
          [145.7000, -16.8500]
        ]]
      }
    },
    {
      "type": "Feature" as const,
      "id": "gimuy-walubara-yidinji",
      "properties": {
        "id": "gimuy-walubara-yidinji",
        "name": "Gimuy Walubara Yidinji Country",
        "description": "Rainforest people of the Cairns highlands and tablelands.",
        "language": "Yidinji"
      },
      "geometry": {
        "type": "Polygon" as const,
        "coordinates": [[
          [145.6000, -16.8000],
          [145.7000, -16.8000],
          [145.7000, -16.8500],
          [145.6000, -16.8500],
          [145.6000, -16.8000]
        ]]
      }
    },
    {
      "type": "Feature" as const,
      "id": "djabugay",
      "properties": {
        "id": "djabugay",
        "name": "Djabugay Country",
        "description": "Traditional owners of the Port Douglas and northern beaches region.",
        "language": "Djabugay"
      },
      "geometry": {
        "type": "Polygon" as const,
        "coordinates": [[
          [145.4000, -16.4000],
          [145.6000, -16.4000],
          [145.6000, -16.6000],
          [145.4000, -16.6000],
          [145.4000, -16.4000]
        ]]
      }
    },
    {
      "type": "Feature" as const,
      "id": "buluwai",
      "properties": {
        "id": "buluwai",
        "name": "Buluwai Country",
        "description": "Traditional owners of the southern Cairns region and Mission Beach area.",
        "language": "Buluwai"
      },
      "geometry": {
        "type": "Polygon" as const,
        "coordinates": [[
          [145.8000, -17.0000],
          [146.0000, -17.0000],
          [146.0000, -17.2000],
          [145.8000, -17.2000],
          [145.8000, -17.0000]
        ]]
      }
    }
  ]
};

export const getFirstNationsTerritory = (territoryId: string): FirstNationsTerritory | undefined => {
  const feature = firstNationsBoundaries.features.find(f => f.properties.id === territoryId);
  return feature ? feature.properties as FirstNationsTerritory : undefined;
};
