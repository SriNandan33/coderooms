<template>
  <div id="video-chat"></div>
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
      videoConnection: null
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
        this.addVideoStream(peerVideo, userVideoStream)
      })
    })
  },
  methods: {
    connectToPeer(peerId) {
      console.log('calling Peer')
      this.peerId = peerId
      const call = this.videoConnection.call(peerId, this.hostStream)
      const peerVideo = document.createElement('video')
      call.on('stream', (userVideoStream) => {
        console.log('on stream')
        this.addVideoStream(peerVideo, userVideoStream)
      })
      call.on('close', () => {
        peerVideo.close()
      })
    },
    disconnectPeer() {
      console.log('disconnting peer')
    },
    startStream() {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: true
        })
        .then((stream) => {
          this.hostStream = stream
          const hostVideo = document.createElement('video')
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
      videoChat.appendChild(video)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
