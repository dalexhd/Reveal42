const screenSlides = [{
    h: 5,
    v: 0
}];


Reveal.on('slidechanged', (data) => {
    const matched = screenSlides.some(({ h, v }) => h === data.indexh && v === data.indexv);
    if (matched) {
        setTimeout(() => {
            location.reload();
        }, 250);
    } else {
        const player = document.getElementById('broadcast-mediaplayer');
        if (player !== null) {
            player.remove()
        }
    }
});

Reveal.on('ready', (data) => {
    const matched = screenSlides.some(({ h, v }) => h === data.indexh && v === data.indexv);
    if (matched) {
        RevealBroadcast.connect({ id: "test" });
    }
});
