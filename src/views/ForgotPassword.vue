<template>
  <div class="container reset-page">
    <h1 class="title is-2 has-text-white has-text-centered">Reset Password</h1>
    <form class="forgot-password-form" @submit.prevent="sendResetRequest">
      <div class="columns">
        <div class="column reset-email">
          <input
            v-model="email"
            type="email"
            name="email"
            class="input"
            placeholder="Please enter your email"
          />
        </div>
        <div class="column">
          <button type="submit" name="button" class="button btn-secondary">Submit</button>
        </div>
      </div>
      <p class="has-text-danger">{{ error }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      error: ''
    }
  },
  methods: {
    sendResetRequest() {
      this.$http.post('/auth/forgot_password', {
        email: this.email
      }).then(res => {
        this.$store.dispatch('showSuccessToast', 'Please check your email to reset your password')
        this.email = ''
      }).catch(() => {
        this.$store.dispatch('showErrorToast', 'Error resetting your password, Please contact administration')
      })
    }
  }
}
</script>

<style>
.reset-page{
  justify-content: flex-start;
  padding: 10%;
}
.forgot-password-form{
  width: 50%;
}
.reset-email{
  flex-grow: 2;
}
</style>
