import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhyUs } from './components/WhyUs';
import { Services } from './components/Services';
import { HowItWorks } from './components/HowItWorks';
import { Pricing } from './components/Pricing';
import { Reviews } from './components/Reviews';
import { Portfolio } from './components/Portfolio';
import { Booking } from './components/Booking';
import { Contact } from './components/Contact';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <WhyUs />
      <Services />
      <HowItWorks />
      <Pricing />
      <Reviews />
      <Portfolio />
      <Booking />
      <Contact />
      <FinalCTA />
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
