<template>
  <div class="container reset-page">
    <h1 class="title is-2 has-text-white has-text-centered">Reset Password</h1>
    <form class="reset-password-form" @submit.prevent="resetPassword">
      <div class="columns">
        <div class="column reset-email">
          <label for="password">New Password</label>
          <input
            v-model="password"
            type="password"
            name="password"
            class="input"
            placeholder="Enter your password"
          />
          <label for="confirmpassword">Confirm Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            name="confirmpassword"
            class="input"
            placeholder="Confirm password"
          />
          <p class="has-text-danger">{{ error }}</p>
          <button type="submit" name="button" class="button btn-secondary">Submit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    token: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {
      password: '',
      confirmPassword: '',
      error: ''
    }
  },
  methods: {
    async resetPassword() {
      this.error = ''
      if (!this.passwordsMatched()) {
        this.error = 'Passwords do not match'
      } else {
        try {
          await this.$http.post(`/auth/reset_password/${this.token}`, {
            password: this.password,
            confirmPassword: this.confirmPassword
          })
          this.$store.dispatch('showSuccessToast', 'Your password updated successfully')
          this.$router.push({ name: 'login' })
        } catch (err) {
          const error = err.response.data
          this.$store.dispatch('showErrorToast', error.message)
        }
      }
    },
    passwordsMatched() {
      return this.password === this.confirmPassword
    }
  }
}
</script>

<style scoped>
.reset-page{
  justify-content: flex-start;
  padding: 10%;
}
.reset-password-form{
  width: 40%;
}
input, label, p {
  margin-bottom: 15px;
}
</style>
