import React from 'react';
import { Clock, MapPin, DollarSign, Star, Calendar, Users, Trash2, Edit3 } from 'lucide-react';
import { motion } from 'framer-motion';

const ActivityCard = ({ 
  activity, 
  onEdit, 
  onDelete, 
  showActions = true,
  compact = false 
}) => {
  const {
    id,
    name,
    type,
    description,
    location,
    duration,
    cost,
    rating,
    time,
    date,
    capacity,
    booked,
    status,
    notes,
    tags = []
  } = activity;

  const getActivityTypeColor = (type) => {
    const colors = {
      attraction: 'from-cyan-500/20 to-blue-500/20 border-cyan-400/30',
      restaurant: 'from-pink-500/20 to-purple-500/20 border-pink-400/30',
      transportation: 'from-green-500/20 to-emerald-500/20 border-green-400/30',
      accommodation: 'from-yellow-500/20 to-orange-500/20 border-yellow-400/30',
      entertainment: 'from-purple-500/20 to-indigo-500/20 border-purple-400/30',
      shopping: 'from-red-500/20 to-rose-500/20 border-red-400/30',
      default: 'from-gray-500/20 to-slate-500/20 border-gray-400/30'
    };
    return colors[type] || colors.default;
  };

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'bg-green-500/20 text-green-400 border-green-400/30',
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30',
      cancelled: 'bg-red-500/20 text-red-400 border-red-400/30',
      draft: 'bg-gray-500/20 text-gray-400 border-gray-400/30'
    };
    return colors[status] || colors.draft;
  };

  const formatDuration = (minutes) => {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
  };

  const formatCost = (cost) => {
    if (typeof cost === 'number') {
      return `$${cost.toFixed(2)}`;
    }
    return cost || 'Free';
  };

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-to-r ${getActivityTypeColor(type)} backdrop-blur-sm border rounded-lg p-3 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-white truncate">{name}</h4>
            <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
              {time && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {time}
                </span>
              )}
              {duration && (
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDuration(duration)}
                </span>
              )}
              {cost && (
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3" />
                  {formatCost(cost)}
                </span>
              )}
            </div>
          </div>
          {status && (
            <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(status)}`}>
              {status}
            </span>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`bg-gradient-to-br ${getActivityTypeColor(type)} backdrop-blur-sm border rounded-xl p-6 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300 relative overflow-hidden`}
    >
      {/* Cyberpunk grid overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-bold text-white truncate">{name}</h3>
              {rating && (
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm">{rating}</span>
                </div>
              )}
            </div>
            
            <span className="inline-block px-3 py-1 text-xs font-medium text-cyan-400 bg-cyan-500/20 border border-cyan-400/30 rounded-full uppercase tracking-wide">
              {type}
            </span>
          </div>

          {status && (
            <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(status)} uppercase tracking-wide`}>
              {status}
            </span>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {location && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span className="truncate">{location}</span>
            </div>
          )}

          {time && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>{time}</span>
            </div>
          )}

          {duration && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>{formatDuration(duration)}</span>
            </div>
          )}

          {cost && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <DollarSign className="w-4 h-4 text-cyan-400" />
              <span>{formatCost(cost)}</span>
            </div>
          )}

          {date && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>{new Date(date).toLocaleDateString()}</span>
            </div>
          )}

          {capacity && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>{booked || 0}/{capacity}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs text-purple-300 bg-purple-500/20 border border-purple-400/30 rounded-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Notes */}
        {notes && (
          <div className="mb-4 p-3 bg-black/20 border border-gray-700 rounded-lg">
            <p className="text-sm text-gray-300">{notes}</p>
          </div>
        )}

        {/* Actions */}
        {showActions && (onEdit || onDelete) && (
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-700">
            {onEdit && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onEdit(activity)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 border border-cyan-400/30 hover:border-cyan-400/50 rounded-lg transition-all duration-200"
              >
                <Edit3 className="w-4 h-4" />
                Edit
              </motion.button>
            )}
            
            {onDelete && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onDelete(id)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-400/30 hover:border-red-400/50 rounded-lg transition-all duration-200"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </motion.button>
            )}
          </div>
        )}
      </div>

      {/* Cyberpunk accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
    </motion.div>
  );
};

export default ActivityCard;