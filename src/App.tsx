import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import Impact from './components/Impact';
import GetInvolved from './components/GetInvolved';
import Footer from './components/Footer';
import VolunteerMatching from './components/VolunteerMatching';
import Contact from './components/Contact';
import Donate from './components/Donate';
import FAQ from './components/FAQ';

function App() {
  // Simple routing based on hash
  const currentPage = window.location.hash.slice(1) || 'home';

  const renderPage = () => {
    switch (currentPage) {
      case 'contact':
        return <Contact />;
      case 'donate':
        return <Donate />;
      case 'faq':
        return <FAQ />;
      default:
        return (
          <>
            <Hero />
            <About />
            <Programs />
            <Impact />
            <GetInvolved />
            <VolunteerMatching />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {renderPage()}
      <Footer />
    </div>
  );
}

export default App;