import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye,
  Filter,
  Search,
  Grid3X3,
  List
} from 'lucide-react';

const Dashboard = () => {
  const [itineraries, setItineraries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  // Mock data for itineraries
  useEffect(() => {
    const mockItineraries = [
      {
        id: 1,
        title: 'Neo Tokyo Adventure',
        destination: 'Tokyo, Japan',
        startDate: '2024-03-15',
        endDate: '2024-03-22',
        status: 'active',
        days: 7,
        attractions: 12,
        reservations: 5,
        image: '/api/placeholder/300/200'
      },
      {
        id: 2,
        title: 'Cyber Seoul Experience',
        destination: 'Seoul, South Korea',
        startDate: '2024-04-10',
        endDate: '2024-04-17',
        status: 'draft',
        days: 7,
        attractions: 8,
        reservations: 3,
        image: '/api/placeholder/300/200'
      },
      {
        id: 3,
        title: 'Digital London Tour',
        destination: 'London, UK',
        startDate: '2024-02-01',
        endDate: '2024-02-05',
        status: 'completed',
        days: 4,
        attractions: 15,
        reservations: 8,
        image: '/api/placeholder/300/200'
      }
    ];
    setItineraries(mockItineraries);
  }, []);

  const filteredItineraries = itineraries.filter(itinerary => {
    const matchesSearch = itinerary.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         itinerary.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || itinerary.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30';
      case 'draft': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'completed': return 'text-green-400 bg-green-400/10 border-green-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const ItineraryCard = ({ itinerary }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-gray-900/50 border border-cyan-500/20 rounded-lg overflow-hidden backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300"
    >
      <div className="h-48 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <MapPin className="w-12 h-12 text-cyan-400" />
        </div>
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(itinerary.status)}`}>
          {itinerary.status.charAt(0).toUpperCase() + itinerary.status.slice(1)}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{itinerary.title}</h3>
        <p className="text-cyan-300 mb-4 flex items-center">
          <MapPin className="w-4 h-4 mr-1" />
          {itinerary.destination}
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="text-gray-300">
            <Calendar className="w-4 h-4 inline mr-1" />
            {itinerary.days} days
          </div>
          <div className="text-gray-300">
            <Clock className="w-4 h-4 inline mr-1" />
            {itinerary.attractions} attractions
          </div>
        </div>
        
        <div className="text-xs text-gray-400 mb-4">
          {new Date(itinerary.startDate).toLocaleDateString()} - {new Date(itinerary.endDate).toLocaleDateString()}
        </div>
        
        <div className="flex space-x-2">
          <button className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center">
            <Eye className="w-4 h-4 mr-1" />
            View
          </button>
          <button className="bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-md transition-colors">
            <Edit3 className="w-4 h-4" />
          </button>
          <button className="bg-red-600/20 hover:bg-red-600/30 text-red-400 p-2 rounded-md transition-colors border border-red-500/30">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const ItineraryListItem = ({ itinerary }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gray-900/50 border border-cyan-500/20 rounded-lg p-6 backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-4">
            <h3 className="text-xl font-bold text-white">{itinerary.title}</h3>
            <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(itinerary.status)}`}>
              {itinerary.status.charAt(0).toUpperCase() + itinerary.status.slice(1)}
            </div>
          </div>
          <p className="text-cyan-300 mt-1 flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {itinerary.destination}
          </p>
          <div className="flex items-center space-x-6 mt-2 text-sm text-gray-300">
            <span><Calendar className="w-4 h-4 inline mr-1" />{itinerary.days} days</span>
            <span><Clock className="w-4 h-4 inline mr-1" />{itinerary.attractions} attractions</span>
            <span className="text-gray-400">
              {new Date(itinerary.startDate).toLocaleDateString()} - {new Date(itinerary.endDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <div className="flex space-x-2 ml-4">
          <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            View
          </button>
          <button className="bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-md transition-colors">
            <Edit3 className="w-4 h-4" />
          </button>
          <button className="bg-red-600/20 hover:bg-red-600/30 text-red-400 p-2 rounded-md transition-colors border border-red-500/30">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Cyberpunk background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20 pointer-events-none" />
      <div className="fixed inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-cyan-500/20 bg-black/50 backdrop-blur-sm"
        >
          <div className="container mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Travel Dashboard
                </h1>
                <p className="text-gray-400 mt-2">Manage your cyberpunk adventures</p>
              </div>
              <Link
                to="/builder"
                className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center shadow-lg hover:shadow-cyan-500/25"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Itinerary
              </Link>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search itineraries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-900/50 border border-cyan-500/30 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-gray-900/50 border border-cyan-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-cyan-600 text-white' 
                      : 'bg-gray-900/50 text-gray-400 hover:text-white border border-cyan-500/30'
                  }`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-cyan-600 text-white' 
                      : 'bg-gray-900/50 text-gray-400 hover:text-white border border-cyan-500/30'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="container mx-auto px-6 py-8">
          {filteredItineraries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-600/20 to-purple-600/20 flex items-center justify-center">
                <MapPin className="w-12 h-12 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No itineraries found</h3>
              <p className="text-gray-400 mb-6">Start building your next cyberpunk adventure</p>
              <Link
                to="/builder"
                className="inline-flex items-center bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Itinerary
              </Link>
            </motion.div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }>
              {filteredItineraries.map((itinerary) => 
                viewMode === 'grid' ? (
                  <ItineraryCard key={itinerary.id} itinerary={itinerary} />
                ) : (
                  <ItineraryListItem key={itinerary.id} itinerary={itinerary} />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;