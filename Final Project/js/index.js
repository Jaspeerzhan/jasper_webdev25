function goToRandomCity() {
    const cityPages = [
        './Hawaii.html',
        './HawaiiGallery.html',
        './Rome.html',
        './Florence.html',
        './Dolomite.html',
        './Italygallery.html',
        './RedDerby.html',
        './RomeDerby.html',
        './Me.html'
    ];
    const randomIndex = Math.floor(Math.random() * cityPages.length);
    const selectedPage = cityPages[randomIndex];
    window.location.href = selectedPage;
}


document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('stickerBook')) return;
    
    const collected = JSON.parse(localStorage.getItem('stickers')) || [];
    const allStickers = [
      { name: 'turtle', emoji: '🐢' },
      { name: 'flower', emoji: '🌺' },
      { name: 'surfboard', emoji: '🏄‍♂️' },
      { name: 'volcano', emoji: '🌋' },
      { name: 'colosseum', emoji: '🏛️' },
      { name: 'pizza', emoji: '🍕' },
      { name: 'vespa', emoji: '🛵' },
      { name: 'gladiator', emoji: '🛡️' },
      { name: 'painting', emoji: '🎨' },
      { name: 'castle', emoji: '🏰' },
      { name: 'wine', emoji: '🍷' },
      { name: 'david', emoji: '🗿' },
      { name: 'mountain', emoji: '🏔️' },
      { name: 'hikingBoot', emoji: '🥾' },
      { name: 'cableCar', emoji: '🚡' },
      { name: 'camping', emoji: '🏕️' }
    ];
  
    const container = document.getElementById('stickerBook');
  
    allStickers.forEach(sticker => {
      const div = document.createElement('div');
      div.textContent = sticker.emoji;
      div.classList.add('sticker-in-book');
      if (!collected.includes(sticker.name)) {
        div.style.opacity = '0.3';
      }
  
      container.appendChild(div);
    });
  });
  