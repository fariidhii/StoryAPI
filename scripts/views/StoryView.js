class StoryView {
    constructor() {
        this._content = document.getElementById('content');
    }

    showStories(stories) {
        this._content.innerHTML = `
            <div class="story-list">
                ${stories.map(story => this._createStoryElement(story)).join('')}
            </div>
        `;

        // Initialize map
        this._initMap(stories);
    }

    _createStoryElement(story) {
        return `
            <article class="story-item">
                <img src="${story.photoUrl}" alt="${story.description}" loading="lazy">
                <div class="story-item__content">
                    <h2>${story.name}</h2>
                    <p>${story.description}</p>
                    <p>Created: ${new Date(story.createdAt).toLocaleDateString()}</p>
                </div>
            </article>
        `;
    }

    _initMap(stories) {
        // Create map container
        const mapContainer = document.createElement('div');
        mapContainer.id = 'map';
        this._content.insertBefore(mapContainer, this._content.firstChild);

        // Initialize Leaflet map
        const map = L.map('map').setView([0, 0], 2);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Add markers for stories with location
        stories.forEach(story => {
            if (story.lat && story.lon) {
                const marker = L.marker([story.lat, story.lon]).addTo(map);
                marker.bindPopup(`
                    <h3>${story.name}</h3>
                    <p>${story.description}</p>
                    <img src="${story.photoUrl}" alt="${story.description}" style="max-width:200px;max-height:200px;display:block;" width="200" />
                `);
            }
        });

        // Fit map bounds to show all markers
        const bounds = L.latLngBounds(stories
            .filter(story => story.lat && story.lon)
            .map(story => [story.lat, story.lon])
        );
        if (bounds.isValid()) {
            map.fitBounds(bounds);
        }
    }

    showError(message) {
        this._content.innerHTML = `
            <div class="error-message">
                <h2>Error</h2>
                <p>${message}</p>
            </div>
        `;
    }

    showLoading() {
        this._content.innerHTML = `
            <div class="loading">
                <p>Loading stories...</p>
            </div>
        `;
    }
}

export default StoryView; 