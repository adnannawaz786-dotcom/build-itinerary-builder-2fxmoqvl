import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calendar, MapPin, Clock, Users, Plane, Car, Train, Hotel, Camera, Utensils, Plus, Trash2, Save } from 'lucide-react';
import { motion } from 'framer-motion';

const itinerarySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  destination: z.string().min(1, 'Destination is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  travelers: z.number().min(1, 'At least 1 traveler required'),
  budget: z.number().min(0, 'Budget must be positive'),
  description: z.string().optional(),
});

const ItineraryForm = ({ initialData = null, onSubmit, onCancel }) => {
  const [days, setDays] = useState(initialData?.days || []);
  const [activeDay, setActiveDay] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(itinerarySchema),
    defaultValues: initialData || {
      title: '',
      destination: '',
      startDate: '',
      endDate: '',
      travelers: 1,
      budget: 0,
      description: '',
    },
  });

  const watchedStartDate = watch('startDate');
  const watchedEndDate = watch('endDate');

  React.useEffect(() => {
    if (watchedStartDate && watchedEndDate) {
      const start = new Date(watchedStartDate);
      const end = new Date(watchedEndDate);
      const dayCount = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
      
      if (dayCount > 0 && dayCount !== days.length) {
        const newDays = Array.from({ length: dayCount }, (_, index) => ({
          id: index + 1,
          date: new Date(start.getTime() + index * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          activities: [],
          transportation: null,
          accommodation: null,
        }));
        setDays(newDays);
      }
    }
  }, [watchedStartDate, watchedEndDate]);

  const addActivity = (dayIndex) => {
    const newActivity = {
      id: Date.now(),
      type: 'attraction',
      title: '',
      time: '09:00',
      duration: 60,
      location: '',
      notes: '',
      cost: 0,
    };
    
    const updatedDays = [...days];
    updatedDays[dayIndex].activities.push(newActivity);
    setDays(updatedDays);
  };

  const removeActivity = (dayIndex, activityId) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].activities = updatedDays[dayIndex].activities.filter(
      activity => activity.id !== activityId
    );
    setDays(updatedDays);
  };

  const updateActivity = (dayIndex, activityId, field, value) => {
    const updatedDays = [...days];
    const activity = updatedDays[dayIndex].activities.find(a => a.id === activityId);
    if (activity) {
      activity[field] = value;
      setDays(updatedDays);
    }
  };

  const updateTransportation = (dayIndex, field, value) => {
    const updatedDays = [...days];
    if (!updatedDays[dayIndex].transportation) {
      updatedDays[dayIndex].transportation = {};
    }
    updatedDays[dayIndex].transportation[field] = value;
    setDays(updatedDays);
  };

  const updateAccommodation = (dayIndex, field, value) => {
    const updatedDays = [...days];
    if (!updatedDays[dayIndex].accommodation) {
      updatedDays[dayIndex].accommodation = {};
    }
    updatedDays[dayIndex].accommodation[field] = value;
    setDays(updatedDays);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'attraction': return <Camera className="w-4 h-4" />;
      case 'restaurant': return <Utensils className="w-4 h-4" />;
      case 'transport': return <Car className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const getTransportIcon = (type) => {
    switch (type) {
      case 'flight': return <Plane className="w-4 h-4" />;
      case 'train': return <Train className="w-4 h-4" />;
      case 'car': return <Car className="w-4 h-4" />;
      default: return <Car className="w-4 h-4" />;
    }
  };

  const onFormSubmit = (data) => {
    const itineraryData = {
      ...data,
      days: days,
      id: initialData?.id || Date.now(),
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onSubmit(itineraryData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/50 backdrop-blur-lg border border-cyan-500/30 rounded-xl p-6 mb-6"
        >
          <h1 className="text-3xl font-bold text-cyan-400 mb-6 font-mono">
            {initialData ? 'EDIT ITINERARY' : 'CREATE NEW ITINERARY'}
          </h1>

          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-cyan-300 text-sm font-mono mb-2">
                  TITLE
                </label>
                <input
                  {...register('title')}
                  className="w-full bg-black/70 border border-cyan-500/50 rounded-lg px-4 py-3 text-white font-mono focus:border-cyan-400 focus:outline-none"
                  placeholder="Enter itinerary title"
                />
                {errors.title && (
                  <p className="text-red-400 text-sm mt-1 font-mono">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-cyan-300 text-sm font-mono mb-2">
                  DESTINATION
                </label>
                <input
                  {...register('destination')}
                  className="w-full bg-black/70 border border-cyan-500/50 rounded-lg px-4 py-3 text-white font-mono focus:border-cyan-400 focus:outline-none"
                  placeholder="Enter destination"
                />
                {errors.destination && (
                  <p className="text-red-400 text-sm mt-1 font-mono">{errors.destination.message}</p>
                )}
              </div>

              <div>
                <label className="block text-cyan-300 text-sm font-mono mb-2">
                  START DATE
                </label>
                <input
                  type="date"
                  {...register('startDate')}
                  className="w-full bg-black/70 border border-cyan-500/50 rounded-lg px-4 py-3 text-white font-mono focus:border-cyan-400 focus:outline-none"
                />
                {errors.startDate && (
                  <p className="text-red-400 text-sm mt-1 font-mono">{errors.startDate.message}</p>
                )}
              </div>

              <div>
                <label className="block text-cyan-300 text-sm font-mono mb-2">
                  END DATE
                </label>
                <input
                  type="date"
                  {...register('endDate')}
                  className="w-full bg-black/70 border border-cyan-500/50 rounded-lg px-4 py-3 text-white font-mono focus:border-cyan-400 focus:outline-none"
                />
                {errors.endDate && (
                  <p className="text-red-400 text-sm mt-1 font-mono">{errors.endDate.message}</p>
                )}
              </div>

              <div>
                <label className="block text-cyan-300 text-sm font-mono mb-2">
                  TRAVELERS
                </label>
                <input
                  type="number"
                  {...register('travelers', { valueAsNumber: true })}
                  className="w-full bg-black/70 border border-cyan-500/50 rounded-lg px-4 py-3 text-white font-mono focus:border-cyan-400 focus:outline-none"
                  min="1"
                />
                {errors.travelers && (
                  <p className="text-red-400 text-sm mt-1 font-mono">{errors.travelers.message}</p>
                )}
              </div>

              <div>
                <label className="block text-cyan-300 text-sm font-mono mb-2">
                  BUDGET ($)
                </label>
                <input
                  type="number"
                  {...register('budget', { valueAsNumber: true })}
                  className="w-full bg-black/70 border border-cyan-500/50 rounded-lg px-4 py-3 text-white font-mono focus:border-cyan-400 focus:outline-none"
                  min="0"
                  step="0.01"
                />
                {errors.budget && (
                  <p className="text-red-400 text-sm mt-1 font-mono">{errors.budget.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-cyan-300 text-sm font-mono mb-2">
                DESCRIPTION
              </label>
              <textarea
                {...register('description')}
                className="w-full bg-black/70 border border-cyan-500/50 rounded-lg px-4 py-3 text-white font-mono focus:border-cyan-400 focus:outline-none h-24"
                placeholder="Enter itinerary description"
              />
            </div>
          </form>
        </motion.div>

        {days.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black/50 backdrop-blur-lg border border-cyan-500/30 rounded-xl p-6"
          >
            <h2 className="text-2xl font-bold text-cyan-400 mb-6 font-mono">DAILY ITINERARY</h2>

            <div className="flex flex-wrap gap-2 mb-6">
              {days.map((day, index) => (
                <button
                  key={index}
                  onClick={() => setActiveDay(index)}
                  className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                    activeDay === index
                      ? 'bg-cyan-500 text-black'
                      : 'bg-black/70 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-500/20'
                  }`}
                >
                  DAY {index + 1}
                </button>
              ))}
            </div>

            {days[activeDay] && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-cyan-300 font-mono">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(days[activeDay].date).toLocaleDateString()}</span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-cyan-400 font-mono">ACTIVITIES</h3>
                    <button
                      type="button"
                      onClick={() => addActivity(activeDay)}
                      className="bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded-lg font-mono text-sm flex items-center gap-2 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      ADD ACTIVITY
                    </button>
                  </div>

                  <div className="space-y-4">
                    {days[activeDay].activities.map((activity, actIndex) => (
                      <div
                        key={activity.id}
                        className="bg-black/70 border border-purple-500/50 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            {getActivityIcon(activity.type)}
                            <span className="text-purple-400 font-mono text-sm">
                              ACTIVITY {actIndex + 1}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeActivity(activeDay, activity.id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-purple-300 text-xs font-mono mb-1">
                              TYPE
                            </label>
                            <select
                              value={activity.type}
                              onChange={(e) => updateActivity(activeDay, activity.id, 'type', e.target.value)}
                              className="w-full bg-black/70 border border-purple-500/50 rounded px-3 py-2 text-white font-mono text-sm focus:border-purple-400 focus:outline-none"
                            >
                              <option value="attraction">Attraction</option>
                              <option value="restaurant">Restaurant</option>
                              <option value="transport">Transport</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-purple-300 text-xs font-mono mb-1">
                              TITLE
                            </label>
                            <input
                              value={activity.title}
                              onChange={(e) => updateActivity(activeDay, activity.id, 'title', e.target.value)}
                              className="w-full bg-black/70 border border-purple-500/50 rounded px-3 py-2 text-white font-mono text-sm focus:border-purple-400 focus:outline-none"
                              placeholder="Activity title"
                            />
                          </div>

                          <div>
                            <label className="block text-purple-300 text-xs font-mono mb-1">
                              TIME
                            </label>
                            <input
                              type="time"
                              value={activity.time}
                              onChange={(e) => updateActivity(activeDay, activity.id, 'time', e.target.value)}
                              className="w-full bg-black/70 border border-purple-500/50 rounded px-3 py-2 text-white font-mono text-sm focus:border-purple-400 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-purple-300 text-xs font-mono mb-1">
                              COST ($)
                            </label>
                            <input
                              type="number"
                              value={activity.cost}
                              onChange={(e) => updateActivity(activeDay, activity.id, 'cost', parseFloat(e.target.value) || 0)}
                              className="w-full bg-black/70 border border-purple-500/50 rounded px-3 py-2 text-white font-mono text-sm focus:border-purple-400 focus:outline-none"
                              min="0"
                              step="0.01"
                            />
                          </div>
                        </div>

                        <div className="mt-4">
                          <label className="block text-purple-300 text-xs font-mono mb-1">
                            LOCATION
                          </label>
                          <input
                            value={activity.location}
                            onChange={(e) => updateActivity(activeDay, activity.id, 'location', e.target.value)}
                            className="w-full bg-black/70 border border-purple-500/50 rounded px-3 py-2 text-white font-mono text-sm focus:border-purple-400 focus:outline-none"
                            placeholder="Activity location"
                          />
                        </div>

                        <div className="mt-4">
                          <label className="block text-purple-300 text-xs font-mono mb-1">
                            NOTES
                          </label>
                          <textarea
                            value={activity.notes}
                            onChange={(e) => updateActivity(activeDay, activity.id, 'notes', e.target.value)}
                            className="w-full bg-black/70 border border-purple-500/50 rounded px-3 py-2 text-white font-mono text-sm focus:border-purple-400 focus:outline-none h-20"
                            placeholder="Additional notes"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4 mt-6"
        >
          <button
            onClick={handleSubmit(onFormSubmit)}
            className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-lg font-mono font-bold flex items-center gap-2 transition-colors"
          >
            <Save className="w-5 h-5" />
            SAVE ITINERARY
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-mono font-bold transition-colors"
            >
              CANCEL
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ItineraryForm;