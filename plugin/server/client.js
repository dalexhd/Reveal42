(function () {

	// don't emit events from inside the previews themselves

	if (window.location.search.match(/receiver/gi)) return;

	const multiplex = Reveal.getConfig().multiplex;
	const socket = io.connect('/admin', {
		transportOptions: {
		  polling: {
			extraHeaders: {
			  'Authorization': 'Bearer ' + multiplex.secret
			}
		  }
		}
	});

	console.log('View slide notes at ' + window.location.origin + '/notes');

	let spotifyIframe = null;
	const removeSpotifyÌframe = function () {
		spotifyIframe = document.querySelector("iframe[src*='/player']");
		if (spotifyIframe !== null)
			spotifyIframe.remove();
		spotifyIframe = null;
	}

	window.onbeforeunload = function () {
		removeSpotifyÌframe();
	}

	/**
	 * Posts the current slide data to the viewers
	 */
	function postMultiplex() {
		socket.emit('multiplex-statechanged', {
            state: Reveal.getState()
        });
	}

	/**
	 * Posts the current slide data to the notes window
	 */
	function post() {

		var slideElement = Reveal.getCurrentSlide(),
			notesElement = slideElement.querySelector('aside.notes');

		var messageData = {
			notes: '',
			markdown: false,
			state: Reveal.getState()
		};

		// Look for notes defined in a slide attribute
		if (slideElement.hasAttribute('data-notes')) {
			messageData.notes = slideElement.getAttribute('data-notes');
		}

		// Look for notes defined in an aside element
		if (notesElement) {
			messageData.notes = notesElement.innerHTML;
			messageData.markdown = typeof notesElement.getAttribute('data-markdown') === 'string';
		}
		socket.emit('statechanged', messageData);
		postMultiplex();
	}

	// When a new notes window connects, post our current state
	socket.on('new-subscriber', function (data) {
		post();
	});

	// When the state changes from inside of the speaker view
	socket.on('statechanged-speaker', function (data) {
		Reveal.setState(data.state);
	});

	// Monitor events that trigger a change in state
	['slidechanged', 'ready'].forEach(event => {
		Reveal.on(event, (data) => {
			if (data.indexh === 0 || data.indexh === 2) {
				removeSpotifyÌframe();
			} else if (data.indexh === 1 && spotifyIframe === null) {
				var iframe = document.createElement('iframe');
				iframe.style.display = "none";
				iframe.setAttribute("allow", "encrypted-media, autoplay");
				iframe.src = `${spotifyUrl}/player`;
				document.body.appendChild(iframe);
			}
			post();
		});
	});
	['fragmentshown', 'fragmenthidden', 'overviewhidden', 'overviewshown', 'paused', 'resumed'].forEach((event) => {
		Reveal.on(event, post);
	});
	
	socket.on('plyrchanged-speaker', function ({ event, data: { data } }) {
		const player = document.getElementById(data.id);
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
			case 'volumechange':
				player.volume = data.volume;
				break;
			default:
				return;
		}

		if (/ready|play|pause|seeked|volumechange/.test(event)) {
			var messageData = {
				data,
				secret: multiplex.secret,
				event: event
			};
			socket.emit("multiplex-plyrchanged", messageData);
		}
	});

	// Post the initial state
	post();
}());
