(function () {

	// don't emit events from inside the previews themselves

	if (window.location.search.match(/receiver/gi)) return;

	var socket = io.connect(window.location.origin),
		socketId = Math.random().toString().slice(2);

	console.log('View slide notes at ' + window.location.origin + '/notes/' + socketId);

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
	 * Posts the current slide data to the notes window
	 */
	function post() {

		var slideElement = Reveal.getCurrentSlide(),
			notesElement = slideElement.querySelector('aside.notes');

		var messageData = {
			notes: '',
			markdown: false,
			socketId: socketId,
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
	Reveal.on('slidechanged', (data) => {
		if (data.indexh === 0 || data.indexh ===2) {
			removeSpotifyÌframe();
		} else if (data.indexh === 1 && spotifyIframe === null) {
			var iframe = document.createElement('iframe');
			iframe.style.display = "none";
			iframe.setAttribute("allow", "encrypted-media, autoplay");
			iframe.src = "https://spotify-widget.herokuapp.com/player";
			document.body.appendChild(iframe);
		}
		post();
	});
	['fragmentshown', 'fragmenthidden', 'overviewhidden', 'overviewshown', 'paused', 'resumed'].forEach((event) => {
		Reveal.on(event, post);
	});

	// Post the initial state
	post();
}());
