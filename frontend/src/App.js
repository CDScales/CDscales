import React from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhyUs } from './components/WhyUs';
import { Services } from './components/Services';
import { HowItWorks } from './components/HowItWorks';
import { Pricing } from './components/Pricing';
import { Reviews } from './components/Reviews';
import { Booking } from './components/Booking';
import { Contact } from './components/Contact';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';
import './App.css';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Navbar />
        <Hero />
        <WhyUs />
        <Services />
        <HowItWorks />
        <Pricing />
        <Reviews />
        <Booking />
        <Contact />
        <FinalCTA />
        <Footer />
        <Toaster position="top-right" richColors />
      </div>
    </AppProvider>
  );
}

export default App;
