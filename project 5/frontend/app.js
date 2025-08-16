const API_BASE = 'http://localhost:4000';

// Add seed button functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add seed button to the page
    const seedButton = document.createElement('button');
    seedButton.innerHTML = '🌱 Add Sample Data';
    seedButton.className = 'fixed top-4 right-4 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600';
    seedButton.onclick = addSeedData;
    document.body.appendChild(seedButton);
});

async function addSeedData() {
    try {
        const response = await fetch(`${API_BASE}/api/seed`, { method: 'POST' });
        const result = await response.json();
        if (result.ok) {
            alert(`✅ Added ${result.ngos} NGOs and ${result.volunteers} volunteers to the database!`);
        } else {
            alert('❌ Error adding seed data: ' + result.error);
        }
    } catch (error) {
        alert('❌ Error: ' + error.message);
    }
}

// Tab switching
document.getElementById('volunteer-tab').addEventListener('click', () => {
    document.getElementById('volunteer-tab').className = 'px-6 py-2 rounded-md bg-blue-500 text-white';
    document.getElementById('ngo-tab').className = 'px-6 py-2 rounded-md text-gray-600 hover:bg-gray-100';
    document.getElementById('volunteer-form').classList.remove('hidden');
    document.getElementById('ngo-form').classList.add('hidden');
    document.getElementById('results').classList.add('hidden');
});

document.getElementById('ngo-tab').addEventListener('click', () => {
    document.getElementById('ngo-tab').className = 'px-6 py-2 rounded-md bg-green-500 text-white';
    document.getElementById('volunteer-tab').className = 'px-6 py-2 rounded-md text-gray-600 hover:bg-gray-100';
    document.getElementById('ngo-form').classList.remove('hidden');
    document.getElementById('volunteer-form').classList.add('hidden');
    document.getElementById('results').classList.add('hidden');
});

// Volunteer registration
document.getElementById('volunteer-registration').addEventListener('submit', async (e) => {
    e.preventDefault();
    showLoading(true);

    const volunteerData = {
        type: 'volunteer',
        name: document.getElementById('vol-name').value,
        city: document.getElementById('vol-city').value,
        skills: document.getElementById('vol-skills').value.split(',').map(s => s.trim()).filter(Boolean),
        interests: document.getElementById('vol-interests').value.split(',').map(s => s.trim()).filter(Boolean),
        availability: document.getElementById('vol-availability').value,
        bio: document.getElementById('vol-bio').value
    };

    try {
        console.log('Registering volunteer:', volunteerData);
        
        // Register volunteer
        const registerResponse = await fetch(`${API_BASE}/api/profile/upsert`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(volunteerData)
        });
        
        const registerResult = await registerResponse.json();
        console.log('Registration result:', registerResult);
        
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
        console.log('Recommendations result:', recommendResult);
        
        if (!recommendResult.ok) throw new Error(recommendResult.error);

        showRecommendations(recommendResult.results, 'NGO');
    } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
    } finally {
        showLoading(false);
    }
});

// NGO registration
document.getElementById('ngo-registration').addEventListener('submit', async (e) => {
    e.preventDefault();
    showLoading(true);

    const ngoData = {
        type: 'ngo',
        name: document.getElementById('ngo-name').value,
        city: document.getElementById('ngo-city').value,
        cause: document.getElementById('ngo-cause').value,
        needs: document.getElementById('ngo-needs').value.split(',').map(s => s.trim()).filter(Boolean),
        schedule: document.getElementById('ngo-schedule').value,
        description: document.getElementById('ngo-description').value
    };

    try {
        console.log('Registering NGO:', ngoData);
        
        // Register NGO
        const registerResponse = await fetch(`${API_BASE}/api/profile/upsert`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ngoData)
        });
        
        const registerResult = await registerResponse.json();
        console.log('Registration result:', registerResult);
        
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
        console.log('Recommendations result:', recommendResult);
        
        if (!recommendResult.ok) throw new Error(recommendResult.error);

        showRecommendations(recommendResult.results, 'Volunteer');
    } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
    } finally {
        showLoading(false);
    }
});

function showLoading(show) {
    document.getElementById('loading').classList.toggle('hidden', !show);
}

function showRecommendations(results, type) {
    const resultsDiv = document.getElementById('results');
    const listDiv = document.getElementById('recommendations-list');
    
    resultsDiv.classList.remove('hidden');
    listDiv.innerHTML = '';

    if (results.length === 0) {
        listDiv.innerHTML = '<p class="text-gray-500">No recommendations found. Try expanding your search criteria or add more data.</p>';
        return;
    }

    results.forEach(item => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500';
        
        if (type === 'NGO') {
            card.innerHTML = `
                <h3 class="font-semibold text-lg">${item.name}</h3>
                <p class="text-gray-600">${item.city}</p>
                <p class="text-sm text-gray-500 mb-2">Cause: ${item.cause || 'Not specified'}</p>
                <p class="text-sm text-gray-500 mb-2">Looking for: ${(item.needs || []).join(', ')}</p>
                <div class="flex justify-between items-center mt-3">
                    <span class="text-sm font-medium text-blue-600">Match: ${Math.round(item.score * 100)}%</span>
                    <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Contact</button>
                </div>
            `;
        } else {
            card.innerHTML = `
                <h3 class="font-semibold text-lg">${item.name}</h3>
                <p class="text-gray-600">${item.city}</p>
                <p class="text-sm text-gray-500 mb-2">Skills: ${(item.skills || []).join(', ')}</p>
                <p class="text-sm text-gray-500 mb-2">Interests: ${(item.interests || []).join(', ')}</p>
                <p class="text-sm text-gray-500 mb-2">Available: ${item.availability || 'Not specified'}</p>
                <div class="flex justify-between items-center mt-3">
                    <span class="text-sm font-medium text-green-600">Match: ${Math.round(item.score * 100)}%</span>
                    <button class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Contact</button>
                </div>
            `;
        }
        
        listDiv.appendChild(card);
    });
}
