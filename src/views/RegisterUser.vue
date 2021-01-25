<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <img src="images/pair_programming.svg" alt="pair-programming" />
      </div>
      <div class="column">
        <h1 class="title is-2 has-text-white has-text-centered">Signup</h1>
        <form class="auth-form" @submit.prevent="register">
          <label for="name">Username</label>
          <input
            v-model="username"
            type="text"
            name="name"
            class="input"
            placeholder="captainjohnsmith"
          />
          <label for="name">Name</label>
          <input
            v-model="name"
            type="text"
            name="name"
            class="input"
            placeholder="Captain John Smith"
          />

          <label for="email">Email</label>
          <input
            v-model="email"
            type="email"
            name="email"
            class="input"
            placeholder="john@gmail.com"
          />

          <label for="password">Password</label>
          <input
            v-model="password"
            type="password"
            name="password"
            class="input"
            placeholder="Password"
          />

          <button type="submit" name="button" class="button btn-primary">Register</button>

          <p class="has-text-danger">{{ error }}</p>

          <router-link to="/login">Already have an account? Login.</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      name: '',
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    register() {
      this.$store
        .dispatch('register', {
          name: this.name,
          username: this.username,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$store.dispatch('showSuccessToast', 'Registered sucessfully')
          this.$router.push({ name: 'dashboard' })
        })
        .catch(err => {
          this.error = err.response.data.error
        })
    }
  }
}
</script>

<style scoped>
</style>
