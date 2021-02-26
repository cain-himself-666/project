const socket = io.connect(window.location.origin);
const videoGrid = document.getElementById('video-grid');
// const localVideo = document.getElementById('local-video');
// const remoteVideo = document.getElementById('remote-video');
const peer = new Peer();
const peers = {};
const myVideo = document.createElement('video');
myVideo.muted = true;
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream);
    peer.on('call', call => {
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream', streamVideo => {
            addVideoStream(video, streamVideo);
        })
    })
    socket.on('user-connected', userId => {
        connectUser(userId, stream);
    })
})
// socket connection
peer.on('open', userid => {
    socket.emit('join-room', ROOM_ID, userid);
})
socket.on('user-disconnected', userId => {
    console.log('User Disconnected: '+userId);
    if(peers[userId]){
        peers[userId].close()
    }
})

function connectUser(userId, stream){
    console.log('User Connected: '+ userId);
    const call = peer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', userVideo => {
        addVideoStream(video, userVideo);
    });
    call.on('close', () => {
        video.remove();
    })
    peers[userId] = call;
}

function addVideoStream(video, stream){
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    videoGrid.append(video);
}

