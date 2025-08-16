import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import Impact from './components/Impact';
import GetInvolved from './components/GetInvolved';
import Footer from './components/Footer';
import VolunteerMatching from './components/VolunteerMatching';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Hero />
      <About />
      <Programs />
      <Impact />
      <GetInvolved />
  {/* Volunteer Matching Tab Section */}
  <VolunteerMatching />
      <Footer />
    </div>
  );
}

export default App;