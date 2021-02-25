const socket = io.connect(window.location.origin);
const videoGrid = document.getElementById('video-grid');
const localVideo = document.getElementById('local-video');
const remoteVideo = document.getElementById('remote-video');
const userid = Math.floor(Math.random() * 1000);
 
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(localVideo, stream);
    // socket.on('user-connected', userId => {
    //     connect(ROOM_ID,userId, stream);
    // })
})
// socket connection
socket.emit('join-room', ROOM_ID, userid);
socket.on('user-connected', userId => {
    console.log('User Connected: '+userId);
})
socket.on('user-disconnected', userId => {
    console.log('User Disconnected: '+userId);
})

// function connect(roomId, userId, stream){
//     socket.to(roomId).broadcast.emit('')
// }

function addVideoStream(video, stream){
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
}

