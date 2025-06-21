# 🌍 Real Estate Price Map

An interactive world map application displaying real estate prices across major cities in India, United States, and Canada. Built with modern web technologies and featuring a responsive design.

## 👨‍💻 Developer
**Chetan Palekar**

## 🚀 Live Demo
[View Live Application](https://yourusername.github.io/real-estate-map)

## ✨ Features

### 🗺️ Interactive Map
- **Global Coverage**: 450+ cities across India, United States, and Canada
- **Multiple Map Styles**: OpenStreetMap, Satellite, Dark, Light, and Terrain views
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### 💰 Multi-Currency Support
- **Indian Rupees (₹)**: 200+ Indian cities with realistic pricing
- **US Dollars ($)**: 200+ US cities with market-based estimates
- **Canadian Dollars (C$)**: 50+ Canadian cities with local pricing

### 🔍 Advanced Filtering & Search
- **Country Filter**: Filter cities by country (India, United States, Canada)
- **Real-time Search**: Search cities by name with instant results
- **Interactive Markers**: Hover to see detailed price information
- **Color-coded Legend**: Visual price range indicators

### 📊 Data Features
- **Hybrid Data System**: Supports both estimated and real-time data sources
- **Price Estimates**: Realistic market-based pricing for all cities
- **Data Source Transparency**: Clear indication of data sources
- **Disclaimer System**: Educational disclaimers for data accuracy

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Mapping**: Leaflet.js (Open-source mapping library)
- **Map Tiles**: OpenStreetMap, Esri, CartoDB, OpenTopoMap
- **Styling**: Custom CSS with responsive design
- **Deployment**: GitHub Pages (Free hosting)

## 📁 Project Structure

```
real-estate-map/
├── index.html          # Main HTML file
├── style.css           # CSS styles and responsive design
├── script.js           # JavaScript functionality and data
├── README.md           # Project documentation
└── .gitignore          # Git ignore file
```

## 🚀 Quick Start

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/real-estate-map.git
   cd real-estate-map
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server -p 8000
   ```

3. Visit `http://localhost:8000` in your browser

### Deployment
This project is designed to be deployed on GitHub Pages:

1. Create a new GitHub repository
2. Upload all project files
3. Go to Settings → Pages
4. Select source branch (usually `main` or `master`)
5. Your app will be live at `https://yourusername.github.io/repository-name`

## 📊 Data Coverage

### India (200+ Cities)
- **Metro Cities**: Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Kolkata
- **Tier 2 Cities**: Pune, Ahmedabad, Jaipur, Surat, Lucknow, Kanpur
- **Tier 3 Cities**: Various regional centers and emerging cities

### United States (200+ Cities)
- **Major Metros**: New York, Los Angeles, Chicago, Houston, Phoenix
- **Metro Areas**: San Francisco, Seattle, Boston, Washington DC
- **Regional Centers**: Austin, Denver, Portland, Las Vegas

### Canada (50+ Cities)
- **Major Cities**: Toronto, Montreal, Vancouver, Calgary, Edmonton
- **Provincial Capitals**: Ottawa, Quebec City, Halifax, Victoria
- **Regional Centers**: Hamilton, Kitchener, London, Windsor

## 🎨 Features in Detail

### Interactive Controls
- **Map Style Selector**: Switch between different map styles
- **Country Filter**: Filter cities by country
- **Search Functionality**: Real-time city search
- **Zoom Controls**: Standard map zoom and pan
- **Refresh Button**: Reload data and markers

### Visual Elements
- **Color-coded Markers**: Different colors for different price ranges
- **Interactive Popups**: Detailed information on hover
- **Responsive Legend**: Price range indicators
- **Professional UI**: Modern, clean design

### Data Management
- **Hybrid System**: Can integrate real APIs when available
- **Fallback Data**: Comprehensive estimated data
- **Source Transparency**: Clear data source indicators
- **Educational Disclaimers**: Important usage warnings

## 🔧 Customization

### Adding New Cities
Edit the `cities` array in `script.js`:
```javascript
{
    name: 'City Name',
    country: 'Country Name',
    coords: [latitude, longitude],
    basePrice: price_in_thousands,
    currency: 'CURRENCY_CODE'
}
```

### Modifying Styles
- Edit `style.css` for visual changes
- Update color schemes in the `getColor()` function
- Modify map styles in the `mapStyles` object

### Adding Real Data Sources
Implement real API integration in the `RealEstateDataManager` class:
```javascript
async fetchRealData(city) {
    // Add your API calls here
    const response = await fetch(`your-api-endpoint/${city}`);
    return await response.json();
}
```

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

**Developer**: Chetan Palekar

For questions, suggestions, or collaboration opportunities, please open an issue on GitHub.

## 🙏 Acknowledgments

- **Leaflet.js**: Open-source mapping library
- **OpenStreetMap**: Free map data and tiles
- **GitHub Pages**: Free hosting platform
- **Real Estate Data**: Market research and estimates

---

**Note**: This application is for educational and informational purposes only. Real estate prices shown are estimates and should not be used for investment decisions. Always consult with local real estate professionals for accurate pricing information. 