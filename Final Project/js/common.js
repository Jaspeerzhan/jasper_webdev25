//if the window scroll the button will show up
window.addEventListener("scroll", () => {
    const btn = document.getElementById("toTopBtn");
    if (window.scrollY > 300) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  });
  
  // scrollTo the top 0 and smooth
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  

  // weather.js, use fetch get asynchronus api to get weather and time
function getWeather(cityName, latitude, longitude, timezone, containerId = "weather-info") {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&timezone=${timezone}`;
  
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const currentHour = getCurrentHourISO(timezone);
        const index = data.hourly.time.indexOf(currentHour);
        const container = document.getElementById(containerId);
        if (index !== -1 && data.hourly.temperature_2m[index] !== undefined) {
          const temp = data.hourly.temperature_2m[index];
  
          container.innerHTML = `
            📍 <strong>${cityName}</strong><br>
            🌡️ Temperature: <strong>${temp}°C</strong><br>
            🕒 Local Time: ${new Date().toLocaleTimeString([], {
              timeZone: timezone,
              hour: "2-digit",
              minute: "2-digit"
            })}
          `;
        } else {
          container.textContent = "Temperature data not available.";
        }
      })
      .catch(err => {
        console.error("Weather error:", err);
        const container = document.getElementById(containerId);
        if (container) {
          container.textContent = "Weather info unavailable.";
        }
      });
  }
  
  // Because you should follow the format of returned data

  function getCurrentHourISO(timezone) {
    const now = new Date();
    const tzDate = new Date(now.toLocaleString("en-US", { timeZone: timezone }));
  
    tzDate.setMinutes(0);
    tzDate.setSeconds(0);
    tzDate.setMilliseconds(0);
  
    const year = tzDate.getFullYear();
    const month = String(tzDate.getMonth() + 1).padStart(2, '0');
    const day = String(tzDate.getDate()).padStart(2, '0');
    const hour = String(tzDate.getHours()).padStart(2, '0');
  
    return `${year}-${month}-${day}T${hour}:00`;
  }

  /*{
    "latitude": 52.52,
    "longitude": 13.419,
    "elevation": 44.812,
    "generationtime_ms": 2.2119,
    "utc_offset_seconds": 0,
    "timezone": "Europe/Berlin",
    "timezone_abbreviation": "CEST",
    "hourly": {
        "time": ["2022-07-01T00:00", "2022-07-01T01:00", "2022-07-01T02:00", ...],
        "temperature_2m": [13, 12.7, 12.7, 12.5, 12.5, 12.8, 13, 12.9, 13.3, ...]
    },
    "hourly_units": {
        "temperature_2m": "°C"
    }
}*/


// Sticker
const cityStickers = {
  hawaii: [
    { name: 'turtle', emoji: '🐢' },
    { name: 'flower', emoji: '🌺' },
    { name: 'surfboard', emoji: '🏄‍♂️' },
    { name: 'volcano', emoji: '🌋' }
  ],
  rome: [
    { name: 'colosseum', emoji: '🏛️' },
    { name: 'pizza', emoji: '🍕' },
    { name: 'vespa', emoji: '🛵' },
    { name: 'gladiator', emoji: '🛡️' }
  ],
  florence: [
    { name: 'painting', emoji: '🎨' },
    { name: 'castle', emoji: '🏰' },
    { name: 'wine', emoji: '🍷' },
    { name: 'david', emoji: '🗿' }
  ],
  dolomite: [
    { name: 'mountain', emoji: '🏔️' },
    { name: 'hikingBoot', emoji: '🥾' },
    { name: 'cableCar', emoji: '🚡' },
    { name: 'camping', emoji: '🏕️' }
  ]
};


document.addEventListener('DOMContentLoaded', () => {
  const currentCity = document.body.dataset.city;
  const stickers = cityStickers[currentCity];
  if (!stickers) return; 
  //only generated the stickers that has not been collected
  let collected = JSON.parse(localStorage.getItem('stickers')) || [];
  const availableStickers = stickers.filter(sticker => !collected.includes(sticker.name));
  if (availableStickers.length === 0) {
    return;
  }
  const randomIndex = Math.floor(Math.random() * availableStickers.length);
  const sticker = availableStickers[randomIndex];
  const div = document.createElement('div');
  div.textContent = sticker.emoji;
  div.classList.add('sticker');
  div.dataset.name = sticker.name;
  div.style.position = 'absolute';
  div.style.top = `${Math.random() * 80 + 10}%`;
  div.style.left = `${Math.random() * 80 + 10}%`;
  div.style.fontSize = '2.5rem'; 
  div.style.cursor = 'pointer';
  div.style.userSelect = 'none';

  div.addEventListener('click', () => {
    collectSticker(sticker.name);
    div.remove();
  });

  document.body.appendChild(div);
});

function collectSticker(name) {
  let collected = JSON.parse(localStorage.getItem('stickers')) || [];
  if (!collected.includes(name)) {
    collected.push(name);
    localStorage.setItem('stickers', JSON.stringify(collected));
  }
}

  