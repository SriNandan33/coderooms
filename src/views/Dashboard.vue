<template>
  <div class="section">
    <div class="container">
      <div class="columns has-text-centered">
        <div class="column">Ready to share you code with the world?</div>
        <div class="column">
          <button class="button btn-secondary" @click="createRoom">Create Room</button>
        </div>
      </div>
      <div v-if="rooms.length > 0">
        <h4 class="title is-4 has-text-white has-text-centered">Your Rooms</h4>
        <table class="table">
          <tr v-for="(room, rIndex) in rooms" :key="room.id">
            <td>{{ rIndex + 1 }}</td>
            <td>
              <router-link :to="{name: 'room', params: {roomId: room.id}}">{{ room.name }}</router-link>
            </td>
            <td>{{ room.language }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rooms: []
    }
  },
  async created() {
    const response = await this.$http.get('rooms')
    this.rooms = response.data.rooms
  },
  methods: {
    async createRoom() {
      const response = await this.$http.post('rooms')
      this.$router.push({
        name: 'room',
        params: { roomId: response.data.room.id }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
td {
  text-transform: capitalize;
}
</style>
