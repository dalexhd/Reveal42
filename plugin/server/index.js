const http = require('http');
const express = require('express');
const fs = require('fs');
const mustache = require('mustache');
const basicAuth = require('express-basic-auth');

const authOptions = {
    users: {
        [process.env.USERNAME || 'admin']: process.env.PASSWORD || '1234'
    },
    challenge: true,
    realm: 'Imb4T3st4pp',
};
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const adminNamespace = io.of('/admin');
const publicNamespace = io.of('/public');

const opts = {
    port: process.env.PORT || 1947,
    revealDir: process.cwd(),
    pluginDir: __dirname
};

const isValidJwt = (header) => {
    const token = header.split(' ')[1];
    if (token === process.env.PASSWORD) {
        return true;
    } else {
        return false;
    }
};

adminNamespace.use((socket, next) => {
    const header = socket.handshake.headers['authorization'];
    if (isValidJwt(header)) {
        return next();
    }
    return next(new Error('authentication error'));
});

adminNamespace.on('connection', socket => {
    socket.on('new-subscriber', data => {
        socket.broadcast.emit('new-subscriber', data);
    });

    socket.on('statechanged', data => {
        delete data.state.overview;
        socket.broadcast.emit('statechanged', data);
        delete data.notes;
        publicNamespace.emit('statechanged', data);
    });

    socket.on('statechanged-speaker', data => {
        delete data.state.overview;
        socket.broadcast.emit('statechanged-speaker', data);
    });

    // socket.on('plyrchanged', data => {
    //     socket.broadcast.emit('plyrchanged', data);
    // });

    socket.on('plyrchanged-speaker', data => {
        socket.broadcast.emit('plyrchanged-speaker', data);
    });

    socket.on('plyrchanged', data => {
        delete data.secret;
        publicNamespace.emit('plyrchanged', data);
    });
});

publicNamespace.on('connection', socket => {
    console.log("Client connected!");
});

app.use(express.static(opts.revealDir, {
    index: false
}));


app.get('/', (req, res) => {
    fs.readFile(opts.revealDir + '/index.html', (err, data) => {
        res.send(mustache.render(data.toString(), {
            viewer: true,
            token: null,
            // id: process.env.MULTIPLEX_ID,
            spotifyUrl: process.env.SPOTIFY_URL
        }));
    });

});

app.get('/admin', basicAuth(authOptions), (req, res) => {
    fs.readFile(opts.revealDir + '/index.html', (err, data) => {
        const { receiver, postMessageEvents } = req.query;
        const role = typeof receiver !== 'undefined' && typeof postMessageEvents !== 'undefined' ? 'presenter' : 'admin';
        res.send(mustache.render(data.toString(), {
            [role]: true,
            password: process.env.PASSWORD,
            // id: process.env.MULTIPLEX_ID,
            spotifyUrl: process.env.SPOTIFY_URL
        }));
    });
});

app.get('/notes', basicAuth(authOptions), (req, res) => {
    fs.readFile(opts.pluginDir + '/index.html', (err, data) => {
        res.send(mustache.render(data.toString(), {
            presenter: true,
            password: process.env.PASSWORD
        }));
    });
});

// Actually listen
server.listen(opts.port || null);

let brown = '\033[33m',
    green = '\033[32m',
    reset = '\033[0m';

let slidesLocation = 'http://localhost' + (opts.port ? (':' + opts.port) : '');

console.log(brown + 'reveal.js - Speaker Notes' + reset);
console.log('1. Open the slides at ' + green + slidesLocation + reset);
console.log('2. Click on the link in your JS console to go to the notes page');
console.log('3. Advance through your slides and your notes will advance automatically');
