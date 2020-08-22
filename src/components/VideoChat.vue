<template>
  <div>VideoChat</div>
</template>

<script>
import Peer from 'peerjs'
export default {
  props: {
    peerId: {
      type: String,
      default: ''
    },
    hostId: {
      type: String,
      default: ''
    }
  },
  created() {
    const peer = new Peer({
      host: 'localhost',
      port: 9000,
      path: '/'
    })
    console.log('peer', peer)

    // connect
    const connection = peer.connect(this.peerId)
    connection.on('open', () => {
      connection.send('Hi')
    })

    // receive
    peer.on('connection', (connection) => {
      connection.on('data', (data) => {
        console.log(data)
      })
      connection.on('open', () => {
        connection.send('Hello')
      })
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
