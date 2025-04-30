export const MAP = `
              <!DOCTYPE html>
              <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                  #map { height: 100%; width: 100%; }
                  body, html { margin: 0; height: 100%; }
                </style>
              </head>
              <body>
                <div id="map"></div>
                <script src="https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/leaflet.js"></script>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/leaflet.css" />
                <script>
                  const map = L.map('map').setView([53.9, 27.5667], 10);
                  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19
                  }).addTo(map);

                  let marker;
                  map.on('click', (e) => {
                    const { lat, lng } = e.latlng;
                    if (marker) {
                      marker.setLatLng(e.latlng);
                    } else {
                      marker = L.marker(e.latlng).addTo(map);
                    }
                    window.ReactNativeWebView.postMessage(JSON.stringify({
                      type: 'selectLocation',
                      latitude: lat,
                      longitude: lng
                    }));
                  });
                </script>
              </body>
              </html>
              `;
