import React, { useState } from 'react';
import { Users, Building2, Sparkles, ArrowRight, Loader2, X, Mail, Phone, Brain } from 'lucide-react';

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
	email?: string;
	phone?: string;
}

const VolunteerMatching: React.FC = () => {
	const [activeTab, setActiveTab] = useState<'volunteer' | 'ngo' | 'semantic'>('volunteer');
	const [loading, setLoading] = useState(false);
	const [results, setResults] = useState<MatchResult[]>([]);
	const [semanticQuery, setSemanticQuery] = useState('');
	const [semanticResults, setSemanticResults] = useState<any[]>([]);
	const [showContactModal, setShowContactModal] = useState(false);
	const [selectedContact, setSelectedContact] = useState<MatchResult | null>(null);
	const [error, setError] = useState<string>('');
	const [success, setSuccess] = useState<string>('');

	const handleVolunteerSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setSuccess('');
    
		const formData = new FormData(e.target as HTMLFormElement);
		const volunteerData = {
			type: 'volunteer',
			name: formData.get('name') as string,
			city: formData.get('city') as string,
			email: formData.get('email') as string,
			phone: formData.get('phone') as string,
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
			if (!registerResult.ok) {
				setError(registerResult.error || 'Failed to register volunteer');
				return;
			}

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
			if (!recommendResult.ok) {
				setError(recommendResult.error || 'Failed to get recommendations');
				return;
			}

			if (recommendResult.results.length === 0) {
				setError('No suitable NGOs found in your area. Try expanding your search or check back later!');
				return;
			}

			setResults(recommendResult.results);
			setSuccess(`Found ${recommendResult.results.length} perfect matches for you!`);
		} catch (error) {
			console.error('Error:', error);
			setError(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const handleNgoSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setSuccess('');
		e.preventDefault();
		setLoading(true);
    
		const formData = new FormData(e.target as HTMLFormElement);
		const ngoData = {
			type: 'ngo',
			name: formData.get('name') as string,
			city: formData.get('city') as string,
			email: formData.get('email') as string,
			phone: formData.get('phone') as string,
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

			if (recommendResult.results.length === 0) {
				setError('No suitable volunteers found. Try broadening your search criteria.');
				return;
			}
			setResults(recommendResult.results);
			setSuccess(`Found ${recommendResult.results.length} perfect volunteer matches for your NGO!`);
		} catch (error) {
			console.error('Error:', error);
			setError(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const handleConnectNow = (result: MatchResult) => {
		setSelectedContact(result);
		setShowContactModal(true);
	};

	const handleSemanticSearch = async (query: string) => {
		if (!query.trim()) return;
		
		setLoading(true);
		setError('');
		setSuccess('');
		try {
			const response = await fetch(`${API_BASE}/api/semantic-search`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ query })
			});
			
			const result = await response.json();
			if (result.ok) {
				if (result.results.length === 0) {
					setError('No matches found for your search. Try different keywords.');
					return;
				}
				setSemanticResults(result.results || []);
				setSuccess(`Found ${result.results.length} matches for your search!`);
			} else {
				throw new Error(result.error);
			}
		} catch (error) {
			console.error('Semantic search error:', error);
			setError(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const closeContactModal = () => {
		setShowContactModal(false);
		setSelectedContact(null);
	};

	return (
		<section id="volunteer-matching" className="py-32 bg-gradient-to-br from-orange-50 via-white to-amber-50 relative overflow-hidden">
			{/* Background Effects */}
			<div className="absolute inset-0">
				<div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-20 animate-pulse"></div>
				<div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
			</div>

			<div className="relative max-w-6xl mx-auto px-6">
				{/* Error and Success Messages */}
				{error && (
					<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
						<div className="flex items-center">
							<span className="text-red-500 mr-2">⚠️</span>
							{error}
						</div>
					</div>
				)}
				{success && (
					<div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
						<div className="flex items-center">
							<span className="text-green-500 mr-2">✅</span>
							{success}
						</div>
					</div>
				)}

				{/* Header */}
				<div className="text-center mb-16">
					<div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-50 border border-orange-200/50 text-orange-700 text-sm font-medium mb-6">
						<Sparkles className="w-4 h-4 mr-2" />
						AI-Powered Matching
					</div>
          
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
						Find Your Perfect
						<span className="block bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">
							Volunteer Match
						</span>
					</h2>
          
					<p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
						Our AI understands your passions and connects you with meaningful opportunities
					</p>
				</div>

				{/* Navigation Tabs */}
				<div className="flex justify-center mb-12">
					<div className="bg-white rounded-2xl p-2 border border-gray-200/50 shadow-lg shadow-gray-200/50">
						<button
							onClick={() => setActiveTab('volunteer')}
							className={`inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
								activeTab === 'volunteer'
									? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg'
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
									? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg'
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
									? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg'
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
											className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
											placeholder="Enter your name"
										/>
									</div>
                  
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">City</label>
										<input
											type="text"
											name="city"
											required
											className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
											placeholder="Your city"
										/>
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
										<input
											type="email"
											name="email"
											required
											className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
											placeholder="your.email@example.com"
										/>
									</div>
                  
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
										<input
											type="tel"
											name="phone"
											required
											className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
											placeholder="+1 (555) 123-4567"
										/>
									</div>
								</div>
                
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
									<textarea
										name="skills"
										rows={2}
										className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
										placeholder="web development, teaching, marketing, design..."
									/>
								</div>
                
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
									<textarea
										name="interests"
										rows={2}
										className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
										placeholder="education, environment, healthcare, technology..."
									/>
								</div>
                
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
									<input
										type="text"
										name="availability"
										className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
										placeholder="weekends, 10 hours/week, flexible..."
									/>
								</div>
                
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">About You</label>
									<textarea
										name="bio"
										rows={3}
										className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
										placeholder="Tell us about your passion for volunteering..."
									/>
								</div>
                
								<button
									type="submit"
									disabled={loading}
									className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white py-4 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
											className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
											placeholder="Your organization name"
										/>
									</div>
                  
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">City</label>
										<input
											type="text"
											name="city"
											required
											className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
											placeholder="Your city"
										/>
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
										<input
											type="email"
											name="email"
											required
											className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
											placeholder="contact@yourorg.com"
										/>
									</div>
                  
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
										<input
											type="tel"
											name="phone"
											required
											className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
											placeholder="+1 (555) 123-4567"
										/>
									</div>
								</div>
                
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">Cause/Focus Area</label>
									<input
										type="text"
										name="cause"
										className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
										placeholder="education, environment, healthcare, poverty..."
									/>
								</div>
                
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">What Volunteers Do You Need?</label>
									<textarea
										name="needs"
										rows={2}
										className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
										placeholder="teachers, developers, marketers, event coordinators..."
									/>
								</div>
                
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
									<input
										type="text"
										name="schedule"
										className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
										placeholder="flexible, weekends only, remote work..."
									/>
								</div>
                
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">About Your Organization</label>
									<textarea
										name="description"
										rows={3}
										className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
										placeholder="Describe your mission and volunteer opportunities..."
									/>
								</div>
                
								<button
									type="submit"
									disabled={loading}
									className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white py-4 rounded-xl font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
												className="px-4 py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded-lg transition-all duration-200 text-sm font-medium border border-orange-200"
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
										className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
										placeholder="Or type your own keyword..."
									/>
									<button
										onClick={() => handleSemanticSearch(semanticQuery)}
										disabled={loading || !semanticQuery.trim()}
										className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
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
											<span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
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
											<span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
												{Math.round(result.score * 100)}% match
											</span>
										</div>
                    
										<div className="space-y-2 text-gray-600 mb-4">
											<p><strong>Location:</strong> {result.city}</p>
											{result.cause && <p><strong>Cause:</strong> {result.cause}</p>}
											{result.needs && <p><strong>Looking for:</strong> {result.needs.join(', ')}</p>}
											{result.skills && <p><strong>Skills:</strong> {result.skills.join(', ')}</p>}
											{result.interests && <p><strong>Interests:</strong> {result.interests.join(', ')}</p>}
											{result.availability && <p><strong>Available:</strong> {result.availability}</p>}
										</div>
                    
										<button 
											onClick={() => handleConnectNow(result)}
											className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200"
										>
											Connect Now
											<ArrowRight className="w-4 h-4 ml-1" />
										</button>
									</div>
								))
							)}
						</div>
					</div>
				)}

				{/* Contact Modal */}
				{showContactModal && selectedContact && (
					<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
						<div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
							<div className="flex justify-between items-start mb-6">
								<h3 className="text-2xl font-bold text-gray-900">Contact Information</h3>
								<button
									onClick={closeContactModal}
									className="text-gray-400 hover:text-gray-600 transition-colors"
								>
									<X className="w-6 h-6" />
								</button>
							</div>
              
							<div className="space-y-4">
								<div>
									<h4 className="text-lg font-semibold text-gray-900 mb-2">{selectedContact.name}</h4>
									<p className="text-gray-600"><strong>Location:</strong> {selectedContact.city}</p>
									{selectedContact.cause && <p className="text-gray-600"><strong>Cause:</strong> {selectedContact.cause}</p>}
								</div>
                
								<div className="border-t pt-4">
									<h5 className="font-medium text-gray-900 mb-3">Contact Details:</h5>
									<div className="space-y-3">
										{selectedContact.email && (
											<div className="flex items-center text-gray-600">
												<Mail className="w-5 h-5 mr-3 text-orange-500" />
												<span>{selectedContact.email}</span>
											</div>
										)}
										{selectedContact.phone && (
											<div className="flex items-center text-gray-600">
												<Phone className="w-5 h-5 mr-3 text-orange-500" />
												<span>{selectedContact.phone}</span>
											</div>
										)}
									</div>
								</div>
                
								<div className="flex gap-3 pt-4">
									{selectedContact.email && (
										<a
											href={`mailto:${selectedContact.email}`}
											className="flex-1 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-200 text-center"
										>
											Send Email
										</a>
									)}
									{selectedContact.phone && (
										<a
											href={`tel:${selectedContact.phone}`}
											className="flex-1 bg-white border-2 border-orange-500 text-orange-600 hover:bg-orange-50 py-3 px-4 rounded-xl font-medium transition-all duration-200 text-center"
										>
											Call Now
										</a>
									)}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default VolunteerMatching;
