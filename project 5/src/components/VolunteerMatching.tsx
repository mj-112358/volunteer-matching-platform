import React, { useState } from 'react';
import { Users, Building2, Brain, Sparkles, ArrowRight, Loader2 } from 'lucide-react';

const API_BASE = 'http://localhost:4000';

interface MatchResult {
  _id: string;
  name: string;
  city: string;
  cause?: string;
  needs?: string[];
  skills?: string[];
  interests?: string[];
  availability?: string;
  score: number;
}

const VolunteerMatching: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'volunteer' | 'ngo' | 'semantic'>('volunteer');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<MatchResult[]>([]);
  const [semanticQuery, setSemanticQuery] = useState('');
  const [semanticResults, setSemanticResults] = useState<any[]>([]);

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const volunteerData = {
      type: 'volunteer',
      name: formData.get('name') as string,
      city: formData.get('city') as string,
      skills: (formData.get('skills') as string).split(',').map(s => s.trim()).filter(Boolean),
      interests: (formData.get('interests') as string).split(',').map(s => s.trim()).filter(Boolean),
      availability: formData.get('availability') as string,
      bio: formData.get('bio') as string
    };

    try {
      // Register volunteer
      const registerResponse = await fetch(`${API_BASE}/api/profile/upsert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(volunteerData)
      });
      
      const registerResult = await registerResponse.json();
      if (!registerResult.ok) throw new Error(registerResult.error);

      // Get NGO recommendations
      const recommendResponse = await fetch(`${API_BASE}/api/recommend/ngos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          volunteerId: registerResult.id,
          city: volunteerData.city 
        })
      });

      const recommendResult = await recommendResponse.json();
      if (!recommendResult.ok) throw new Error(recommendResult.error);

      setResults(recommendResult.results);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNgoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const ngoData = {
      type: 'ngo',
      name: formData.get('name') as string,
      city: formData.get('city') as string,
      cause: formData.get('cause') as string,
      needs: (formData.get('needs') as string).split(',').map(s => s.trim()).filter(Boolean),
      schedule: formData.get('schedule') as string,
      description: formData.get('description') as string
    };

    try {
      // Register NGO
      const registerResponse = await fetch(`${API_BASE}/api/profile/upsert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ngoData)
      });
      
      const registerResult = await registerResponse.json();
      if (!registerResult.ok) throw new Error(registerResult.error);

      // Get volunteer recommendations
      const recommendResponse = await fetch(`${API_BASE}/api/recommend/volunteers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ngoId: registerResult.id,
          city: ngoData.city 
        })
      });

      const recommendResult = await recommendResponse.json();
      if (!recommendResult.ok) throw new Error(recommendResult.error);

      setResults(recommendResult.results);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSemanticSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/test/semantic`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      
      const result = await response.json();
      if (result.ok) {
        setSemanticResults(result.results);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const seedData = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/seed`, { method: 'POST' });
      const result = await response.json();
      if (result.ok) {
        alert(`✅ Added ${result.ngos} NGOs and ${result.volunteers} volunteers!`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <section id="volunteer-matching" className="py-32 bg-gradient-to-br from-gray-50 via-white to-violet-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-100 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-violet-50 border border-violet-200/50 text-violet-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Matching
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Volunteer Match
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Our AI understands your passions and connects you with meaningful opportunities
          </p>

          <button 
            onClick={seedData}
            className="mt-6 inline-flex items-center px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-all duration-200 text-sm font-medium"
          >
            🌱 Add Sample Data
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-2xl p-2 border border-gray-200/50 shadow-lg shadow-gray-200/50">
            <button
              onClick={() => setActiveTab('volunteer')}
              className={`inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'volunteer'
                  ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Users className="w-4 h-4 mr-2" />
              I'm a Volunteer
            </button>
            
            <button
              onClick={() => setActiveTab('ngo')}
              className={`inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'ngo'
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Building2 className="w-4 h-4 mr-2" />
              I'm an NGO
            </button>
            
            <button
              onClick={() => setActiveTab('semantic')}
              className={`inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'semantic'
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Brain className="w-4 h-4 mr-2" />
              AI Search Test
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {/* Volunteer Form */}
          {activeTab === 'volunteer' && (
            <div className="bg-white rounded-3xl p-8 border border-gray-200/50 shadow-xl shadow-gray-200/50">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Find NGOs That Need Your Skills
              </h3>
              
              <form onSubmit={handleVolunteerSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                      placeholder="Your city"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                  <textarea
                    name="skills"
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                    placeholder="web development, teaching, marketing, design..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
                  <textarea
                    name="interests"
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                    placeholder="education, environment, healthcare, technology..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                  <input
                    type="text"
                    name="availability"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                    placeholder="weekends, 10 hours/week, flexible..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">About You</label>
                  <textarea
                    name="bio"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                    placeholder="Tell us about your passion for volunteering..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white py-4 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  ) : (
                    <Sparkles className="w-5 h-5 mr-2" />
                  )}
                  Find My Perfect NGO Match
                </button>
              </form>
            </div>
          )}

          {/* NGO Form */}
          {activeTab === 'ngo' && (
            <div className="bg-white rounded-3xl p-8 border border-gray-200/50 shadow-xl shadow-gray-200/50">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Find Volunteers Who Share Your Mission
              </h3>
              
              <form onSubmit={handleNgoSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Your organization name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Your city"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cause/Focus Area</label>
                  <input
                    type="text"
                    name="cause"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="education, environment, healthcare, poverty..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">What Volunteers Do You Need?</label>
                  <textarea
                    name="needs"
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="teachers, developers, marketers, event coordinators..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
                  <input
                    type="text"
                    name="schedule"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="flexible, weekends only, remote work..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">About Your Organization</label>
                  <textarea
                    name="description"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Describe your mission and volunteer opportunities..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-4 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  ) : (
                    <Sparkles className="w-5 h-5 mr-2" />
                  )}
                  Find Perfect Volunteers
                </button>
              </form>
            </div>
          )}

          {/* Semantic Search */}
          {activeTab === 'semantic' && (
            <div className="bg-white rounded-3xl p-8 border border-gray-200/50 shadow-xl shadow-gray-200/50">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Test AI Semantic Understanding
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Try different keywords to see how AI understands meaning:
                  </label>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {['programming', 'teaching', 'environment', 'healthcare', 'coding', 'mentoring', 'sustainability', 'medical'].map((keyword) => (
                      <button
                        key={keyword}
                        onClick={() => {
                          setSemanticQuery(keyword);
                          handleSemanticSearch(keyword);
                        }}
                        className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-all duration-200 text-sm font-medium border border-emerald-200"
                      >
                        {keyword}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={semanticQuery}
                    onChange={(e) => setSemanticQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSemanticSearch(semanticQuery)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                    placeholder="Or type your own keyword..."
                  />
                  <button
                    onClick={() => handleSemanticSearch(semanticQuery)}
                    disabled={loading || !semanticQuery.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Brain className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {(results.length > 0 || semanticResults.length > 0) && (
          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              {activeTab === 'semantic' ? 'AI Semantic Matches' : 'Your Perfect Matches'}
            </h3>
            
            <div className="grid gap-6">
              {activeTab === 'semantic' ? (
                semanticResults.map((result, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-200">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">{result.name}</h4>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                        {result.score}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">
                      <strong>Focus:</strong> {result.cause}
                    </p>
                    <p className="text-sm text-gray-500">
                      {result.matchReason}
                    </p>
                  </div>
                ))
              ) : (
                results.map((result) => (
                  <div key={result._id} className="bg-white rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-200">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">{result.name}</h4>
                      <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
                        {Math.round(result.score * 100)}% match
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-gray-600">
                      <p><strong>Location:</strong> {result.city}</p>
                      {result.cause && <p><strong>Cause:</strong> {result.cause}</p>}
                      {result.needs && <p><strong>Looking for:</strong> {result.needs.join(', ')}</p>}
                      {result.skills && <p><strong>Skills:</strong> {result.skills.join(', ')}</p>}
                      {result.interests && <p><strong>Interests:</strong> {result.interests.join(', ')}</p>}
                      {result.availability && <p><strong>Available:</strong> {result.availability}</p>}
                    </div>
                    
                    <button className="mt-4 inline-flex items-center text-violet-600 hover:text-violet-700 font-medium transition-colors duration-200">
                      Connect Now
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VolunteerMatching;
