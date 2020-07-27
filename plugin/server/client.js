(function () {

	// don't emit events from inside the previews themselves
	if (window.location.search.match(/receiver/gi)) { return; }

	var socket = io.connect(window.location.origin),
		socketId = Math.random().toString().slice(2);

	console.log('View slide notes at ' + window.location.origin + '/notes/' + socketId);

	let spotifyWindow = null;
	Reveal.on('slidechanged', (data) => {
		console.log(data.indexh);
		if (data.indexh === 0 && spotifyWindow !== null) {
			return spotifyWindow.close();
		} else if (data.indexh === 1) {
			spotifyWindow = window.open('https://spotify-widget.herokuapp.com/player', '_blank', 'width=400,height=200');
		} else if (data.indexh === 2) {
			spotifyWindow.close();
			spotifyWindow = null;
		}
	});
	window.onbeforeunload = function () {
		spotifyWindow.close();
		spotifyWindow = null;
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
	Reveal.on('slidechanged', post);
	Reveal.on('fragmentshown', post);
	Reveal.on('fragmenthidden', post);
	Reveal.on('overviewhidden', post);
	Reveal.on('overviewshown', post);
	Reveal.on('paused', post);
	Reveal.on('resumed', post);

	// Post the initial state
	post();

}());
