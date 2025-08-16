import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import { ThemeProvider } from 'next-themes';

// Import page components
import Dashboard from './pages/Dashboard';
import CreateItinerary from './pages/ItineraryBuilder';
import ItineraryDetails from './pages/ItineraryDetails';
import Profile from './pages/Profile';

// Import layout components
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';

// Import context providers
import { ItineraryProvider } from './contexts/ItineraryContext';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <UserProvider>
        <ItineraryProvider>
          <Router>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-cyan-100">
              {/* Cyberpunk grid background */}
              <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />
              
              {/* Animated background elements */}
              <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"
                  animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div
                  className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                  animate={{
                    x: [0, -100, 0],
                    y: [0, 50, 0],
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.div
                  className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"
                  animate={{
                    x: [-50, 50, -50],
                    y: [-25, 25, -25],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>

              {/* Main app structure */}
              <div className="relative z-10 flex h-screen">
                <Sidebar />
                
                <div className="flex-1 flex flex-col">
                  <Navbar />
                  
                  <main className="flex-1 overflow-hidden">
                    <AnimatePresence mode="wait">
                      <Routes>
                        <Route 
                          path="/" 
                          element={<Navigate to="/dashboard" replace />} 
                        />
                        <Route 
                          path="/dashboard" 
                          element={
                            <motion.div
                              key="dashboard"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.3 }}
                              className="h-full"
                            >
                              <Dashboard />
                            </motion.div>
                          } 
                        />
                        <Route 
                          path="/create" 
                          element={
                            <motion.div
                              key="create"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.3 }}
                              className="h-full"
                            >
                              <CreateItinerary />
                            </motion.div>
                          } 
                        />
                        <Route 
                          path="/itinerary/:id" 
                          element={
                            <motion.div
                              key="itinerary-details"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.3 }}
                              className="h-full"
                            >
                              <ItineraryDetails />
                            </motion.div>
                          } 
                        />
                        <Route 
                          path="/profile" 
                          element={
                            <motion.div
                              key="profile"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.3 }}
                              className="h-full"
                            >
                              <Profile />
                            </motion.div>
                          } 
                        />
                      </Routes>
                    </AnimatePresence>
                  </main>
                </div>
              </div>

              {/* Global UI components */}
              <Toaster
                theme="dark"
                position="bottom-right"
                toastOptions={{
                  style: {
                    background: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(34, 211, 238, 0.3)',
                    color: '#e2e8f0',
                    backdropFilter: 'blur(10px)',
                  },
                }}
              />

              {/* Cyberpunk scanlines effect */}
              <div className="fixed inset-0 pointer-events-none z-50">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent animate-pulse" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>

              {/* Corner decorations */}
              <div className="fixed top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-cyan-500/30 pointer-events-none" />
              <div className="fixed top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-purple-500/30 pointer-events-none" />
              <div className="fixed bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-pink-500/30 pointer-events-none" />
              <div className="fixed bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-cyan-500/30 pointer-events-none" />
            </div>
          </Router>
        </ItineraryProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;