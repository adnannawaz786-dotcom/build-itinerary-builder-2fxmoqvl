import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MapPin, Clock, Calendar, Plane, Car, Train, Hotel, Camera, Utensils, Trash2, Edit3, Save, X } from 'lucide-react';

const ItineraryBuilder = () => {
  const [itinerary, setItinerary] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    days: []
  });
  
  const [editingItem, setEditingItem] = useState(null);
  const [activeDay, setActiveDay] = useState(0);

  const itemTypes = {
    attraction: { icon: Camera, color: 'from-cyan-500 to-blue-500', label: 'Attraction' },
    restaurant: { icon: Utensils, color: 'from-pink-500 to-purple-500', label: 'Restaurant' },
    hotel: { icon: Hotel, color: 'from-green-500 to-teal-500', label: 'Hotel' },
    transport: { icon: Car, color: 'from-yellow-500 to-orange-500', label: 'Transport' }
  };

  const transportTypes = [
    { icon: Plane, label: 'Flight' },
    { icon: Car, label: 'Car' },
    { icon: Train, label: 'Train' }
  ];

  useEffect(() => {
    if (itinerary.startDate && itinerary.endDate) {
      const start = new Date(itinerary.startDate);
      const end = new Date(itinerary.endDate);
      const dayCount = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      
      const newDays = Array.from({ length: dayCount }, (_, index) => {
        const date = new Date(start);
        date.setDate(start.getDate() + index);
        return {
          id: index,
          date: date.toISOString().split('T')[0],
          items: itinerary.days[index]?.items || []
        };
      });
      
      setItinerary(prev => ({ ...prev, days: newDays }));
    }
  }, [itinerary.startDate, itinerary.endDate]);

  const addItem = (dayIndex, type) => {
    const newItem = {
      id: Date.now(),
      type,
      title: '',
      time: '',
      location: '',
      notes: '',
      cost: '',
      reservationId: '',
      transportType: type === 'transport' ? 'car' : null
    };
    
    setItinerary(prev => ({
      ...prev,
      days: prev.days.map((day, index) => 
        index === dayIndex 
          ? { ...day, items: [...day.items, newItem] }
          : day
      )
    }));
    
    setEditingItem(newItem.id);
  };

  const updateItem = (dayIndex, itemId, updates) => {
    setItinerary(prev => ({
      ...prev,
      days: prev.days.map((day, index) => 
        index === dayIndex 
          ? {
              ...day,
              items: day.items.map(item => 
                item.id === itemId ? { ...item, ...updates } : item
              )
            }
          : day
      )
    }));
  };

  const deleteItem = (dayIndex, itemId) => {
    setItinerary(prev => ({
      ...prev,
      days: prev.days.map((day, index) => 
        index === dayIndex 
          ? { ...day, items: day.items.filter(item => item.id !== itemId) }
          : day
      )
    }));
  };

  const ItemCard = ({ item, dayIndex }) => {
    const ItemIcon = itemTypes[item.type]?.icon || Camera;
    const isEditing = editingItem === item.id;
    
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`relative p-4 rounded-lg border border-cyan-500/30 bg-gradient-to-r ${itemTypes[item.type]?.color} bg-opacity-10 backdrop-blur-sm`}
      >
        <div className="absolute inset-0 bg-black/20 rounded-lg" />
        <div className="relative">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                value={item.title}
                onChange={(e) => updateItem(dayIndex, item.id, { title: e.target.value })}
                className="w-full bg-black/30 border border-cyan-500/50 rounded px-3 py-2 text-cyan-100 placeholder-cyan-400/60"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="time"
                  value={item.time}
                  onChange={(e) => updateItem(dayIndex, item.id, { time: e.target.value })}
                  className="bg-black/30 border border-cyan-500/50 rounded px-3 py-2 text-cyan-100"
                />
                <input
                  type="text"
                  placeholder="Cost"
                  value={item.cost}
                  onChange={(e) => updateItem(dayIndex, item.id, { cost: e.target.value })}
                  className="bg-black/30 border border-cyan-500/50 rounded px-3 py-2 text-cyan-100 placeholder-cyan-400/60"
                />
              </div>
              <input
                type="text"
                placeholder="Location"
                value={item.location}
                onChange={(e) => updateItem(dayIndex, item.id, { location: e.target.value })}
                className="w-full bg-black/30 border border-cyan-500/50 rounded px-3 py-2 text-cyan-100 placeholder-cyan-400/60"
              />
              {item.type === 'transport' && (
                <select
                  value={item.transportType}
                  onChange={(e) => updateItem(dayIndex, item.id, { transportType: e.target.value })}
                  className="w-full bg-black/30 border border-cyan-500/50 rounded px-3 py-2 text-cyan-100"
                >
                  {transportTypes.map(transport => (
                    <option key={transport.label} value={transport.label.toLowerCase()}>
                      {transport.label}
                    </option>
                  ))}
                </select>
              )}
              <textarea
                placeholder="Notes & Reservation ID"
                value={item.notes}
                onChange={(e) => updateItem(dayIndex, item.id, { notes: e.target.value })}
                className="w-full bg-black/30 border border-cyan-500/50 rounded px-3 py-2 text-cyan-100 placeholder-cyan-400/60 h-20 resize-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingItem(null)}
                  className="flex items-center gap-1 px-3 py-1 bg-green-500/20 border border-green-500/50 rounded text-green-400 hover:bg-green-500/30 transition-colors"
                >
                  <Save size={14} />
                  Save
                </button>
                <button
                  onClick={() => deleteItem(dayIndex, item.id)}
                  className="flex items-center gap-1 px-3 py-1 bg-red-500/20 border border-red-500/50 rounded text-red-400 hover:bg-red-500/30 transition-colors"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <ItemIcon size={18} className="text-cyan-400" />
                  <h4 className="font-semibold text-cyan-100">{item.title || 'Untitled'}</h4>
                </div>
                <button
                  onClick={() => setEditingItem(item.id)}
                  className="text-cyan-400/60 hover:text-cyan-400 transition-colors"
                >
                  <Edit3 size={14} />
                </button>
              </div>
              
              <div className="space-y-1 text-sm text-cyan-200/80">
                {item.time && (
                  <div className="flex items-center gap-2">
                    <Clock size={12} />
                    <span>{item.time}</span>
                  </div>
                )}
                {item.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={12} />
                    <span>{item.location}</span>
                  </div>
                )}
                {item.cost && (
                  <div className="text-green-400">
                    Cost: {item.cost}
                  </div>
                )}
                {item.notes && (
                  <div className="text-cyan-300/70 text-xs mt-2">
                    {item.notes}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-cyan-100">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23059669" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      
      <div className="relative max-w-7xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-6">
            Itinerary Builder
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-black/20 border border-cyan-500/30 rounded-lg backdrop-blur-sm">
            <input
              type="text"
              placeholder="Trip Title"
              value={itinerary.title}
              onChange={(e) => setItinerary(prev => ({ ...prev, title: e.target.value }))}
              className="bg-black/30 border border-cyan-500/50 rounded px-4 py-2 text-cyan-100 placeholder-cyan-400/60"
            />
            <input
              type="text"
              placeholder="Destination"
              value={itinerary.destination}
              onChange={(e) => setItinerary(prev => ({ ...prev, destination: e.target.value }))}
              className="bg-black/30 border border-cyan-500/50 rounded px-4 py-2 text-cyan-100 placeholder-cyan-400/60"
            />
            <input
              type="date"
              value={itinerary.startDate}
              onChange={(e) => setItinerary(prev => ({ ...prev, startDate: e.target.value }))}
              className="bg-black/30 border border-cyan-500/50 rounded px-4 py-2 text-cyan-100"
            />
            <input
              type="date"
              value={itinerary.endDate}
              onChange={(e) => setItinerary(prev => ({ ...prev, endDate: e.target.value }))}
              className="bg-black/30 border border-cyan-500/50 rounded px-4 py-2 text-cyan-100"
            />
          </div>
        </motion.div>

        {itinerary.days.length > 0 && (
          <div className="flex gap-6">
            <div className="w-64 flex-shrink-0">
              <div className="sticky top-6 space-y-2">
                <h3 className="text-lg font-semibold text-cyan-400 mb-4">Days</h3>
                {itinerary.days.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveDay(index)}
                    className={`w-full p-3 text-left rounded-lg border transition-all ${
                      activeDay === index
                        ? 'border-cyan-400 bg-cyan-500/20 text-cyan-100'
                        : 'border-cyan-500/30 bg-black/20 text-cyan-300/80 hover:border-cyan-400/60'
                    }`}
                  >
                    <div className="font-medium">Day {index + 1}</div>
                    <div className="text-sm opacity-80">
                      {new Date(day.date).toLocaleDateString()}
                    </div>
                    <div className="text-xs mt-1 opacity-60">
                      {day.items.length} items
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDay}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-cyan-100">
                      Day {activeDay + 1} - {new Date(itinerary.days[activeDay]?.date).toLocaleDateString()}
                    </h2>
                    <div className="flex gap-2">
                      {Object.entries(itemTypes).map(([type, config]) => (
                        <button
                          key={type}
                          onClick={() => addItem(activeDay, type)}
                          className={`flex items-center gap-2 px-3 py-2 bg-gradient-to-r ${config.color} bg-opacity-20 border border-cyan-500/30 rounded-lg text-cyan-100 hover:bg-opacity-30 transition-all`}
                        >
                          <config.icon size={16} />
                          <span className="hidden sm:inline">{config.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <AnimatePresence>
                      {itinerary.days[activeDay]?.items.map((item) => (
                        <ItemCard
                          key={item.id}
                          item={item}
                          dayIndex={activeDay}
                        />
                      ))}
                    </AnimatePresence>
                    
                    {itinerary.days[activeDay]?.items.length === 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12 text-cyan-400/60"
                      >
                        <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                        <p>No items added for this day yet.</p>
                        <p className="text-sm mt-2">Click the buttons above to add attractions, restaurants, hotels, or transportation.</p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}

        {itinerary.days.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-cyan-400/60"
          >
            <MapPin size={64} className="mx-auto mb-6 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">Ready to Plan Your Adventure?</h3>
            <p>Enter your trip details above to start building your itinerary.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ItineraryBuilder;