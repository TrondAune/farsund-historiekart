
const map = new maplibregl.Map({
  container: 'map',
  style: 'https://demotiles.maplibre.org/style.json',
  center: [6.8, 58.1],
  zoom: 11,
});

map.on('load', () => {
  map.addSource('mock-features', {
    type: 'geojson',
    data: 'data/mock-features.geojson'
  });

  map.addLayer({
    id: 'mock-layer',
    type: 'circle',
    source: 'mock-features',
    paint: {
      'circle-radius': 6,
      'circle-color': '#b91c1c'
    },
    filter: ['all', ['<=', ['get', 'start_year'], -1700], ['>=', ['get', 'end_year'], -1700]]
  });
});

const slider = document.getElementById('year-slider');
noUiSlider.create(slider, {
  start: [-1700],
  connect: [true, false],
  range: { min: -1700, max: 1900 },
  step: 100
});

const yearLabel = document.getElementById('year-label');
slider.noUiSlider.on('update', (values) => {
  const year = Math.round(values[0]);
  yearLabel.textContent = `År: ${year < 0 ? Math.abs(year) + ' f.Kr.' : year}`;
  const filter = ['all', ['<=', ['get', 'start_year'], year], ['>=', ['get', 'end_year'], year]];
  if (map.getLayer('mock-layer')) map.setFilter('mock-layer', filter);
});
