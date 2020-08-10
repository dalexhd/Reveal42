(function () {
    var socket = io.connect('/public');
    
    socket.on('statechanged', function (data) {
        Reveal.setState(data.state);
    });

    socket.on('plyrchanged', function ({event, data}) {
        const player = window.currentPlyr;
        switch (event) {
            case 'play':
                player.play();
                break;
            case 'pause':
                player.pause();
                break;
            case 'seeked':
                player.currentTime = data.currentTime;
                break;
            default:
                return;
        }
    });
}());
