mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/standard-satellite',
    projection: 'globe', // Display the map as a globe, since satellite-v9 defaults to Mercator
    zoom: 12,
    center:listing.geometry.coordinates,
});

const marker = new mapboxgl.Marker({ color: 'black' })
.setLngLat(listing.geometry.coordinates)
.setPopup(new mapboxgl.Popup({offset :25}).setHTML(`<h4>${listing.title}><p>Exact Location provided after Booking</p></h4>`))
.addTo(map);

