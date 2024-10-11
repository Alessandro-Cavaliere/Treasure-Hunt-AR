const map = L.map("map1");
const attrib = "Map data copyright OpenStreetMap contributors, Open Database Licence";
var marker = {};

var customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: attrib
}).addTo(map);

navigator.geolocation.getCurrentPosition(function (position) {
  map.setView([position.coords.latitude, position.coords.longitude], 30);
});


map.on("click", e => {
  const latInput = document.getElementById("latInput");
  const longInput = document.getElementById("longInput");

  lat = e.latlng.lat;
  latRounded = lat.toFixed(8);

  long = e.latlng.lng;
  longRounded = long.toFixed(8);

  if (marker != undefined) {
    map.removeLayer(marker);
  }

  marker = L.marker([lat, long], {
    icon: customIcon
  }).addTo(map);

  longInput.value = longRounded;
  latInput.value = latRounded;
});

var modal = document.getElementById('addHintModal')
modal.addEventListener('shown.bs.modal', function () {
  setTimeout(function () {
    map.invalidateSize();
  }, 100);
})
