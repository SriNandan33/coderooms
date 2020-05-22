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
export default {
  data() {
    return {
      rooms: []
    }
  },
  async created() {
    const response = await this.$http.get('rooms')
    this.rooms = response.data.rooms
  }
}
</script>

<style lang="scss" scoped>
</style>
