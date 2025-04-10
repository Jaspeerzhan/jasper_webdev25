
function goToRandomCity() {
    const cityPages = [
        './Florence.html',
        './RedDerby.html',
        //if i complete the other pages, I will add more links here
        
    ];
    const randomIndex = Math.floor(Math.random() * cityPages.length);
    const selectedPage = cityPages[randomIndex];
    window.location.href = selectedPage;
}

