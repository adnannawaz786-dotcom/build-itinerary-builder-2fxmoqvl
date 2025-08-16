import { format, parseISO, addDays, isAfter, isBefore } from 'date-fns';

// Sample data for attractions and activities
export const attractionCategories = [
  { id: 'historical', name: 'Historical Sites', icon: '🏛️', color: 'cyan' },
  { id: 'museums', name: 'Museums', icon: '🖼️', color: 'purple' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎭', color: 'pink' },
  { id: 'dining', name: 'Dining', icon: '🍽️', color: 'green' },
  { id: 'shopping', name: 'Shopping', icon: '🛍️', color: 'yellow' },
  { id: 'nature', name: 'Nature & Parks', icon: '🌳', color: 'emerald' },
  { id: 'nightlife', name: 'Nightlife', icon: '🌙', color: 'indigo' },
  { id: 'adventure', name: 'Adventure', icon: '⚡', color: 'red' }
];

export const transportationTypes = [
  { id: 'flight', name: 'Flight', icon: '✈️', color: 'blue' },
  { id: 'train', name: 'Train', icon: '🚄', color: 'green' },
  { id: 'bus', name: 'Bus', icon: '🚌', color: 'yellow' },
  { id: 'car', name: 'Car Rental', icon: '🚗', color: 'red' },
  { id: 'taxi', name: 'Taxi/Uber', icon: '🚕', color: 'orange' },
  { id: 'metro', name: 'Metro/Subway', icon: '🚇', color: 'purple' },
  { id: 'walking', name: 'Walking', icon: '🚶', color: 'gray' },
  { id: 'bike', name: 'Bike', icon: '🚲', color: 'cyan' }
];

export const accommodationTypes = [
  { id: 'hotel', name: 'Hotel', icon: '🏨', color: 'blue' },
  { id: 'hostel', name: 'Hostel', icon: '🏠', color: 'green' },
  { id: 'airbnb', name: 'Airbnb', icon: '🏡', color: 'pink' },
  { id: 'resort', name: 'Resort', icon: '🏖️', color: 'orange' },
  { id: 'boutique', name: 'Boutique Hotel', icon: '🏛️', color: 'purple' }
];

// Sample attractions data
export const sampleAttractions = {
  'tokyo': [
    {
      id: 'tokyo-tower',
      name: 'Tokyo Tower',
      category: 'historical',
      description: 'Iconic red tower offering city views and observation decks',
      duration: 120,
      cost: 25,
      rating: 4.2,
      coordinates: { lat: 35.6586, lng: 139.7454 }
    },
    {
      id: 'senso-ji',
      name: 'Senso-ji Temple',
      category: 'historical',
      description: 'Ancient Buddhist temple in Asakusa district',
      duration: 90,
      cost: 0,
      rating: 4.5,
      coordinates: { lat: 35.7148, lng: 139.7967 }
    },
    {
      id: 'shibuya-crossing',
      name: 'Shibuya Crossing',
      category: 'entertainment',
      description: 'World\'s busiest pedestrian crossing',
      duration: 30,
      cost: 0,
      rating: 4.3,
      coordinates: { lat: 35.6598, lng: 139.7006 }
    },
    {
      id: 'tsukiji-market',
      name: 'Tsukiji Outer Market',
      category: 'dining',
      description: 'Famous fish market with fresh sushi and street food',
      duration: 180,
      cost: 40,
      rating: 4.6,
      coordinates: { lat: 35.6654, lng: 139.7707 }
    }
  ],
  'paris': [
    {
      id: 'eiffel-tower',
      name: 'Eiffel Tower',
      category: 'historical',
      description: 'Iconic iron tower and symbol of Paris',
      duration: 150,
      cost: 30,
      rating: 4.4,
      coordinates: { lat: 48.8584, lng: 2.2945 }
    },
    {
      id: 'louvre',
      name: 'Louvre Museum',
      category: 'museums',
      description: 'World\'s largest art museum',
      duration: 240,
      cost: 17,
      rating: 4.7,
      coordinates: { lat: 48.8606, lng: 2.3376 }
    },
    {
      id: 'notre-dame',
      name: 'Notre-Dame Cathedral',
      category: 'historical',
      description: 'Gothic cathedral masterpiece',
      duration: 90,
      cost: 0,
      rating: 4.5,
      coordinates: { lat: 48.8530, lng: 2.3499 }
    }
  ]
};

// Utility functions
export const generateUniqueId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const formatDate = (date) => {
  if (!date) return '';
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, 'MMM dd, yyyy');
  } catch (error) {
    return '';
  }
};

export const formatTime = (time) => {
  if (!time) return '';
  try {
    return format(new Date(`2000-01-01T${time}`), 'h:mm a');
  } catch (error) {
    return time;
  }
};

