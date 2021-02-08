/** @type {SocketIO.Server} */
let _io;
const MAX_CLIENTS = 20;

/** @param {SocketIO.Socket} socket */
function listen(socket) {
  const io = _io;
  const rooms = io.nsps['/'].adapter.rooms;

  socket.on('join', function(room) {

    let numClients = 0;
    if (rooms[room]) {
      numClients = rooms[room].length;
    }
    if (numClients < MAX_CLIENTS) {
      socket.on('ready', function(usertype) {
        socket.broadcast.to(room).emit('ready', socket.id, usertype); //changes made
      });
      socket.on('offer', function (id, message) {
        socket.to(id).emit('offer', socket.id, message);
      });
      socket.on('answer', function (id, message) {
        socket.to(id).emit('answer', socket.id, message);
      });
      socket.on('candidate', function (id, message) {
        socket.to(id).emit('candidate', socket.id, message);
      });
      /*
      socket.on('change_offer', function (message) {
        socket.broadcast.to(room).emit('offer', socket.id, message);
        console.log(socket.id);
        //socket.emit('offer', id, {'usertype' : 1, 'description': remotePeer.localDescription});
      });*/

      
      socket.on('message', function({msg, room}){
        socket.broadcast.to(room).emit('message', msg);
        console.log(msg);
      });


      socket.on('disconnect', function() {
        socket.broadcast.to(room).emit('bye', socket.id);
      });
      
      socket.on('tutor_ready', function(usertype) {
        socket.broadcast.to(room).emit('tutor_ready', socket.id, usertype); //changes made
      });
      socket.on('tutor_offer', function (id, message) {
        socket.to(id).emit('tutor_offer', socket.id, message);
      });
      socket.on('tutor_answer', function (id, message) {
        socket.to(id).emit('tutor_answer', socket.id, message);
      });
      socket.on('tutor_candidate', function (id, message) {
        socket.to(id).emit('tutor_candidate', socket.id, message);
      });

      socket.on('student_ready', function(usertype) {
        socket.broadcast.to(room).emit('student_ready', socket.id, usertype); //changes made
      });
      socket.on('student_offer', function (id, message) {
        socket.to(id).emit('student_offer', socket.id, message);
      });
      socket.on('student_answer', function (id, message) {
        socket.to(id).emit('student_answer', socket.id, message);
      });
      socket.on('student_candidate', function (id, message) {
        socket.to(id).emit('student_candidate', socket.id, message);
      });
      socket.on('screen_stream_reload', function(message) {
        socket.broadcast.to(room).emit('screen_stream_reload', message); //changes made
      });

      socket.on('poll_question', function(quest) {
        socket.broadcast.to(room).emit('poll_question', quest); //changes made
      });

      socket.on('poll_answer', function(answer) {
        socket.broadcast.to(room).emit('poll_answer', answer); //changes made
      });

      socket.join(room);
    } else {
      socket.emit('full', room);
    }
  });

  /*socket.on('message', function({msg, room}){
    //socket.broadcast.to(room).emit('message', message);
    //{msg, room} = message;
    //socket.broadcast.to(room).emit('message', msg);
    socket.broadcast.emit('message', msg);
    //console.log(room);
    //console.log(msg);
  });*/
}

/** @param {SocketIO.Server} io */
module.exports = function(io) {
  _io = io;
  return {listen};
};