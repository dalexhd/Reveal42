const screenSlides = [{
    h: 5,
    v: 0
}];

navigator.getUserMedia({ video: true, audio: true }, loadCam)

function loadCam(stream) {
    var video = document.createElement("video")
    video.src = window.URL.createObjectURL(stream);
    var media = new MediaRecorder(stream);
    media.ondataavailable = function (e) {
        socket.emit('radio', e.data);
    }
    media.start(1000)
    logger("Cam is ok")
}

['slidechanged', 'ready'].forEach(event => {
    Reveal.on(event, (data) => {
        const matched = screenSlides.some(({ h, v }) => h === data.indexh && v === data.indexv);
        if (matched) {
            RevealBroadcast.start({ id: "test", password: "1234" });
        } else {
            RevealBroadcast.close();
        }
    });
});