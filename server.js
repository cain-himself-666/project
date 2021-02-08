const express = require('express');
const app = express();
const session = require('express-session');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
// const room = require('./room/room');
// io.sockets.on('connection', room.listen);
// io.sockets.on('error', e => console.log(e));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    name: 'user_sid',
    secret: 'thequickbrownfoxjumpsoverthelazydog',
    saveUninitialized: false,
    resave: false,
    cookie: {
        expires: 60*60*1000
    }
}));
app.use('/', require('./routes/route'));

http.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server started at " + port + " port");
    }
})