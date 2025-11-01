# First Nations Health Services App

A responsive web-based mobile application for finding culturally appropriate health services in Far North Queensland, built with React, TypeScript, and Leaflet mapping.

## ✅ Build Complete

The application has been fully implemented in the `health-team-project/` directory with all requested features:

### 🗺️ Features Implemented
- **Interactive map** centered on Cairns with geolocation support
- **First Nations Country boundaries** overlaid with mock GeoJSON data (4 territories: Yidinji, Gimuy Walubara Yidinji, Djabugay, Buluwai)
- **Health services markers** showing Western, traditional, and community health options (16 real services from Apunipima and Queensland Health)
- **Service detail modals** with comprehensive information and cultural appropriateness indicators
- **Resource request form** with mock submission functionality
- **Fully responsive design** optimized for mobile devices

### 🛠️ Technical Stack
- **React 18 + TypeScript** for type safety and modern development
- **Vite** for fast development and building
- **Leaflet + React-Leaflet** for interactive mapping
- **Custom CSS** with mobile-first responsive design
- **Mock data structure** easily replaceable with real services

### 📱 Mobile Optimization
- Touch-friendly interface elements
- Responsive map that adapts to screen size (70vh on desktop, 50vh on mobile)
- Mobile-optimized forms and modals
- Professional styling with cultural sensitivity

### 🏥 Health Services Data
- **16 real health services** from Apunipima Cape York Health Council and Queensland Health
- **Primary Health Care Centres**: 10 centres across Cape York region
- **Wellbeing Centres**: 4 centres focusing on mental health and community wellness
- **Additional services**: Cairns Hospital and traditional healing centres
- **3 service types**: Traditional healing, Community health, Western medicine
- Contact information, opening hours, and service details
- Cultural appropriateness indicators

## 🚀 Getting Started

```bash
cd health-team-project
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

## 📋 Project Structure

```
health-team-project/
├── src/
│   ├── components/
│   │   ├── MapComponent.tsx          # Main interactive map
│   │   ├── ServiceDetailModal.tsx    # Health service details popup
│   │   └── ResourceRequestForm.tsx   # Resource request form
│   ├── data/
│   │   ├── firstNationsBoundaries.ts # Mock GeoJSON boundary data
│   │   └── healthServices.ts         # Mock health services data
│   ├── App.tsx                       # Main application component
│   └── App.css                       # Responsive styles
├── TODO.md                           # Detailed implementation plan
└── package.json                      # Dependencies and scripts
```

## 🎯 Key Features

1. **Geolocation Support**: Browser-based location detection with fallback
2. **Territory Recognition**: Click on map boundaries to identify First Nations Country
3. **Service Discovery**: Visual markers for different types of health services
4. **Cultural Sensitivity**: Indicators for culturally appropriate care
5. **Resource Requests**: Form system for requesting additional health resources
6. **Mobile-First**: Optimized for mobile devices and touch interfaces

## 📝 Next Steps for Production

See `TODO.md` for detailed next steps including:
- Integration with real First Nations boundary data
- Connection to actual health service databases
- Backend API for resource requests
- Enhanced accessibility features
- Multi-language support

**Real Apunipima health centre data** has been integrated from health-centres.md. First Nations boundary data is structured for easy replacement with real boundaries.

The basic react has already been created with vite, start making changes from there.