(function () {

    // Don't emit events from inside of notes windows
    if (window.location.search.match(/receiver/gi)) { return; }

    var multiplex = Reveal.getConfig().multiplex;

    var socket = io.connect('/public', {
      transportOptions: {
        polling: {
          extraHeaders: {
            'Authorization': 'Bearer ' + multiplex.secret
          }
        }
      }
    });



    // post once the page is loaded, so the client follows also on "open URL".
    window.addEventListener('load', post);

    // Monitor events that trigger a change in state
    Reveal.on('slidechanged', post);
    Reveal.on('fragmentshown', post);
    Reveal.on('fragmenthidden', post);
    Reveal.on('overviewhidden', post);
    Reveal.on('overviewshown', post);
    Reveal.on('paused', post);
    Reveal.on('resumed', post);

    window.addEventListener("message", function (event) {
        var data = JSON.parse(event.data);
        if (data) {
          switch (data.namespace) {
            case "plyr":
              if (/ready|play|pause|seeked|volumechange/.test(data.type)) {
                var messageData = {
                    data,
                    secret: multiplex.secret,
                    socketId: multiplex.id,
                    event: data.type
                };
                socket.emit("multiplex-plyrchanged", messageData);
              }
              break;
            default:
              break;
          }
        }
      });

}());
