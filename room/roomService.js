let _io;
function listen(socket){
    socket.on('join-room', (roomId,userId) => {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected', userId);

        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', userId);
        })
    })
}
module.exports = function(io){
    _io = io;
    return {listen};
}