export const formatDuration = (minutes) => {
  if (!minutes || minutes === 0) return '0 min';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

export const formatCurrency = (amount, currency = 'USD') => {
  if (!amount && amount !== 0) return '';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

export const calculateItineraryStats = (itinerary) => {
  if (!itinerary || !itinerary.days) {
    return {
      totalDays: 0,
      totalActivities: 0,
      totalCost: 0,
      totalDuration: 0
    };
  }

  const totalDays = itinerary.days.length;
  let totalActivities = 0;
  let totalCost = 0;
  let totalDuration = 0;

  itinerary.days.forEach(day => {
    if (day.activities) {
      totalActivities += day.activities.length;
      day.activities.forEach(activity => {
        totalCost += activity.cost || 0;
        totalDuration += activity.duration || 0;
      });
    }
  });

  return {
    totalDays,
    totalActivities,
    totalCost,
    totalDuration
  };
};

export const validateItinerary = (itinerary) => {
  const errors = [];

  if (!itinerary.title?.trim()) {
    errors.push('Title is required');
  }

  if (!itinerary.destination?.trim()) {
    errors.push('Destination is required');
  }

  if (!itinerary.startDate) {
    errors.push('Start date is required');
  }

  if (!itinerary.endDate) {
    errors.push('End date is required');
  }

  if (itinerary.startDate && itinerary.endDate) {
    const start = typeof itinerary.startDate === 'string' ? parseISO(itinerary.startDate) : itinerary.startDate;
    const end = typeof itinerary.endDate === 'string' ? parseISO(itinerary.endDate) : itinerary.endDate;
    
    if (isAfter(start, end)) {
      errors.push('Start date must be before end date');
    }
  }

  if (!itinerary.days || itinerary.days.length === 0) {
    errors.push('At least one day is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const generateItineraryDays = (startDate, endDate) => {
  const days = [];
  const start = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
  
  let currentDate = start;
  let dayNumber = 1;

  while (!isAfter(currentDate, end)) {
    days.push({
      id: generateUniqueId(),
      date: format(currentDate, 'yyyy-MM-dd'),
      dayNumber,
      activities: [],
      notes: ''
    });
    
    currentDate = addDays(currentDate, 1);
    dayNumber++;
  }

  return days;
};

export const sortActivitiesByTime = (activities) => {
  return [...activities].sort((a, b) => {
    if (!a.time && !b.time) return 0;
    if (!a.time) return 1;
    if (!b.time) return -1;
    return a.time.localeCompare(b.time);
  });
};

export const getActivityDuration = (activity) => {
  if (activity.endTime && activity.startTime) {
    const start = new Date(`2000-01-01T${activity.startTime}`);
    const end = new Date(`2000-01-01T${activity.endTime}`);
    return Math.round((end - start) / (1000 * 60)); // minutes
  }
  return activity.duration || 60;
};

export const detectTimeConflicts = (activities) => {
  const sortedActivities = sortActivitiesByTime(activities.filter(a => a.time));
  const conflicts = [];

  for (let i = 0; i < sortedActivities.length - 1; i++) {
    const current = sortedActivities[i];
    const next = sortedActivities[i + 1];
    
    if (current.time && next.time) {
      const currentStart = new Date(`2000-01-01T${current.time}`);
      const currentDuration = getActivityDuration(current);
      const currentEnd = new Date(currentStart.getTime() + currentDuration * 60000);
      const nextStart = new Date(`2000-01-01T${next.time}`);
      
      if (currentEnd > nextStart) {
        conflicts.push({
          activity1: current,
          activity2: next,
          overlap: Math.round((currentEnd - nextStart) / (1000 * 60))
        });
      }
    }
  }

  return conflicts;
};

export const exportItineraryToJSON = (itinerary) => {
  const dataStr = JSON.stringify(itinerary, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = `${itinerary.title.replace(/\s+/g, '_')}_itinerary.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

export const getAttractionsByDestination = (destination) => {
  const normalizedDestination = destination.toLowerCase().replace(/\s+/g, '');
  return sampleAttractions[normalizedDestination] || [];
};

export const getCategoryColor = (categoryId) => {
  const category = attractionCategories.find(cat => cat.id === categoryId);
  return category ? category.color : 'gray';
};

export const getCategoryIcon = (categoryId) => {
  const category = attractionCategories.find(cat => cat.id === categoryId);
  return category ? category.icon : '📍';
};

export const getTransportIcon = (transportId) => {
  const transport = transportationTypes.find(t => t.id === transportId);
  return transport ? transport.icon : '🚶';
};

export const calculateTravelTime = (from, to, transportType = 'walking') => {
  // Simple estimation based on transport type
  const baseTime = 30; // minutes
  const multipliers = {
    walking: 2,
    bike: 1.5,
    taxi: 0.5,
    metro: 0.7,
    bus: 0.8,
    car: 0.4,
    train: 0.3,
    flight: 0.1
  };
  
  return Math.round(baseTime * (multipliers[transportType] || 1));
};