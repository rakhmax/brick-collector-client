<template>
  <v-form
    :style="{ width: '100vw', maxWidth: '450px' }"
    @submit.prevent="handleLogin"
    class="ma-auto pa-3"
    ref="loginForm"
  >
    <v-text-field
      v-model="username"
      :rules="usernameRules"
      label="Username"
      outlined
      required
    />
    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Password"
      outlined
      required
      type="password"
    />
    <v-btn
      :loading="loading"
      block
      outlined
      type="submit"
    >Login</v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'Home',

  data: () => ({
    loading: false,
    username: null,
    usernameRules: [(v) => !!v || 'Username is required'],
    password: null,
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) => (!!v && v.length > 3) || 'Min length is 4',
    ],
  }),

  methods: {
    async handleLogin() {
      if (this.$refs.loginForm.validate()) {
        this.loading = true;

        try {
          const textToEncode = (this.username + this.password).toLowerCase();
          const data = new TextEncoder().encode(textToEncode);
          const hashBuffer = await crypto.subtle.digest('SHA-1', data);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('');

          localStorage.setItem('accessString', hashHex);

          window.location.reload();
        } catch (error) {
          console.log(error);
          this.loading = false;
        }
      }
    },
  },
};
</script>
