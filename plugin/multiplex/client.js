(function () {
    var multiplex = Reveal.getConfig().multiplex;
    var socketId = multiplex.id;
    var socket = io.connect(multiplex.url);

    socket.on(multiplex.id, function (data) {
        // ignore data from sockets that aren't ours
        if (data.socketId !== socketId) { return; }
        if (data?.data?.namespace === 'plyr') {
            const player = window.currentPlyr;
            switch (data.event) {
                case 'play':
                    player.play();
                    break;
                case 'pause':
                    player.pause();
                    break;
                case 'seeked':
                    player.currentTime = data.data.data.currentTime;
                    break;
                default:
                    return;
            }
        } else {
            Reveal.setState(data.state);
        }
    });
}());
