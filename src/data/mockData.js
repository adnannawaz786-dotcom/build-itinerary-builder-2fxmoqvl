// Mock data for cyberpunk-themed itinerary builder
export const cyberpunkCities = [
  {
    id: 'neo-tokyo',
    name: 'Neo Tokyo',
    country: 'Japan',
    description: 'The neon-lit metropolis of the future',
    image: '/images/neo-tokyo.jpg',
    coordinates: { lat: 35.6762, lng: 139.6503 }
  },
  {
    id: 'night-city',
    name: 'Night City',
    country: 'NUSA',
    description: 'The city of dreams and nightmares',
    image: '/images/night-city.jpg',
    coordinates: { lat: 34.0522, lng: -118.2437 }
  },
  {
    id: 'hong-kong-2077',
    name: 'Hong Kong 2077',
    country: 'China',
    description: 'Where tradition meets technology',
    image: '/images/hong-kong-2077.jpg',
    coordinates: { lat: 22.3193, lng: 114.1694 }
  },
  {
    id: 'neo-seoul',
    name: 'Neo Seoul',
    country: 'South Korea',
    description: 'The augmented reality capital',
    image: '/images/neo-seoul.jpg',
    coordinates: { lat: 37.5665, lng: 126.9780 }
  }
];

export const cyberpunkAttractions = [
  // Neo Tokyo attractions
  {
    id: 'shibuya-nexus',
    name: 'Shibuya Nexus',
    category: 'entertainment',
    destination: 'neo-tokyo',
    description: 'Massive holographic advertising district with neural interface shopping',
    duration: 180,
    price: 2500,
    rating: 4.8,
    cyberpunkLevel: 'high',
    tags: ['holo-ads', 'neural-shopping', 'neon-district']
  },
  {
    id: 'akihabara-cyber-market',
    name: 'Akihabara Cyber Market',
    category: 'shopping',
    destination: 'neo-tokyo',
    description: 'Underground tech market for cybernetic enhancements and illegal software',
    duration: 240,
    price: 1800,
    rating: 4.6,
    cyberpunkLevel: 'extreme',
    tags: ['black-market', 'cybernetics', 'illegal-tech']
  },
  {
    id: 'tokyo-tower-data-center',
    name: 'Tokyo Tower Data Center',
    category: 'sightseeing',
    destination: 'neo-tokyo',
    description: 'Massive server farm disguised as a tourist attraction',
    duration: 120,
    price: 3200,
    rating: 4.4,
    cyberpunkLevel: 'medium',
    tags: ['data-fortress', 'corporate', 'surveillance']
  },
  // Night City attractions
  {
    id: 'corpo-plaza',
    name: 'Corpo Plaza',
    category: 'sightseeing',
    destination: 'night-city',
    description: 'Towering corporate headquarters with armed security and luxury shops',
    duration: 150,
    price: 4500,
    rating: 4.2,
    cyberpunkLevel: 'high',
    tags: ['corporate', 'luxury', 'high-security']
  },
  {
    id: 'pacifica-combat-zone',
    name: 'Pacifica Combat Zone',
    category: 'adventure',
    destination: 'night-city',
    description: 'Abandoned district now home to gangs and underground fighting rings',
    duration: 300,
    price: 800,
    rating: 3.9,
    cyberpunkLevel: 'extreme',
    tags: ['dangerous', 'gang-territory', 'underground']
  },
  {
    id: 'afterlife-bar',
    name: 'The Afterlife',
    category: 'nightlife',
    destination: 'night-city',
    description: 'Legendary mercenary bar where deals are made and legends are born',
    duration: 240,
    price: 1500,
    rating: 4.9,
    cyberpunkLevel: 'high',
    tags: ['mercenary', 'legendary', 'deals']
  }
];

export const cyberpunkTransportation = [
  {
    id: 'hover-taxi',
    type: 'air-taxi',
    name: 'Hover Taxi',
    description: 'Flying taxi service through the neon-lit skyways',
    pricePerKm: 150,
    speed: 120,
    cyberpunkLevel: 'high',
    availability: 'common'
  },
  {
    id: 'mag-lev-train',
    type: 'train',
    name: 'Mag-Lev Express',
    description: 'High-speed magnetic levitation train connecting major districts',
    pricePerKm: 80,
    speed: 300,
    cyberpunkLevel: 'medium',
    availability: 'scheduled'
  },
  {
    id: 'neural-link-transport',
    type: 'teleportation',
    name: 'Neural Link Transport',
    description: 'Instant consciousness transfer (body stays behind)',
    pricePerKm: 500,
    speed: 999,
    cyberpunkLevel: 'extreme',
    availability: 'rare'
  },
  {
    id: 'street-bike',
    type: 'motorcycle',
    name: 'Cybernetic Street Bike',
    description: 'High-tech motorcycle with AI navigation and stealth mode',
    pricePerKm: 25,
    speed: 180,
    cyberpunkLevel: 'high',
    availability: 'rental'
  }
];

