const express = require('express');
const app = express();
const session = require('express-session');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    name: 'user_sid',
    secret: 'ye@h!$m!ledallthet!mew@spretend!ngt0be0k@y',
    saveUninitialized: false,
    resave: false,
    cookie: {
        expires: 60*60*1000
    }
}));
app.use('/', require('./routes/route'));
io.sockets.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected', userId);
    })
})
server.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server started at " + port + " port");
    }
})
