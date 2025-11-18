/* ==========================================================================
   SENSOR-METEOROLOGY PRESENTATION - JAVASCRIPT

   TABLE OF CONTENTS:
   1. Map Initialization
   2. Time Example Interactive Demo
   3. Slide Animation Observer
   4. Utility Functions
   ========================================================================== */

/* ==========================================================================
   1. MAP INITIALIZATION
   ========================================================================== */

/**
 * Initialize the Leaflet map with KML data
 * Called when the DOM is loaded
 */
function initializeMap() {
    // Create interactive map with Leaflet.js
    var kmlMapInstance = L.map('kmlMap').setView([39.0, 35.0], 6);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(kmlMapInstance);

    // Load KML file
    var kmlLayer = omnivore.kml('MetrolojıSensorMatch.kml')
        .on('ready', function() {
            // Fit map to KML bounds when loaded
            kmlMapInstance.fitBounds(kmlLayer.getBounds());
            console.log('KML loaded successfully!');
        })
        .on('error', function(e) {
            console.error('KML loading error:', e);
            alert('Error loading KML file. Please ensure MetrolojıSensorMatch.kml is in the same folder as the HTML file.');
        })
        .addTo(kmlMapInstance);
}

/* ==========================================================================
   2. TIME EXAMPLE INTERACTIVE DEMO
   ========================================================================== */

/**
 * Show different time matching examples in the interactive demo
 * @param {string} example - The example type ('example1', 'example2', or 'example3')
 */
function showTimeExample(example) {
    const viz = document.getElementById('timeViz');

    if (!viz) {
        console.error('Time visualization element not found');
        return;
    }

    const examples = {
        // Example 1: Exact Match
        example1: `
            <h4 style="color: #10b981;">Exact Match</h4>
            <div style="padding: 20px; background: #f0fdf4; border-radius: 8px; margin: 20px 0;">
                <p><strong>Meteorology Reading:</strong> July 1, 2025, 10:00:00</p>
                <p><strong>Sensor Reading:</strong> July 1, 2025, 10:00:00</p>
                <p style="color: #10b981; font-weight: bold; font-size: 1.2em;">Time Difference: 0 minutes</p>
                <p>This is a perfect match! Measured at the same time.</p>
            </div>
            <div style="text-align: center; margin-top: 20px;">
                <div style="display: inline-block; padding: 15px 30px; background: #10b981; color: white; border-radius: 25px; font-weight: bold;">
                    MATCHED
                </div>
            </div>
        `,

        // Example 2: Within Tolerance
        example2: `
            <h4 style="color: #fbbf24;">Within Tolerance</h4>
            <div style="padding: 20px; background: #fffbeb; border-radius: 8px; margin: 20px 0;">
                <p><strong>Meteorology Reading:</strong> July 1, 2025, 09:45:00</p>
                <p><strong>Sensor Reading:</strong> July 1, 2025, 09:36:00</p>
                <p style="color: #fbbf24; font-weight: bold; font-size: 1.2em;">Time Difference: 9 minutes</p>
                <p>Tolerance: +/-30 minutes - 9 minutes &lt; 30 minutes - Acceptable!</p>
            </div>
            <div style="text-align: center; margin-top: 20px;">
                <div style="display: inline-block; width: 400px; height: 30px; background: linear-gradient(90deg, #10b981 0%, #fbbf24 30%, #ef4444 100%); border-radius: 15px; position: relative;">
                    <div style="position: absolute; width: 4px; height: 40px; background: black; left: 30%; top: -5px;"></div>
                </div>
                <p style="margin-top: 10px;">Tolerance Bar (9 minutes in green zone)</p>
                <div style="display: inline-block; padding: 15px 30px; background: #10b981; color: white; border-radius: 25px; font-weight: bold; margin-top: 20px;">
                    MATCHED
                </div>
            </div>
        `,

        // Example 3: Outside Tolerance
        example3: `
            <h4 style="color: #ef4444;">Outside Tolerance</h4>
            <div style="padding: 20px; background: #fef2f2; border-radius: 8px; margin: 20px 0;">
                <p><strong>Meteorology Reading:</strong> July 1, 2025, 12:00:00</p>
                <p><strong>Sensor Reading:</strong> July 1, 2025, 12:35:00</p>
                <p style="color: #ef4444; font-weight: bold; font-size: 1.2em;">Time Difference: 35 minutes</p>
                <p>Tolerance: +/-30 minutes - 35 minutes &gt; 30 minutes - Rejected!</p>
            </div>
            <div style="text-align: center; margin-top: 20px;">
                <div style="display: inline-block; width: 400px; height: 30px; background: linear-gradient(90deg, #10b981 0%, #fbbf24 30%, #ef4444 100%); border-radius: 15px; position: relative;">
                    <div style="position: absolute; width: 4px; height: 40px; background: black; left: 70%; top: -5px;"></div>
                </div>
                <p style="margin-top: 10px;">Tolerance Bar (35 minutes in red zone)</p>
                <div style="display: inline-block; padding: 15px 30px; background: #ef4444; color: white; border-radius: 25px; font-weight: bold; margin-top: 20px;">
                    NOT MATCHED
                </div>
            </div>
        `
    };

    viz.innerHTML = examples[example] || '<p style="text-align: center; color: #666;">Click the buttons above to see examples</p>';
}

/* ==========================================================================
   3. SLIDE ANIMATION OBSERVER
   ========================================================================== */

/**
 * Initialize intersection observer for slide animations
 * Slides fade in when they enter the viewport
 */
function initializeSlideAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('.slide').forEach(slide => {
        observer.observe(slide);
    });
}

/* ==========================================================================
   4. UTILITY FUNCTIONS
   ========================================================================== */

/**
 * Format a number with thousand separators
 * @param {number} num - The number to format
 * @returns {string} Formatted number string
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Toggle visibility of an element
 * @param {string} elementId - The ID of the element to toggle
 */
function toggleElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = element.style.display === 'none' ? 'block' : 'none';
    }
}

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize map
    initializeMap();

    // Initialize slide animations
    initializeSlideAnimations();

    console.log('Presentation initialized successfully!');
});
