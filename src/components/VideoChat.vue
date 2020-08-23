<template>
  <div id="video-chat">
    <video id="host-video"></video>
  </div>
</template>

<script>
import Peer from 'peerjs'
export default {
  data() {
    return {
      hostId: null,
      peerId: null,
      hostStream: null,
      peerStream: null,
      videoConnection: null,
      peerCall: null
    }
  },
  beforeDestroy() {
    const hostStreamTracks = this.hostStream.getTracks()
    hostStreamTracks.forEach((track) => track.stop())
  },
  created() {
    // connect to webRTC server and get a peerID
    this.videoConnection = new Peer({
      host: process.env.VUE_APP_API_PEERJS_HOST,
      port: process.env.VUE_APP_API_PEERJS_PORT,
      path: '/'
    })

    this.videoConnection.on('open', (id) => {
      this.hostId = id
      this.$emit('host-connected', this.hostId)
      this.startStream()
    })

    this.videoConnection.on('call', (call) => {
      call.answer(this.hostStream)
      const peerVideo = document.createElement('video')
      call.on('stream', (userVideoStream) => {
        this.peerStream = userVideoStream
        this.addVideoStream(peerVideo, userVideoStream)
      })
      call.on('close', () => {
        peerVideo.remove()
      })
      this.peerCall = call
    })
  },
  methods: {
    connectToPeer(peerId) {
      this.peerId = peerId
      const call = this.videoConnection.call(peerId, this.hostStream)
      const peerVideo = document.createElement('video')
      call.on('stream', (userVideoStream) => {
        this.peerStream = userVideoStream
        this.addVideoStream(peerVideo, userVideoStream)
      })
      call.on('close', () => {
        peerVideo.remove()
      })
      this.peerCall = call
    },
    disconnectPeer() {
      this.peerCall.close()
    },
    startStream() {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: true
        })
        .then((stream) => {
          this.hostStream = stream
          const hostVideo = document.getElementById('host-video')
          hostVideo.muted = true
          this.addVideoStream(hostVideo, stream)
        })
    },
    addVideoStream(video, stream) {
      const videoChat = document.getElementById('video-chat')
      video.srcObject = stream
      video.addEventListener('loadedmetadata', () => {
        video.play()
      })
      video.style.width = '150px'
      video.style.height = '150px'
      videoChat.append(video)
    }
  }
}
</script>

<style lang="scss" scoped>
video {
  margin-right: 10px;
}
</style>