export const cyberpunkAccommodations = [
  {
    id: 'corpo-tower-suite',
    name: 'Corporate Tower Penthouse',
    type: 'luxury',
    destination: 'night-city',
    description: 'Ultra-luxury suite with panoramic city views and personal AI butler',
    pricePerNight: 8500,
    rating: 4.9,
    amenities: ['AI-butler', 'panoramic-view', 'security-detail', 'neural-interface-bed'],
    cyberpunkLevel: 'high'
  },
  {
    id: 'capsule-pod-hotel',
    name: 'Neo-Capsule Pod Hotel',
    type: 'budget',
    destination: 'neo-tokyo',
    description: 'Compact sleeping pods with VR entertainment systems',
    pricePerNight: 450,
    rating: 4.1,
    amenities: ['VR-system', 'climate-control', 'privacy-shield', 'charging-station'],
    cyberpunkLevel: 'medium'
  },
  {
    id: 'underground-safehouse',
    name: 'Underground Safehouse',
    type: 'unique',
    destination: 'night-city',
    description: 'Hidden bunker beneath the city with military-grade security',
    pricePerNight: 2200,
    rating: 4.6,
    amenities: ['military-security', 'EMP-shielding', 'weapon-storage', 'encrypted-comms'],
    cyberpunkLevel: 'extreme'
  }
];

export const sampleItineraries = [
  {
    id: 'night-city-runner',
    title: 'Night City Street Runner Experience',
    destination: 'night-city',
    duration: 3,
    totalBudget: 15000,
    description: 'Experience the underground world of Night City like a true street runner',
    days: [
      {
        date: '2077-12-15',
        activities: [
          {
            time: '10:00',
            type: 'attraction',
            id: 'corpo-plaza',
            notes: 'Scout the corporate district for intel'
          },
          {
            time: '14:30',
            type: 'transportation',
            id: 'street-bike',
            from: 'corpo-plaza',
            to: 'pacifica-combat-zone'
          },
          {
            time: '15:00',
            type: 'attraction',
            id: 'pacifica-combat-zone',
            notes: 'Meet contacts in the combat zone'
          },
          {
            time: '20:00',
            type: 'attraction',
            id: 'afterlife-bar',
            notes: 'Network with other runners and mercs'
          }
        ]
      }
    ],
    tags: ['street-runner', 'underground', 'mercenary'],
    cyberpunkLevel: 'extreme'
  }
];

export const cyberpunkThemes = {
  colors: {
    neon: {
      pink: '#ff0080',
      cyan: '#00ffff',
      green: '#00ff41',
      purple: '#8000ff',
      orange: '#ff8000'
    },
    dark: {
      background: '#0a0a0a',
      surface: '#1a1a1a',
      card: '#2a2a2a',
      border: '#404040'
    }
  },
  effects: {
    glow: 'drop-shadow(0 0 10px currentColor)',
    scanlines: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.1) 2px, rgba(0,255,255,0.1) 4px)',
    glitch: 'hue-rotate(90deg) saturate(2) brightness(1.2)'
  }
};

export const cyberpunkIcons = {
  attractions: {
    entertainment: '🎮',
    shopping: '🛒',
    sightseeing: '🏙️',
    adventure: '⚔️',
    nightlife: '🍸',
    culture: '🎭'
  },
  transportation: {
    'air-taxi': '🚁',
    train: '🚄',
    teleportation: '⚡',
    motorcycle: '🏍️'
  },
  cyberpunkLevel: {
    low: '🔹',
    medium: '🔸',
    high: '🔥',
    extreme: '💀'
  }
};

export const userProfiles = [
  {
    id: 'user-001',
    name: 'Ghost Walker',
    avatar: '/avatars/ghost-walker.jpg',
    preferences: {
      budget: 'high',
      riskLevel: 'extreme',
      interests: ['hacking', 'underground', 'corporate-espionage']
    },
    stats: {
      itinerariesCreated: 23,
      citiesVisited: 8,
      reputation: 'legendary'
    }
  }
];

export const defaultPreferences = {
  budget: {
    low: { min: 0, max: 5000 },
    medium: { min: 5000, max: 15000 },
    high: { min: 15000, max: 50000 },
    unlimited: { min: 50000, max: Infinity }
  },
  riskLevel: ['safe', 'moderate', 'dangerous', 'extreme'],
  duration: {
    short: { min: 1, max: 3 },
    medium: { min: 4, max: 7 },
    long: { min: 8, max: 14 },
    extended: { min: 15, max: 30 }
  }
};