mapboxgl.accessToken =
   'pk.eyJ1IjoiYmFiYnMiLCJhIjoiY2s1b2JoMjZvMGYydzNmbXAxMXp1NWZhZyJ9.LEHmtAFLAij67eF-54FjxA';
const map = new mapboxgl.Map({
   container: document.querySelector('.map'),
   style: 'mapbox://styles/babbs/ckfvm0tt72zar19quhbna5s0k',
   center: { lng: -75.14587642289808, lat: 39.96865460678771 },
   zoom: 12,
});

(async () => {
   const data = await fetch('data.json').then((res) => res.json());

   console.log(data);

   data.forEach((loc) => {
      const markerContainer = document.createElement('div');
      markerContainer.classList.add('marker-container');
      const outerMarker = document.createElement('div');
      outerMarker.classList.add('outer-marker');
      const innerMarker = document.createElement('div');
      innerMarker.classList.add('inner-marker');

      const { name, address } = loc;
      const tooltip = new Tooltip({
         name,
         address,
      });

      markerContainer.appendChild(outerMarker);
      markerContainer.appendChild(innerMarker);
      markerContainer.appendChild(tooltip);

      new mapboxgl.Marker(markerContainer).setLngLat(loc.position).addTo(map);
   });
})();

class Tooltip {
   constructor({ name, address }) {
      const node = document.createElement('div');
      node.classList.add('tooltip');

      node.innerHTML = `
         <div class="tooltip-title">${name}</div>
         <div class="tooltip-subtitle">${address}</div>
      `;

      return node;
   }
}
