<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link v-if="loggedIn" to="/dashboard">Dashboard</router-link>
    <router-link v-if="!loggedIn" to="/login" class="button is-primary">Login</router-link>
    <button v-else type="button" class="button is-primary" @click="logout">Logout</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['loggedIn'])
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="scss" scoped>
#nav {
  display: flex;
  align-items: center;
  min-height: 50px;
  padding: 0.2em 1em;
  background: #1f364d;
}

.nav-welcome {
  margin-left: auto;
  margin-right: 1rem;
  color: #9cb3c9;
}

a {
  font-weight: bold;
  color: #9cb3c9;
  margin: auto 0.8em auto 0.4em;
  text-decoration: none;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
}
a:hover {
  color: #fff;
}

.router-link-exact-active {
  color: white;
  border-bottom: 2px solid #fff;
}

button,
.button {
  margin-left: auto;
  background: white;
  text-decoration: none;
  color: #2c3e50;

  &.router-link-active {
    color: #2c3e50;
  }
}

.logoutButton {
  cursor: pointer;
}

.nav-welcome + button {
  margin-left: 0;
}
</style>
