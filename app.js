const showcase = [
   {
      position: { lng: -75.19070164438227, lat: 39.95330735782943 },
      region_id: 'center-west',
      region: 'Center City & West Philadelphia',
      zoom: 12,
   },
   {
      position: { lng: -75.16394864511551, lat: 40.00248519841409 },
      region_id: 'north',
      region: 'North Philadelphia',
      zoom: 12,
   },
   {
      position: { lng: -75.0251, lat: 40.105725 },
      region_id: 'northeast',
      region: 'Far Northeast',
      zoom: 12,
   },
   {
      position: { lng: -75.13348184939287, lat: 39.99435816307883 },
      region_id: 'all',
      region: 'City Wide',
      zoom: 10.276606498480344,
   },
];

mapboxgl.accessToken =
   'pk.eyJ1IjoiYmFiYnMiLCJhIjoiY2s1b2JoMjZvMGYydzNmbXAxMXp1NWZhZyJ9.LEHmtAFLAij67eF-54FjxA';
const map = new mapboxgl.Map({
   container: document.querySelector('.map'),
   style: 'mapbox://styles/babbs/ckfvm0tt72zar19quhbna5s0k',
   center: showcase[0].position,
   zoom: 11,
   // interactive: false,
});

(async () => {
   const data = await fetch('data.json').then((res) => res.json());

   console.log(data);

   data.forEach((loc) => {
      const markerContainer = document.createElement('div');
      markerContainer.classList.add('marker-container');
      markerContainer.classList.add(loc.region_id);
      markerContainer.classList.add('all');
      markerContainer.style.opacity = 0;
      const outerMarker = document.createElement('div');
      outerMarker.classList.add('outer-marker');
      const innerMarker = document.createElement('div');
      innerMarker.classList.add('inner-marker');

      const { name, address, id = '' } = loc;
      const tooltip = new Tooltip({
         name,
         address,
         id,
      });

      markerContainer.appendChild(outerMarker);
      markerContainer.appendChild(innerMarker);
      markerContainer.appendChild(tooltip);

      new mapboxgl.Marker(markerContainer).setLngLat(loc.position).addTo(map);
   });

   let i = 0;
   const duration = 16000;
   flyTo(showcase[i], i);
   setInterval(() => {
      i++;

      flyTo(showcase[i], i);
   }, duration);

   function flyTo({ position, region_id, region, zoom }, i) {
      const nodes = [...document.querySelectorAll('.marker-container')];
      nodes.forEach((d) => {
         d.style.opacity = 0;
      });

      const labels = [...document.querySelectorAll('.title-option')];
      labels.forEach((d) => {
         d.style.opacity = 0;
      });
      labels.find((x) => x.id === region_id).style.opacity = 1;

      if (i === showcase.length - 1) {
         console.log('final...');

         // lol:
         document.getElementById('julia').style.top = -59 + -18 + 'px';
         document.getElementById('rox').style.top = -59 + -18 + 'px';

         document.getElementById('overbrook').style.left = -264 + -18 + 'px';
      }
      setTimeout(() => {
         nodes
            .filter((x) => x.classList.contains(region_id))
            .forEach((d) => {
               d.style.opacity = 1;
            });
      }, duration / 4);

      map.flyTo({
         center: position,
         duration: duration / 4,
         zoom,
         easing: function (t) {
            return -(Math.cos(Math.PI * t) - 1) / 2;
         },
      });
   }
})();

class Tooltip {
   constructor({ name, address, id }) {
      const node = document.createElement('div');
      node.classList.add('tooltip');
      node.id = id;

      node.innerHTML = `
         <div class="tooltip-title">${name}</div>
         <div class="tooltip-subtitle">${address}</div>
      `;

      return node;
   }
}
