<template>
  <div v-if="token">
    Verifiing..
  </div>
  <section v-else>
    <p class="title">
      Verify your identify
    </p>
    <p class="subtitle">
      Please check your email and verify your identify. Didn't recieve email ? click
      <button class="button btn-secondary" @click="resendVerification">Resend</button>
    </p>
  </section>
</template>

<script>
export default {
  props: {
    token: {
      type: String,
      default: undefined
    }
  },
  async mounted() {
    if (!this.token) return
    try {
      const response = await this.$http.post(`/auth/verify/${this.token}`)
      const user = response.data.user
      this.$store.commit('SET_USER_DATA', user)
      this.$store.dispatch('showSuccessToast', 'Successfully verfied your identity. Enjoy using Coderooms')
      this.$router.push({ name: 'dashboard' })
    } catch (err) {
      this.$store.dispatch('showErrorToast', 'Error verifing your account, please contact administration!')
    }
  },
  methods: {
    async resendVerification() {
      try {
        await this.$http.post('/auth/resend_verification_token')
        this.$store.dispatch('showSuccessToast', 'Please check you email for verification link')
      } catch (err) {
        this.$store.dispatch('showErrorToast', 'Error sending verification email, Please contact administation')
      }
    }
  }
}
</script>

<style scoped>
section, p{
  color: #fff;
}
p.subtitle  {
  line-height: 40px;
}
</style>
