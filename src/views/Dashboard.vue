<template>
  <div>
    <router-link
      v-for="room in rooms"
      :key="room.id"
      :to="{name: 'room', params: {roomId: room.id}}"
    >
      {{ room.name }}
    </router-link>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      rooms: []
    }
  },
  async created() {
    const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}rooms`)
    this.rooms = response.data.rooms
  }
}
</script>

<style lang="scss" scoped>
</style>
