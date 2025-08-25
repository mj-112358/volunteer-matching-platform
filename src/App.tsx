import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import VolunteerMatching from './components/VolunteerMatching';
import Impact from './components/Impact';
import GetInvolved from './components/GetInvolved';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Hero />
      <About />
      <Programs />
      <VolunteerMatching />
      <Impact />
      <GetInvolved />
      <Footer />
    </div>
  );
}

export default App;