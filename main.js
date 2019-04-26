const position = [52.2297700, 21.0117800];
const scale = 10;
let i = 1;
const markers = [];
const map = L.map('map').setView(position, scale);

L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=Ee3e7fzrAcQrEGR6fSKs', {
  attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>'
}).addTo(map);

map.on('click', e => {

  const posMarker = e.latlng;
  const newMarker = new L.marker(posMarker, { draggable: true, title: `Marker nr: ${i}` });
  const markerTitle = newMarker.options.title;
  newMarker.addTo(map);
  newMarker.bindPopup(`${markerTitle} ${posMarker}`).openPopup();
  // console.log(markerTitle);
  // markers.push(newMarker);
  const newP = document.createElement('p');
  newP.id = markerTitle;
  newP.innerHTML = `<b>${markerTitle}</b> Szerokość: ${(posMarker.lat).toFixed(3)}, Długość:${(posMarker.lng).toFixed(3)} `;
  document.querySelector('.markers').appendChild(newP);
  i++;

  newMarker.on('dragend', (e) => {
    const marker = e.target;

    // console.log(marker.options.title);

    // console.log(marker);
    const newPosition = marker.getLatLng();
    // console.log(newPosition);
    marker.setLatLng(new L.LatLng(newPosition.lat, newPosition.lng), { draggable: 'true' });
    marker.bindPopup(`${markerTitle} ${newPosition}`).update().openPopup();
    document.getElementById(`${marker.options.title}`).innerHTML = `<b>${e.target.options.title}</b> Szerokość: ${(newPosition.lat).toFixed(3)}, Długość:${(newPosition.lng).toFixed(3)} `;
  })
})

