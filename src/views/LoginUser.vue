<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <img src="images/pair_programming.svg" alt="pair-programming" />
      </div>
      <div class="column">
        <h1 class="title is-2 has-text-white has-text-centered">Login</h1>
        <form class="auth-form" @submit.prevent="login">
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

          <button type="submit" name="button" class="button btn-primary">Login</button>
          <span class="reset"><router-link to="/forgot_password">Forgot Password?</router-link></span>
          <p class="has-text-danger">{{ error }}</p>

          <router-link to="/register">Don't have an account? Register.</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    login() {
      this.$store
        .dispatch('login', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$store.dispatch('showSuccessToast', 'Logged in sucessfully')
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
.reset {
  display: inline-block;
  padding: 10px;
}
</style>
