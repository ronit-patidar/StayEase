// ---------- Rating Stars ----------
const stars = document.querySelectorAll('.rating-star');
const inputField = document.getElementById('rating-value');

function updateFilledStars(value) {
  stars.forEach((star) => {
    const starValue = Number(star.getAttribute('data-value'));

    if (starValue <= Number(value)) {
      star.classList.remove('fa-regular');
      star.classList.add('fa-solid');
    } else {
      star.classList.remove('fa-solid');
      star.classList.add('fa-regular');
    }
  });
}

if (stars.length > 0) {
  updateFilledStars(3);

  stars.forEach((star) => {
    star.addEventListener('click', () => {
      const ratingValue = star.getAttribute('data-value');

      if (inputField) {
        inputField.value = ratingValue;
      }

      updateFilledStars(ratingValue);
    });
  });
}

// ---------- Map Logic ----------
const mapEl = document.getElementById('map');
const coordinates = listing.geometry?.coordinates;

if (mapEl) {
  if (!coordinates || coordinates.length !== 2) {
    mapEl.innerHTML = "<p class='text-muted p-3 m-0'>Map unavailable for this listing.</p>";
  } else {
    // GeoJSON is [lng, lat]; Leaflet needs [lat, lng]
    const mapCoordinates = [coordinates[1], coordinates[0]];

    const icon = L.icon({
      iconUrl: '/assets/compass.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -20],
    });

    const map = L.map('map').setView(mapCoordinates, 10);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Build the popup with DOM nodes so a title containing HTML can't inject markup
    const popup = document.createElement('div');
    popup.style.textAlign = 'center';

    const title = document.createElement('h4');
    title.style.cssText = 'color:#fe424d;margin:0;';
    title.textContent = listing.title;

    const note = document.createElement('p');
    note.style.margin = '5px 0';
    note.textContent = 'Exact location provided after booking.';

    const price = document.createElement('p');
    price.style.cssText = 'font-weight:bold;font-size:1.1rem;';
    price.textContent = `₹ ${Number(listing.price).toLocaleString('en-IN')}/night`;

    popup.append(title, note, price);

    L.marker(mapCoordinates, { icon }).addTo(map).bindPopup(popup).openPopup();
  }
}