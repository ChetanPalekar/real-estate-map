document.addEventListener('DOMContentLoaded', () => {
    // Initialize map with OpenStreetMap (free, no API key required)
    const map = L.map('map').setView([45, -100], 3); // Centered to show North America and India

    // Add OpenStreetMap tiles (free)
    let currentTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Map style options (all free)
    const mapStyles = {
        'OpenStreetMap': 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'Satellite': 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        'Dark': 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        'Light': 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        'Terrain': 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
    };

    // Add style selector
    const styleSelect = document.createElement('select');
    styleSelect.id = 'style-select';
    styleSelect.innerHTML = `
        <option value="OpenStreetMap">OpenStreetMap</option>
        <option value="Satellite">Satellite</option>
        <option value="Dark">Dark</option>
        <option value="Light">Light</option>
        <option value="Terrain">Terrain</option>
    `;
    document.querySelector('.controls').appendChild(styleSelect);

    // Style selector event listener
    styleSelect.addEventListener('change', (e) => {
        const selectedStyle = e.target.value;
        map.removeLayer(currentTileLayer);
        
        // Set appropriate attribution for each provider
        let attribution = '© OpenStreetMap contributors';
        if (selectedStyle === 'Satellite') {
            attribution = '© Esri';
        } else if (selectedStyle === 'Dark' || selectedStyle === 'Light') {
            attribution = '© CartoDB';
        } else if (selectedStyle === 'Terrain') {
            attribution = '© OpenTopoMap';
        }
        
        currentTileLayer = L.tileLayer(mapStyles[selectedStyle], {
            attribution: attribution
        }).addTo(map);
    });

    // Generate realistic real estate data for cities worldwide
    function generateRealEstateData() {
        const cities = [
            // US Cities (Tier 1 - Major Metros)
            { name: 'New York', country: 'United States', coords: [40.7128, -74.0060], basePrice: 1200, currency: 'USD' },
            { name: 'Los Angeles', country: 'United States', coords: [34.0522, -118.2437], basePrice: 800, currency: 'USD' },
            { name: 'Chicago', country: 'United States', coords: [41.8781, -87.6298], basePrice: 350, currency: 'USD' },
            { name: 'Houston', country: 'United States', coords: [29.7604, -95.3698], basePrice: 200, currency: 'USD' },
            { name: 'Phoenix', country: 'United States', coords: [33.4484, -112.0740], basePrice: 250, currency: 'USD' },
            { name: 'Philadelphia', country: 'United States', coords: [39.9526, -75.1652], basePrice: 300, currency: 'USD' },
            { name: 'San Antonio', country: 'United States', coords: [29.4241, -98.4936], basePrice: 180, currency: 'USD' },
            { name: 'San Diego', country: 'United States', coords: [32.7157, -117.1611], basePrice: 700, currency: 'USD' },
            { name: 'Dallas', country: 'United States', coords: [32.7767, -96.7970], basePrice: 250, currency: 'USD' },
            { name: 'San Jose', country: 'United States', coords: [37.3382, -121.8863], basePrice: 900, currency: 'USD' },
            
            // US Cities (Tier 2 - Large Cities)
            { name: 'Austin', country: 'United States', coords: [30.2672, -97.7431], basePrice: 400, currency: 'USD' },
            { name: 'Jacksonville', country: 'United States', coords: [30.3322, -81.6557], basePrice: 200, currency: 'USD' },
            { name: 'Fort Worth', country: 'United States', coords: [32.7555, -97.3308], basePrice: 200, currency: 'USD' },
            { name: 'Columbus', country: 'United States', coords: [39.9612, -82.9988], basePrice: 180, currency: 'USD' },
            { name: 'Charlotte', country: 'United States', coords: [35.2271, -80.8431], basePrice: 250, currency: 'USD' },
            { name: 'San Francisco', country: 'United States', coords: [37.7749, -122.4194], basePrice: 1200, currency: 'USD' },
            { name: 'Indianapolis', country: 'United States', coords: [39.7684, -86.1581], basePrice: 150, currency: 'USD' },
            { name: 'Seattle', country: 'United States', coords: [47.6062, -122.3321], basePrice: 600, currency: 'USD' },
            { name: 'Denver', country: 'United States', coords: [39.7392, -104.9903], basePrice: 400, currency: 'USD' },
            { name: 'Washington', country: 'United States', coords: [38.9072, -77.0369], basePrice: 500, currency: 'USD' },
            
            // US Cities (Tier 3 - Medium Cities)
            { name: 'Boston', country: 'United States', coords: [42.3601, -71.0589], basePrice: 700, currency: 'USD' },
            { name: 'El Paso', country: 'United States', coords: [31.7619, -106.4850], basePrice: 150, currency: 'USD' },
            { name: 'Nashville', country: 'United States', coords: [36.1627, -86.7816], basePrice: 300, currency: 'USD' },
            { name: 'Detroit', country: 'United States', coords: [42.3314, -83.0458], basePrice: 100, currency: 'USD' },
            { name: 'Oklahoma City', country: 'United States', coords: [35.4676, -97.5164], basePrice: 120, currency: 'USD' },
            { name: 'Portland', country: 'United States', coords: [45.5152, -122.6784], basePrice: 400, currency: 'USD' },
            { name: 'Las Vegas', country: 'United States', coords: [36.1699, -115.1398], basePrice: 250, currency: 'USD' },
            { name: 'Memphis', country: 'United States', coords: [35.1495, -90.0490], basePrice: 120, currency: 'USD' },
            { name: 'Louisville', country: 'United States', coords: [38.2527, -85.7585], basePrice: 150, currency: 'USD' },
            { name: 'Baltimore', country: 'United States', coords: [39.2904, -76.6122], basePrice: 200, currency: 'USD' },
            
            // US Cities within 500km of existing cities - New York Metro Area
            { name: 'Newark', country: 'United States', coords: [40.7357, -74.1724], basePrice: 800, currency: 'USD' },
            { name: 'Jersey City', country: 'United States', coords: [40.7178, -74.0431], basePrice: 900, currency: 'USD' },
            { name: 'Yonkers', country: 'United States', coords: [40.9312, -73.8987], basePrice: 600, currency: 'USD' },
            { name: 'Buffalo', country: 'United States', coords: [42.8864, -78.8784], basePrice: 120, currency: 'USD' },
            { name: 'Rochester', country: 'United States', coords: [43.1566, -77.6088], basePrice: 100, currency: 'USD' },
            { name: 'Syracuse', country: 'United States', coords: [43.0481, -76.1474], basePrice: 80, currency: 'USD' },
            { name: 'Albany', country: 'United States', coords: [42.6526, -73.7562], basePrice: 150, currency: 'USD' },
            { name: 'Bridgeport', country: 'United States', coords: [41.1792, -73.1894], basePrice: 400, currency: 'USD' },
            { name: 'New Haven', country: 'United States', coords: [41.3083, -72.9279], basePrice: 300, currency: 'USD' },
            { name: 'Providence', country: 'United States', coords: [41.8240, -71.4128], basePrice: 350, currency: 'USD' },
            
            // US Cities within 500km - Los Angeles Metro Area
            { name: 'Long Beach', country: 'United States', coords: [33.7701, -118.1937], basePrice: 700, currency: 'USD' },
            { name: 'Anaheim', country: 'United States', coords: [33.8366, -117.9143], basePrice: 600, currency: 'USD' },
            { name: 'Santa Ana', country: 'United States', coords: [33.7455, -117.8677], basePrice: 650, currency: 'USD' },
            { name: 'Irvine', country: 'United States', coords: [33.6846, -117.8265], basePrice: 800, currency: 'USD' },
            { name: 'Riverside', country: 'United States', coords: [33.9533, -117.3962], basePrice: 400, currency: 'USD' },
            { name: 'Bakersfield', country: 'United States', coords: [35.3733, -119.0187], basePrice: 200, currency: 'USD' },
            { name: 'Fresno', country: 'United States', coords: [36.7378, -119.7871], basePrice: 250, currency: 'USD' },
            { name: 'Oxnard', country: 'United States', coords: [34.1975, -119.1771], basePrice: 500, currency: 'USD' },
            { name: 'Ontario', country: 'United States', coords: [34.0633, -117.6509], basePrice: 450, currency: 'USD' },
            { name: 'Palm Springs', country: 'United States', coords: [33.8303, -116.5453], basePrice: 300, currency: 'USD' },
            
            // US Cities within 500km - Chicago Metro Area
            { name: 'Aurora', country: 'United States', coords: [41.7606, -88.3201], basePrice: 200, currency: 'USD' },
            { name: 'Naperville', country: 'United States', coords: [41.7508, -88.1535], basePrice: 350, currency: 'USD' },
            { name: 'Springfield', country: 'United States', coords: [39.7817, -89.6501], basePrice: 100, currency: 'USD' },
            { name: 'Peoria', country: 'United States', coords: [40.6936, -89.5890], basePrice: 80, currency: 'USD' },
            { name: 'Rockford', country: 'United States', coords: [42.2711, -89.0940], basePrice: 90, currency: 'USD' },
            { name: 'Champaign', country: 'United States', coords: [40.1164, -88.2434], basePrice: 120, currency: 'USD' },
            { name: 'Bloomington', country: 'United States', coords: [40.4842, -88.9937], basePrice: 110, currency: 'USD' },
            { name: 'Decatur', country: 'United States', coords: [39.8403, -88.9548], basePrice: 70, currency: 'USD' },
            { name: 'Joliet', country: 'United States', coords: [41.5250, -88.0817], basePrice: 150, currency: 'USD' },
            { name: 'Elgin', country: 'United States', coords: [42.0372, -88.2811], basePrice: 180, currency: 'USD' },
            
            // US Cities within 500km - Houston Metro Area
            { name: 'Sugar Land', country: 'United States', coords: [29.6197, -95.6349], basePrice: 250, currency: 'USD' },
            { name: 'The Woodlands', country: 'United States', coords: [30.1658, -95.4613], basePrice: 300, currency: 'USD' },
            { name: 'College Station', country: 'United States', coords: [30.6280, -96.3344], basePrice: 180, currency: 'USD' },
            { name: 'Beaumont', country: 'United States', coords: [30.0802, -94.1266], basePrice: 120, currency: 'USD' },
            { name: 'Galveston', country: 'United States', coords: [29.3013, -94.7977], basePrice: 200, currency: 'USD' },
            { name: 'Lake Jackson', country: 'United States', coords: [29.0339, -95.4344], basePrice: 180, currency: 'USD' },
            { name: 'Bryan', country: 'United States', coords: [30.6744, -96.3698], basePrice: 150, currency: 'USD' },
            { name: 'Victoria', country: 'United States', coords: [28.8053, -97.0036], basePrice: 130, currency: 'USD' },
            { name: 'Corpus Christi', country: 'United States', coords: [27.8006, -97.3964], basePrice: 160, currency: 'USD' },
            { name: 'Laredo', country: 'United States', coords: [27.5064, -99.5075], basePrice: 140, currency: 'USD' },
            
            // US Cities within 500km - Dallas Metro Area
            { name: 'Arlington', country: 'United States', coords: [32.7357, -97.1081], basePrice: 200, currency: 'USD' },
            { name: 'Plano', country: 'United States', coords: [33.0198, -96.6989], basePrice: 280, currency: 'USD' },
            { name: 'Irving', country: 'United States', coords: [32.8140, -96.9489], basePrice: 220, currency: 'USD' },
            { name: 'Frisco', country: 'United States', coords: [33.1507, -96.8236], basePrice: 320, currency: 'USD' },
            { name: 'McKinney', country: 'United States', coords: [33.1972, -96.6397], basePrice: 250, currency: 'USD' },
            { name: 'Tyler', country: 'United States', coords: [32.3513, -95.3011], basePrice: 150, currency: 'USD' },
            { name: 'Waco', country: 'United States', coords: [31.5493, -97.1467], basePrice: 120, currency: 'USD' },
            { name: 'Sherman', country: 'United States', coords: [33.6357, -96.6089], basePrice: 100, currency: 'USD' },
            { name: 'Texarkana', country: 'United States', coords: [33.4251, -94.0477], basePrice: 110, currency: 'USD' },
            { name: 'Longview', country: 'United States', coords: [32.5007, -94.7405], basePrice: 130, currency: 'USD' },
            
            // US Cities within 500km - San Francisco Metro Area
            { name: 'Oakland', country: 'United States', coords: [37.8044, -122.2711], basePrice: 800, currency: 'USD' },
            { name: 'Fremont', country: 'United States', coords: [37.5485, -121.9886], basePrice: 1000, currency: 'USD' },
            { name: 'Sacramento', country: 'United States', coords: [38.5816, -121.4944], basePrice: 400, currency: 'USD' },
            { name: 'Stockton', country: 'United States', coords: [37.9577, -121.2908], basePrice: 300, currency: 'USD' },
            { name: 'Modesto', country: 'United States', coords: [37.6391, -120.9969], basePrice: 280, currency: 'USD' },
            { name: 'Santa Rosa', country: 'United States', coords: [38.4404, -122.7141], basePrice: 500, currency: 'USD' },
            { name: 'Vallejo', country: 'United States', coords: [38.1041, -122.2566], basePrice: 450, currency: 'USD' },
            { name: 'Fairfield', country: 'United States', coords: [38.2494, -122.0400], basePrice: 400, currency: 'USD' },
            { name: 'Concord', country: 'United States', coords: [37.9722, -122.0016], basePrice: 600, currency: 'USD' },
            { name: 'Hayward', country: 'United States', coords: [37.6688, -122.0808], basePrice: 700, currency: 'USD' },
            
            // US Cities within 500km - Seattle Metro Area
            { name: 'Bellevue', country: 'United States', coords: [47.6104, -122.2007], basePrice: 800, currency: 'USD' },
            { name: 'Tacoma', country: 'United States', coords: [47.2529, -122.4443], basePrice: 350, currency: 'USD' },
            { name: 'Everett', country: 'United States', coords: [47.9789, -122.2021], basePrice: 400, currency: 'USD' },
            { name: 'Spokane', country: 'United States', coords: [47.6588, -117.4260], basePrice: 200, currency: 'USD' },
            { name: 'Yakima', country: 'United States', coords: [46.6021, -120.5059], basePrice: 180, currency: 'USD' },
            { name: 'Bellingham', country: 'United States', coords: [48.7519, -122.8029], basePrice: 350, currency: 'USD' },
            { name: 'Olympia', country: 'United States', coords: [47.0379, -122.9007], basePrice: 300, currency: 'USD' },
            { name: 'Vancouver', country: 'United States', coords: [45.6272, -122.6734], basePrice: 350, currency: 'USD' },
            { name: 'Salem', country: 'United States', coords: [44.9429, -123.0351], basePrice: 250, currency: 'USD' },
            { name: 'Eugene', country: 'United States', coords: [44.0521, -123.0868], basePrice: 280, currency: 'USD' },
            
            // US Cities within 500km - Boston Metro Area
            { name: 'Worcester', country: 'United States', coords: [42.2626, -71.8023], basePrice: 250, currency: 'USD' },
            { name: 'Springfield', country: 'United States', coords: [42.1015, -72.5898], basePrice: 180, currency: 'USD' },
            { name: 'Lowell', country: 'United States', coords: [42.6334, -71.3162], basePrice: 300, currency: 'USD' },
            { name: 'Cambridge', country: 'United States', coords: [42.3736, -71.1097], basePrice: 900, currency: 'USD' },
            { name: 'New Bedford', country: 'United States', coords: [41.6362, -70.9342], basePrice: 200, currency: 'USD' },
            { name: 'Fall River', country: 'United States', coords: [41.7015, -71.1550], basePrice: 180, currency: 'USD' },
            { name: 'Lynn', country: 'United States', coords: [42.4668, -70.9495], basePrice: 350, currency: 'USD' },
            { name: 'Quincy', country: 'United States', coords: [42.2529, -71.0023], basePrice: 400, currency: 'USD' },
            { name: 'Newton', country: 'United States', coords: [42.3370, -71.2092], basePrice: 600, currency: 'USD' },
            { name: 'Somerville', country: 'United States', coords: [42.3876, -71.0995], basePrice: 700, currency: 'USD' },
            
            // Canadian Cities (Tier 1 - Major Metros)
            { name: 'Toronto', country: 'Canada', coords: [43.6532, -79.3832], basePrice: 1200, currency: 'CAD' },
            { name: 'Montreal', country: 'Canada', coords: [45.5017, -73.5673], basePrice: 500, currency: 'CAD' },
            { name: 'Vancouver', country: 'Canada', coords: [49.2827, -123.1207], basePrice: 1400, currency: 'CAD' },
            { name: 'Calgary', country: 'Canada', coords: [51.0447, -114.0719], basePrice: 400, currency: 'CAD' },
            { name: 'Edmonton', country: 'Canada', coords: [53.5461, -113.4938], basePrice: 350, currency: 'CAD' },
            { name: 'Ottawa', country: 'Canada', coords: [45.4215, -75.6972], basePrice: 450, currency: 'CAD' },
            { name: 'Winnipeg', country: 'Canada', coords: [49.8951, -97.1384], basePrice: 250, currency: 'CAD' },
            { name: 'Quebec City', country: 'Canada', coords: [46.8139, -71.2080], basePrice: 300, currency: 'CAD' },
            { name: 'Hamilton', country: 'Canada', coords: [43.2557, -79.8711], basePrice: 600, currency: 'CAD' },
            { name: 'Kitchener', country: 'Canada', coords: [43.4516, -80.4925], basePrice: 500, currency: 'CAD' },
            
            // Canadian Cities (Tier 2 - Medium Cities)
            { name: 'London', country: 'Canada', coords: [42.9849, -81.2453], basePrice: 400, currency: 'CAD' },
            { name: 'Victoria', country: 'Canada', coords: [48.4284, -123.3656], basePrice: 800, currency: 'CAD' },
            { name: 'Halifax', country: 'Canada', coords: [44.6488, -63.5752], basePrice: 350, currency: 'CAD' },
            { name: 'Saskatoon', country: 'Canada', coords: [52.1332, -106.6700], basePrice: 300, currency: 'CAD' },
            { name: 'Regina', country: 'Canada', coords: [50.4452, -104.6189], basePrice: 250, currency: 'CAD' },
            { name: 'St. John\'s', country: 'Canada', coords: [47.5615, -52.7126], basePrice: 300, currency: 'CAD' },
            { name: 'Kelowna', country: 'Canada', coords: [49.8877, -119.4960], basePrice: 600, currency: 'CAD' },
            { name: 'Nanaimo', country: 'Canada', coords: [49.1659, -123.9401], basePrice: 500, currency: 'CAD' },
            { name: 'Prince George', country: 'Canada', coords: [53.9166, -122.7530], basePrice: 250, currency: 'CAD' },
            { name: 'Thunder Bay', country: 'Canada', coords: [48.3809, -89.2477], basePrice: 200, currency: 'CAD' },
            
            // Canadian Cities within 500km - Toronto Metro Area
            { name: 'Mississauga', country: 'Canada', coords: [43.5890, -79.6441], basePrice: 900, currency: 'CAD' },
            { name: 'Brampton', country: 'Canada', coords: [43.6831, -79.7663], basePrice: 800, currency: 'CAD' },
            { name: 'Markham', country: 'Canada', coords: [43.8561, -79.3370], basePrice: 1000, currency: 'CAD' },
            { name: 'Vaughan', country: 'Canada', coords: [43.8361, -79.4987], basePrice: 1100, currency: 'CAD' },
            { name: 'Richmond Hill', country: 'Canada', coords: [43.8828, -79.4403], basePrice: 950, currency: 'CAD' },
            { name: 'Oakville', country: 'Canada', coords: [43.4675, -79.6877], basePrice: 850, currency: 'CAD' },
            { name: 'Burlington', country: 'Canada', coords: [43.3255, -79.7990], basePrice: 750, currency: 'CAD' },
            { name: 'Oshawa', country: 'Canada', coords: [43.8971, -78.8658], basePrice: 600, currency: 'CAD' },
            { name: 'Whitby', country: 'Canada', coords: [43.8975, -78.9428], basePrice: 650, currency: 'CAD' },
            { name: 'Ajax', country: 'Canada', coords: [43.8509, -79.0205], basePrice: 700, currency: 'CAD' },
            { name: 'Pickering', country: 'Canada', coords: [43.8384, -79.0868], basePrice: 750, currency: 'CAD' },
            { name: 'Scarborough', country: 'Canada', coords: [43.7764, -79.2318], basePrice: 850, currency: 'CAD' },
            { name: 'Etobicoke', country: 'Canada', coords: [43.6205, -79.5132], basePrice: 900, currency: 'CAD' },
            { name: 'North York', country: 'Canada', coords: [43.7615, -79.4111], basePrice: 950, currency: 'CAD' },
            { name: 'York', country: 'Canada', coords: [43.6896, -79.4942], basePrice: 900, currency: 'CAD' },
            
            // Canadian Cities within 500km - Montreal Metro Area
            { name: 'Laval', country: 'Canada', coords: [45.5697, -73.7244], basePrice: 450, currency: 'CAD' },
            { name: 'Gatineau', country: 'Canada', coords: [45.4765, -75.7013], basePrice: 400, currency: 'CAD' },
            { name: 'Longueuil', country: 'Canada', coords: [45.5370, -73.5104], basePrice: 400, currency: 'CAD' },
            { name: 'Sherbrooke', country: 'Canada', coords: [45.4009, -71.8827], basePrice: 250, currency: 'CAD' },
            { name: 'Trois-Rivières', country: 'Canada', coords: [46.3432, -72.5431], basePrice: 200, currency: 'CAD' },
            { name: 'Saint-Jean-sur-Richelieu', country: 'Canada', coords: [45.3071, -73.2626], basePrice: 300, currency: 'CAD' },
            { name: 'Drummondville', country: 'Canada', coords: [45.8834, -72.4824], basePrice: 180, currency: 'CAD' },
            { name: 'Saint-Jérôme', country: 'Canada', coords: [45.7804, -74.0036], basePrice: 250, currency: 'CAD' },
            { name: 'Granby', country: 'Canada', coords: [45.4009, -72.7324], basePrice: 200, currency: 'CAD' },
            { name: 'Saint-Hyacinthe', country: 'Canada', coords: [45.6308, -72.9570], basePrice: 180, currency: 'CAD' },
            
            // Canadian Cities within 500km - Vancouver Metro Area
            { name: 'Surrey', country: 'Canada', coords: [49.1913, -122.8490], basePrice: 900, currency: 'CAD' },
            { name: 'Burnaby', country: 'Canada', coords: [49.2488, -122.9805], basePrice: 1000, currency: 'CAD' },
            { name: 'Richmond', country: 'Canada', coords: [49.1666, -123.1336], basePrice: 1100, currency: 'CAD' },
            { name: 'Coquitlam', country: 'Canada', coords: [49.2837, -122.7932], basePrice: 850, currency: 'CAD' },
            { name: 'Langley', country: 'Canada', coords: [49.1044, -122.5827], basePrice: 750, currency: 'CAD' },
            { name: 'Delta', country: 'Canada', coords: [49.0847, -123.0581], basePrice: 800, currency: 'CAD' },
            { name: 'New Westminster', country: 'Canada', coords: [49.2068, -122.9109], basePrice: 950, currency: 'CAD' },
            { name: 'Maple Ridge', country: 'Canada', coords: [49.2194, -122.6019], basePrice: 700, currency: 'CAD' },
            { name: 'Port Coquitlam', country: 'Canada', coords: [49.2621, -122.7816], basePrice: 800, currency: 'CAD' },
            { name: 'Port Moody', country: 'Canada', coords: [49.2837, -122.8292], basePrice: 900, currency: 'CAD' },
            { name: 'White Rock', country: 'Canada', coords: [49.0252, -122.8029], basePrice: 850, currency: 'CAD' },
            { name: 'West Vancouver', country: 'Canada', coords: [49.3668, -123.1668], basePrice: 1200, currency: 'CAD' },
            { name: 'North Vancouver', country: 'Canada', coords: [49.3208, -123.0739], basePrice: 1100, currency: 'CAD' },
            { name: 'Pitt Meadows', country: 'Canada', coords: [49.2214, -122.6897], basePrice: 650, currency: 'CAD' },
            { name: 'Mission', country: 'Canada', coords: [49.1418, -122.3111], basePrice: 550, currency: 'CAD' },
            
            // Canadian Cities within 500km - Calgary Metro Area
            { name: 'Airdrie', country: 'Canada', coords: [51.2921, -114.0138], basePrice: 350, currency: 'CAD' },
            { name: 'Cochrane', country: 'Canada', coords: [51.1894, -114.4680], basePrice: 400, currency: 'CAD' },
            { name: 'Okotoks', country: 'Canada', coords: [50.7256, -113.9749], basePrice: 380, currency: 'CAD' },
            { name: 'Strathmore', country: 'Canada', coords: [51.0378, -113.4002], basePrice: 300, currency: 'CAD' },
            { name: 'High River', country: 'Canada', coords: [50.5806, -113.8706], basePrice: 320, currency: 'CAD' },
            { name: 'Canmore', country: 'Canada', coords: [51.0891, -115.3588], basePrice: 500, currency: 'CAD' },
            { name: 'Banff', country: 'Canada', coords: [51.1784, -115.5708], basePrice: 600, currency: 'CAD' },
            { name: 'Lethbridge', country: 'Canada', coords: [49.6942, -112.8328], basePrice: 250, currency: 'CAD' },
            { name: 'Medicine Hat', country: 'Canada', coords: [50.0413, -110.6772], basePrice: 200, currency: 'CAD' },
            { name: 'Red Deer', country: 'Canada', coords: [52.2691, -113.8117], basePrice: 280, currency: 'CAD' },
            
            // Canadian Cities within 500km - Edmonton Metro Area
            { name: 'St. Albert', country: 'Canada', coords: [53.6305, -113.6256], basePrice: 320, currency: 'CAD' },
            { name: 'Fort Saskatchewan', country: 'Canada', coords: [53.7134, -113.2137], basePrice: 280, currency: 'CAD' },
            { name: 'Leduc', country: 'Canada', coords: [53.2594, -113.5491], basePrice: 300, currency: 'CAD' },
            { name: 'Spruce Grove', country: 'Canada', coords: [53.5451, -113.9188], basePrice: 290, currency: 'CAD' },
            { name: 'Sherwood Park', country: 'Canada', coords: [53.5168, -113.3187], basePrice: 340, currency: 'CAD' },
            { name: 'Grande Prairie', country: 'Canada', coords: [55.1699, -118.7979], basePrice: 200, currency: 'CAD' },
            { name: 'Fort McMurray', country: 'Canada', coords: [56.7264, -111.3808], basePrice: 180, currency: 'CAD' },
            { name: 'Lloydminster', country: 'Canada', coords: [53.2842, -110.0059], basePrice: 150, currency: 'CAD' },
            { name: 'Cold Lake', country: 'Canada', coords: [54.4641, -110.1824], basePrice: 160, currency: 'CAD' },
            { name: 'Camrose', country: 'Canada', coords: [53.0168, -112.8352], basePrice: 180, currency: 'CAD' },
            
            // Indian Cities (Tier 1 - Metro)
            { name: 'Mumbai', country: 'India', coords: [19.0760, 72.8777], basePrice: 25000, currency: 'INR' },
            { name: 'Delhi', country: 'India', coords: [28.7041, 77.1025], basePrice: 22000, currency: 'INR' },
            { name: 'Bangalore', country: 'India', coords: [12.9716, 77.5946], basePrice: 18000, currency: 'INR' },
            { name: 'Hyderabad', country: 'India', coords: [17.3850, 78.4867], basePrice: 15000, currency: 'INR' },
            { name: 'Chennai', country: 'India', coords: [13.0827, 80.2707], basePrice: 14000, currency: 'INR' },
            { name: 'Kolkata', country: 'India', coords: [22.5726, 88.3639], basePrice: 12000, currency: 'INR' },
            { name: 'Pune', country: 'India', coords: [18.5204, 73.8567], basePrice: 13000, currency: 'INR' },
            { name: 'Ahmedabad', country: 'India', coords: [23.0225, 72.5714], basePrice: 11000, currency: 'INR' },
            
            // Indian Cities (Tier 2)
            { name: 'Jaipur', country: 'India', coords: [26.9124, 75.7873], basePrice: 9000, currency: 'INR' },
            { name: 'Surat', country: 'India', coords: [21.1702, 72.8311], basePrice: 8500, currency: 'INR' },
            { name: 'Lucknow', country: 'India', coords: [26.8467, 80.9462], basePrice: 8000, currency: 'INR' },
            { name: 'Kanpur', country: 'India', coords: [26.4499, 80.3319], basePrice: 7500, currency: 'INR' },
            { name: 'Nagpur', country: 'India', coords: [21.1458, 79.0882], basePrice: 7000, currency: 'INR' },
            { name: 'Indore', country: 'India', coords: [22.7196, 75.8577], basePrice: 7500, currency: 'INR' },
            { name: 'Thane', country: 'India', coords: [19.2183, 72.9781], basePrice: 16000, currency: 'INR' },
            { name: 'Bhopal', country: 'India', coords: [23.2599, 77.4126], basePrice: 6500, currency: 'INR' },
            { name: 'Visakhapatnam', country: 'India', coords: [17.6868, 83.2185], basePrice: 7000, currency: 'INR' },
            { name: 'Pimpri-Chinchwad', country: 'India', coords: [18.6298, 73.7997], basePrice: 12000, currency: 'INR' },
            { name: 'Patna', country: 'India', coords: [25.5941, 85.1376], basePrice: 6000, currency: 'INR' },
            { name: 'Vadodara', country: 'India', coords: [22.3072, 73.1812], basePrice: 7000, currency: 'INR' },
            
            // Indian Cities (Tier 3)
            { name: 'Ghaziabad', country: 'India', coords: [28.6692, 77.4538], basePrice: 10000, currency: 'INR' },
            { name: 'Ludhiana', country: 'India', coords: [30.9010, 75.8573], basePrice: 6500, currency: 'INR' },
            { name: 'Agra', country: 'India', coords: [27.1767, 78.0081], basePrice: 5500, currency: 'INR' },
            { name: 'Nashik', country: 'India', coords: [19.9975, 73.7898], basePrice: 6000, currency: 'INR' },
            { name: 'Faridabad', country: 'India', coords: [28.4089, 77.3178], basePrice: 9500, currency: 'INR' },
            { name: 'Meerut', country: 'India', coords: [28.9845, 77.7064], basePrice: 7000, currency: 'INR' },
            { name: 'Rajkot', country: 'India', coords: [22.3039, 70.8022], basePrice: 5500, currency: 'INR' },
            { name: 'Kalyan-Dombivali', country: 'India', coords: [19.2350, 73.1295], basePrice: 14000, currency: 'INR' },
            { name: 'Vasai-Virar', country: 'India', coords: [19.4259, 72.8225], basePrice: 13000, currency: 'INR' },
            { name: 'Varanasi', country: 'India', coords: [25.3176, 82.9739], basePrice: 5000, currency: 'INR' },
            { name: 'Srinagar', country: 'India', coords: [34.0837, 74.7973], basePrice: 4500, currency: 'INR' },
            { name: 'Aurangabad', country: 'India', coords: [19.8762, 75.3433], basePrice: 5000, currency: 'INR' },
            { name: 'Dhanbad', country: 'India', coords: [23.7957, 86.4304], basePrice: 4000, currency: 'INR' },
            { name: 'Amritsar', country: 'India', coords: [31.6340, 74.8723], basePrice: 5500, currency: 'INR' },
            { name: 'Allahabad', country: 'India', coords: [25.4358, 81.8463], basePrice: 4500, currency: 'INR' },
            { name: 'Ranchi', country: 'India', coords: [23.3441, 85.3096], basePrice: 4000, currency: 'INR' },
            { name: 'Howrah', country: 'India', coords: [22.5958, 88.2636], basePrice: 8000, currency: 'INR' },
            { name: 'Coimbatore', country: 'India', coords: [11.0168, 76.9558], basePrice: 6000, currency: 'INR' },
            { name: 'Jabalpur', country: 'India', coords: [23.1815, 79.9864], basePrice: 4000, currency: 'INR' },
            { name: 'Gwalior', country: 'India', coords: [26.2183, 78.1828], basePrice: 4500, currency: 'INR' },
            { name: 'Vijayawada', country: 'India', coords: [16.5062, 80.6480], basePrice: 5500, currency: 'INR' },
            { name: 'Jodhpur', country: 'India', coords: [26.2389, 73.0243], basePrice: 5000, currency: 'INR' },
            { name: 'Madurai', country: 'India', coords: [9.9252, 78.1198], basePrice: 4500, currency: 'INR' },
            { name: 'Raipur', country: 'India', coords: [21.2514, 81.6296], basePrice: 4000, currency: 'INR' },
            { name: 'Kota', country: 'India', coords: [25.2138, 75.8648], basePrice: 4000, currency: 'INR' },
            { name: 'Guwahati', country: 'India', coords: [26.1445, 91.7362], basePrice: 4500, currency: 'INR' },
            { name: 'Chandigarh', country: 'India', coords: [30.7333, 76.7794], basePrice: 12000, currency: 'INR' },
            { name: 'Solapur', country: 'India', coords: [17.6599, 75.9064], basePrice: 4000, currency: 'INR' },
            { name: 'Hubli-Dharwad', country: 'India', coords: [15.3647, 75.1240], basePrice: 3500, currency: 'INR' },
            { name: 'Bareilly', country: 'India', coords: [28.3670, 79.4304], basePrice: 3500, currency: 'INR' },
            { name: 'Moradabad', country: 'India', coords: [28.8389, 78.7738], basePrice: 3500, currency: 'INR' },
            { name: 'Mysore', country: 'India', coords: [12.2958, 76.6394], basePrice: 5000, currency: 'INR' },
            { name: 'Gurgaon', country: 'India', coords: [28.4595, 77.0266], basePrice: 18000, currency: 'INR' },
            { name: 'Aligarh', country: 'India', coords: [27.8974, 78.0880], basePrice: 3500, currency: 'INR' },
            { name: 'Jalandhar', country: 'India', coords: [31.3260, 75.5762], basePrice: 4500, currency: 'INR' },
            { name: 'Tiruchirappalli', country: 'India', coords: [10.7905, 78.7047], basePrice: 3500, currency: 'INR' },
            { name: 'Bhubaneswar', country: 'India', coords: [20.2961, 85.8245], basePrice: 4500, currency: 'INR' },
            { name: 'Salem', country: 'India', coords: [11.6643, 78.1460], basePrice: 3000, currency: 'INR' },
            { name: 'Warangal', country: 'India', coords: [17.9689, 79.5941], basePrice: 3500, currency: 'INR' },
            { name: 'Mira-Bhayandar', country: 'India', coords: [19.2952, 72.8544], basePrice: 15000, currency: 'INR' },
            { name: 'Thiruvananthapuram', country: 'India', coords: [8.5241, 76.9366], basePrice: 5000, currency: 'INR' },
            { name: 'Bhiwandi', country: 'India', coords: [19.2969, 73.0625], basePrice: 12000, currency: 'INR' },
            { name: 'Saharanpur', country: 'India', coords: [29.9675, 77.5451], basePrice: 3000, currency: 'INR' },
            { name: 'Gorakhpur', country: 'India', coords: [26.7606, 83.3732], basePrice: 3000, currency: 'INR' },
            { name: 'Guntur', country: 'India', coords: [16.2991, 80.4575], basePrice: 3500, currency: 'INR' },
            { name: 'Bikaner', country: 'India', coords: [28.0229, 73.3119], basePrice: 3000, currency: 'INR' },
            { name: 'Amravati', country: 'India', coords: [20.9374, 77.7796], basePrice: 3000, currency: 'INR' },
            { name: 'Noida', country: 'India', coords: [28.5355, 77.3910], basePrice: 16000, currency: 'INR' },
            { name: 'Jamshedpur', country: 'India', coords: [22.8046, 86.2029], basePrice: 4000, currency: 'INR' },
            { name: 'Bhilai', country: 'India', coords: [21.2092, 81.4285], basePrice: 3000, currency: 'INR' },
            { name: 'Cuttack', country: 'India', coords: [20.4625, 85.8830], basePrice: 3500, currency: 'INR' },
            { name: 'Firozabad', country: 'India', coords: [27.1591, 78.3958], basePrice: 2500, currency: 'INR' },
            { name: 'Kochi', country: 'India', coords: [9.9312, 76.2673], basePrice: 4500, currency: 'INR' },
            { name: 'Nellore', country: 'India', coords: [14.4426, 79.9865], basePrice: 3000, currency: 'INR' },
            { name: 'Bhavnagar', country: 'India', coords: [21.7645, 72.1519], basePrice: 3000, currency: 'INR' },
            { name: 'Dehradun', country: 'India', coords: [30.3165, 78.0322], basePrice: 5000, currency: 'INR' },
            { name: 'Durgapur', country: 'India', coords: [23.5204, 87.3119], basePrice: 3500, currency: 'INR' },
            { name: 'Asansol', country: 'India', coords: [23.6889, 86.9661], basePrice: 3000, currency: 'INR' },
            { name: 'Rourkela', country: 'India', coords: [22.2494, 84.8828], basePrice: 3000, currency: 'INR' },
            { name: 'Nanded', country: 'India', coords: [19.1383, 77.3210], basePrice: 2500, currency: 'INR' },
            { name: 'Kolhapur', country: 'India', coords: [16.7050, 74.2433], basePrice: 3000, currency: 'INR' },
            { name: 'Ajmer', country: 'India', coords: [26.4499, 74.6399], basePrice: 3000, currency: 'INR' },
            { name: 'Akola', country: 'India', coords: [20.7096, 77.0021], basePrice: 2500, currency: 'INR' },
            { name: 'Gulbarga', country: 'India', coords: [17.3297, 76.8343], basePrice: 2500, currency: 'INR' },
            { name: 'Jamnagar', country: 'India', coords: [22.4707, 70.0577], basePrice: 2500, currency: 'INR' },
            { name: 'Ujjain', country: 'India', coords: [23.1765, 75.7885], basePrice: 2500, currency: 'INR' },
            { name: 'Loni', country: 'India', coords: [28.7515, 77.2885], basePrice: 8000, currency: 'INR' },
            { name: 'Siliguri', country: 'India', coords: [26.7271, 88.3953], basePrice: 3000, currency: 'INR' },
            { name: 'Jhansi', country: 'India', coords: [25.4484, 78.5685], basePrice: 2500, currency: 'INR' },
            { name: 'Ulhasnagar', country: 'India', coords: [19.2183, 73.1634], basePrice: 12000, currency: 'INR' },
            { name: 'Jammu', country: 'India', coords: [32.7266, 74.8570], basePrice: 3500, currency: 'INR' },
            { name: 'Sangli-Miraj', country: 'India', coords: [16.8524, 74.5815], basePrice: 2500, currency: 'INR' },
            { name: 'Belgaum', country: 'India', coords: [15.8497, 74.4977], basePrice: 2500, currency: 'INR' },
            { name: 'Mangalore', country: 'India', coords: [12.9141, 74.8560], basePrice: 3500, currency: 'INR' },
            { name: 'Ambattur', country: 'India', coords: [13.1149, 80.1546], basePrice: 8000, currency: 'INR' },
            { name: 'Tirunelveli', country: 'India', coords: [8.7139, 77.7567], basePrice: 2500, currency: 'INR' },
            { name: 'Malegaon', country: 'India', coords: [20.5609, 74.5251], basePrice: 2000, currency: 'INR' },
            { name: 'Gaya', country: 'India', coords: [24.7914, 85.0002], basePrice: 2000, currency: 'INR' },
            { name: 'Jalgaon', country: 'India', coords: [21.0077, 75.5626], basePrice: 2000, currency: 'INR' },
            { name: 'Udaipur', country: 'India', coords: [24.5854, 73.7125], basePrice: 3000, currency: 'INR' },
            { name: 'Maheshtala', country: 'India', coords: [22.5086, 88.2532], basePrice: 6000, currency: 'INR' },
            { name: 'Tirupur', country: 'India', coords: [11.1085, 77.3411], basePrice: 2500, currency: 'INR' },
            { name: 'Davanagere', country: 'India', coords: [14.4644, 75.9218], basePrice: 2000, currency: 'INR' },
            { name: 'Kozhikode', country: 'India', coords: [11.2588, 75.7804], basePrice: 3000, currency: 'INR' },
            { name: 'Akbarpur', country: 'India', coords: [26.4307, 82.5373], basePrice: 1500, currency: 'INR' },
            { name: 'Kurnool', country: 'India', coords: [15.8281, 78.0373], basePrice: 2000, currency: 'INR' },
            { name: 'Bokaro', country: 'India', coords: [23.6693, 86.1511], basePrice: 2000, currency: 'INR' },
            { name: 'Rajahmundry', country: 'India', coords: [16.9849, 81.7870], basePrice: 2500, currency: 'INR' },
            { name: 'Ballari', country: 'India', coords: [15.1394, 76.9214], basePrice: 2000, currency: 'INR' },
            { name: 'Agartala', country: 'India', coords: [23.8315, 91.2868], basePrice: 2500, currency: 'INR' },
            { name: 'Bhagalpur', country: 'India', coords: [25.2445, 87.0068], basePrice: 2000, currency: 'INR' },
            { name: 'Latur', country: 'India', coords: [18.4088, 76.5604], basePrice: 2000, currency: 'INR' },
            { name: 'Dhule', country: 'India', coords: [20.9029, 74.7772], basePrice: 2000, currency: 'INR' },
            { name: 'Korba', country: 'India', coords: [22.3458, 82.6963], basePrice: 2000, currency: 'INR' },
            { name: 'Bhilwara', country: 'India', coords: [25.3463, 74.6364], basePrice: 2000, currency: 'INR' },
            { name: 'Brahmapur', country: 'India', coords: [19.3149, 84.7941], basePrice: 2000, currency: 'INR' },
            { name: 'Muzaffarnagar', country: 'India', coords: [29.4727, 77.7085], basePrice: 2000, currency: 'INR' },
            { name: 'Ahmednagar', country: 'India', coords: [19.0952, 74.7496], basePrice: 2000, currency: 'INR' },
            { name: 'Mathura', country: 'India', coords: [27.4924, 77.6737], basePrice: 2000, currency: 'INR' },
            { name: 'Kollam', country: 'India', coords: [8.8932, 76.6141], basePrice: 2000, currency: 'INR' },
            { name: 'Avadi', country: 'India', coords: [13.1149, 80.0996], basePrice: 6000, currency: 'INR' },
            { name: 'Kadapa', country: 'India', coords: [14.4753, 78.8354], basePrice: 2000, currency: 'INR' },
            { name: 'Anantapur', country: 'India', coords: [14.6819, 77.6006], basePrice: 2000, currency: 'INR' },
            { name: 'Tiruvottiyur', country: 'India', coords: [13.1579, 80.3045], basePrice: 7000, currency: 'INR' },
            { name: 'Alwar', country: 'India', coords: [27.5665, 76.6045], basePrice: 2000, currency: 'INR' },
            { name: 'Kamarhati', country: 'India', coords: [22.6711, 88.3745], basePrice: 5000, currency: 'INR' },
            { name: 'Sambalpur', country: 'India', coords: [21.4704, 83.9701], basePrice: 2000, currency: 'INR' },
            { name: 'Bhiwani', country: 'India', coords: [28.7975, 76.1318], basePrice: 2000, currency: 'INR' },
            { name: 'Ratlam', country: 'India', coords: [23.3343, 75.0376], basePrice: 2000, currency: 'INR' },
            { name: 'Modinagar', country: 'India', coords: [28.8389, 77.7208], basePrice: 5000, currency: 'INR' },
            { name: 'Durg', country: 'India', coords: [21.1904, 81.2849], basePrice: 2000, currency: 'INR' },
            { name: 'Shillong', country: 'India', coords: [25.5788, 91.8933], basePrice: 2500, currency: 'INR' },
            { name: 'Imphal', country: 'India', coords: [24.8170, 93.9368], basePrice: 2000, currency: 'INR' },
            { name: 'Hapur', country: 'India', coords: [28.7291, 77.7811], basePrice: 4000, currency: 'INR' },
            { name: 'Ranipet', country: 'India', coords: [12.9279, 79.3305], basePrice: 2500, currency: 'INR' },
            { name: 'Anand', country: 'India', coords: [22.5645, 72.9289], basePrice: 2000, currency: 'INR' },
            { name: 'Mango', country: 'India', coords: [22.8389, 86.2034], basePrice: 2500, currency: 'INR' },
            { name: 'Santipur', country: 'India', coords: [23.2547, 88.4379], basePrice: 2000, currency: 'INR' },
            { name: 'Bhind', country: 'India', coords: [26.5546, 78.7878], basePrice: 1000, currency: 'INR' },
            { name: 'Gondia', country: 'India', coords: [21.4622, 80.1920], basePrice: 1000, currency: 'INR' },
            { name: 'Tumkur', country: 'India', coords: [13.3409, 77.1010], basePrice: 2000, currency: 'INR' },
            { name: 'Chapra', country: 'India', coords: [25.7801, 84.7471], basePrice: 1000, currency: 'INR' },
            { name: 'Malda', country: 'India', coords: [25.0119, 88.1439], basePrice: 1000, currency: 'INR' },
            { name: 'Rewa', country: 'India', coords: [24.5373, 81.3042], basePrice: 1000, currency: 'INR' },
            { name: 'Raebareli', country: 'India', coords: [26.2309, 81.2338], basePrice: 1000, currency: 'INR' },
            { name: 'Hospet', country: 'India', coords: [15.2665, 76.3879], basePrice: 1000, currency: 'INR' },
            { name: 'Bhusawal', country: 'India', coords: [21.0436, 75.7851], basePrice: 1000, currency: 'INR' },
            { name: 'Khandwa', country: 'India', coords: [21.8247, 76.3529], basePrice: 1000, currency: 'INR' },
            { name: 'Beawar', country: 'India', coords: [26.1016, 74.3203], basePrice: 1000, currency: 'INR' },
            { name: 'Godhra', country: 'India', coords: [22.7772, 73.6203], basePrice: 1000, currency: 'INR' },
            { name: 'Satara', country: 'India', coords: [17.6868, 74.0069], basePrice: 1000, currency: 'INR' },
            { name: 'Gandhinagar', country: 'India', coords: [23.2156, 72.6369], basePrice: 7000, currency: 'INR' },
            { name: 'Baranagar', country: 'India', coords: [22.6413, 88.3773], basePrice: 5000, currency: 'INR' },
            { name: 'Purnia', country: 'India', coords: [25.7778, 87.4752], basePrice: 1000, currency: 'INR' },
            { name: 'Baharampur', country: 'India', coords: [24.1047, 88.2515], basePrice: 1000, currency: 'INR' },
            { name: 'Barmer', country: 'India', coords: [25.7461, 71.3924], basePrice: 1000, currency: 'INR' },
            { name: 'Darbhanga', country: 'India', coords: [26.1520, 85.8970], basePrice: 1000, currency: 'INR' },
            { name: 'Munger', country: 'India', coords: [25.3748, 86.4735], basePrice: 1000, currency: 'INR' },
            { name: 'Karnal', country: 'India', coords: [29.6857, 76.9905], basePrice: 2000, currency: 'INR' },
            { name: 'Bathinda', country: 'India', coords: [30.2070, 74.9455], basePrice: 1000, currency: 'INR' },
            { name: 'Rampur', country: 'India', coords: [28.8008, 79.0264], basePrice: 1000, currency: 'INR' },
            { name: 'Shivamogga', country: 'India', coords: [13.9299, 75.5681], basePrice: 1000, currency: 'INR' },
            { name: 'Ratnagiri', country: 'India', coords: [16.9902, 73.3120], basePrice: 1000, currency: 'INR' },
            { name: 'Modasa', country: 'India', coords: [23.4625, 73.2986], basePrice: 1000, currency: 'INR' },
            { name: 'Delhi Cantonment', country: 'India', coords: [28.5965, 77.1359], basePrice: 18000, currency: 'INR' },
            { name: 'Patiala', country: 'India', coords: [30.3398, 76.3869], basePrice: 2000, currency: 'INR' },
            { name: 'Secunderabad', country: 'India', coords: [17.4399, 78.4983], basePrice: 11000, currency: 'INR' },
            { name: 'Nizamabad', country: 'India', coords: [18.6725, 78.0941], basePrice: 1000, currency: 'INR' },
            { name: 'Kharagpur', country: 'India', coords: [22.3460, 87.2320], basePrice: 2000, currency: 'INR' },
            { name: 'Panchkula', country: 'India', coords: [30.6942, 76.8606], basePrice: 7000, currency: 'INR' },
            { name: 'Bhatpara', country: 'India', coords: [22.8664, 88.4011], basePrice: 4000, currency: 'INR' },
            { name: 'Panihati', country: 'India', coords: [22.6941, 88.3745], basePrice: 4000, currency: 'INR' },
            { name: 'Rohtak', country: 'India', coords: [28.8955, 76.6066], basePrice: 2000, currency: 'INR' }
        ];

        return cities.map(city => ({
            name: city.name,
            country: city.country,
            coords: city.coords,
            price: city.basePrice + Math.floor(Math.random() * 100) - 50,
            currency: city.currency || 'INR'
        }));
    }

    // Initialize data and layers
    let cityData = generateRealEstateData();
    let cityLayers = [];

    // Get DOM elements
    const countrySelect = document.getElementById('country-filter');
    const searchInput = document.getElementById('search');
    const disclaimer = document.querySelector('.disclaimer');
    const disclaimerClose = document.getElementById('disclaimer-close');

    // Hybrid data system - can use real APIs when available
    class RealEstateDataManager {
        constructor() {
            this.realDataSources = {
                // Add real API endpoints here when available
                // 'numbeo': 'https://api.numbeo.com/api/city_prices',
                // 'magicbricks': 'https://api.magicbricks.com/property',
            };
            this.fallbackData = null;
            this.dataSource = 'estimated'; // 'real' or 'estimated'
        }

        async fetchRealData(city) {
            // This is where you would integrate real APIs
            // For now, return null to use fallback data
            return null;
        }

        async getCityData(cityName) {
            // Try to get real data first
            const realData = await this.fetchRealData(cityName);
            if (realData) {
                this.dataSource = 'real';
                return realData;
            }

            // Fallback to estimated data
            this.dataSource = 'estimated';
            return this.getEstimatedData(cityName);
        }

        getEstimatedData(cityName) {
            // Return estimated data from our predefined list
            const city = this.fallbackData.find(c => 
                c.name.toLowerCase() === cityName.toLowerCase()
            );
            return city || null;
        }

        getDataSourceInfo() {
            return {
                source: this.dataSource,
                timestamp: new Date().toISOString(),
                disclaimer: this.dataSource === 'estimated' ? 
                    'Prices are estimates based on market trends' : 
                    'Prices from real-time data sources'
            };
        }
    }

    // Initialize data manager
    const dataManager = new RealEstateDataManager();
    dataManager.fallbackData = cityData;

    // Add refresh button
    const refreshButton = document.createElement('button');
    refreshButton.id = 'refresh-btn';
    refreshButton.textContent = '🔄 Refresh Data';
    refreshButton.className = 'refresh-btn';
    document.querySelector('.controls').appendChild(refreshButton);

    // Functions
    function clearMap() {
        cityLayers.forEach(layer => map.removeLayer(layer));
        cityLayers = [];
    }

    function getColor(price) {
        return price > 10000 ? '#800026' :
               price > 8000  ? '#BD0026' :
               price > 6000  ? '#E31A1C' :
               price > 4000  ? '#FC4E2A' :
               price > 2000  ? '#FD8D3C' :
                                 '#FEB24C';
    }

    function addCityMarkers(data) {
        clearMap();
        data.forEach(city => {
            const dataInfo = dataManager.getDataSourceInfo();
            
            // Get currency symbol
            const currencySymbols = {
                'USD': '$',
                'CAD': 'C$',
                'INR': '₹'
            };
            const currencySymbol = currencySymbols[city.currency] || '₹';
            
            const marker = L.marker(city.coords)
                .addTo(map)
                .bindPopup(`
                    <div class="popup-content">
                        <h3>${city.name}</h3>
                        <p><strong>Country:</strong> ${city.country}</p>
                        <p><strong>Price:</strong> ${currencySymbol}${city.price.toLocaleString()}/sq ft</p>
                        <p><strong>Coordinates:</strong> ${city.coords[0].toFixed(4)}, ${city.coords[1].toFixed(4)}</p>
                        <div class="data-source">
                            <small style="color: #666; font-style: italic;">
                                ${dataInfo.disclaimer}
                            </small>
                        </div>
                    </div>
                `);

            // Add hover event listeners
            marker.on('mouseover', function() {
                this.openPopup();
            });

            marker.on('mouseout', function() {
                this.closePopup();
            });

            // Color code markers based on price and currency
            const price = city.price;
            let color = '#ff0000'; // Red for highest prices

            if (city.currency === 'USD') {
                if (price < 300) {
                    color = '#00ff00'; // Green for lowest prices
                } else if (price < 600) {
                    color = '#ffff00'; // Yellow for medium-low prices
                } else if (price < 1000) {
                    color = '#ffa500'; // Orange for medium-high prices
                }
            } else if (city.currency === 'CAD') {
                if (price < 500) {
                    color = '#00ff00'; // Green for lowest prices
                } else if (price < 800) {
                    color = '#ffff00'; // Yellow for medium-low prices
                } else if (price < 1200) {
                    color = '#ffa500'; // Orange for medium-high prices
                }
            } else {
                // INR (Indian Rupees)
                if (price < 5000) {
                    color = '#00ff00'; // Green for lowest prices
                } else if (price < 10000) {
                    color = '#ffff00'; // Yellow for medium-low prices
                } else if (price < 15000) {
                    color = '#ffa500'; // Orange for medium-high prices
                }
            }

            // Create custom icon with color
            const customIcon = L.divIcon({
                className: 'custom-marker',
                html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.3);"></div>`,
                iconSize: [12, 12],
                iconAnchor: [6, 6]
            });

            marker.setIcon(customIcon);
            cityLayers.push(marker);
        });
    }

    function updateCountryDropdown() {
        if (countrySelect) {
            countrySelect.innerHTML = '<option value="">All Countries</option>';
            const countries = [...new Set(cityData.map(city => city.country))];
            countries.sort().forEach(country => {
                const option = document.createElement('option');
                option.value = country;
                option.textContent = country;
                countrySelect.appendChild(option);
            });
        }
    }

    // Initialize
    updateCountryDropdown();
    addCityMarkers(cityData);

    // Event listeners
    if (refreshButton) {
        refreshButton.addEventListener('click', () => {
            refreshButton.textContent = '⏳ Loading...';
            refreshButton.disabled = true;
            
            setTimeout(() => {
                cityData = generateRealEstateData();
                addCityMarkers(cityData);
                updateCountryDropdown();
                
                refreshButton.textContent = '🔄 Refresh Data';
                refreshButton.disabled = false;
            }, 500);
        });
    }

    if (countrySelect) {
        countrySelect.addEventListener('change', (e) => {
            const selectedCountry = e.target.value;
            if (selectedCountry === "") {
                addCityMarkers(cityData);
                map.setView([45, -100], 3);
            } else {
                const filteredCities = cityData.filter(city => city.country === selectedCountry);
                addCityMarkers(filteredCities);
                if (filteredCities.length > 0) {
                    map.setView(filteredCities[0].coords, 6);
                }
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredCities = cityData.filter(city => 
                city.name.toLowerCase().includes(searchTerm) || 
                city.country.toLowerCase().includes(searchTerm)
            );
            addCityMarkers(filteredCities);
        });
    }

    // Create legend
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = function() {
        const div = L.DomUtil.create('div', 'legend');
        div.innerHTML = `
            <h4>Price per sq ft</h4>
            <div><span style="background: #00ff00"></span> Low: $100-300 / C$200-500 / ₹1,000-5,000</div>
            <div><span style="background: #ffff00"></span> Medium: $300-600 / C$500-800 / ₹5,000-10,000</div>
            <div><span style="background: #ffa500"></span> High: $600-1000 / C$800-1200 / ₹10,000-15,000</div>
            <div><span style="background: #ff0000"></span> Premium: $1000+ / C$1200+ / ₹15,000+</div>
        `;
        return div;
    };
    legend.addTo(map);

    // Disclaimer functionality
    if (disclaimerClose) {
        disclaimerClose.addEventListener('click', () => {
            if (disclaimer) {
                disclaimer.classList.add('hidden');
            }
        });
    }

    // Auto-hide disclaimer after 10 seconds
    setTimeout(() => {
        if (disclaimer && !disclaimer.classList.contains('hidden')) {
            disclaimer.classList.add('hidden');
        }
    }, 10000);

    // Update data source indicator
    function updateDataSourceIndicator() {
        const indicator = document.getElementById('data-source-indicator');
        const text = document.getElementById('data-source-text');
        const dataInfo = dataManager.getDataSourceInfo();
        
        if (dataInfo.source === 'real') {
            indicator.className = 'data-source-indicator real';
            text.textContent = '✅ Real-time Data';
        } else {
            indicator.className = 'data-source-indicator estimated';
            text.textContent = '📊 Estimated Data';
        }
    }

    // Initialize data source indicator
    updateDataSourceIndicator();

    // Example of how to integrate real API (commented out for future use)
    /*
    async function integrateRealAPI() {
        // Example: Numbeo API integration
        const apiKey = 'YOUR_API_KEY';
        const city = 'Mumbai';
        
        try {
            const response = await fetch(`https://api.numbeo.com/api/city_prices?api_key=${apiKey}&city=${city}`);
            const data = await response.json();
            
            if (data.prices && data.prices.length > 0) {
                const realEstateData = data.prices.find(p => p.item_name === 'Apartment (1 bedroom) in City Centre');
                if (realEstateData) {
                    return {
                        name: city,
                        country: 'India',
                        price: realEstateData.average_price,
                        source: 'real'
                    };
                }
            }
        } catch (error) {
            console.log('Real API not available, using estimated data');
        }
        
        return null;
    }
    */
});