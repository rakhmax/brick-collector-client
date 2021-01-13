<template>
  <v-form
    ref="loginForm"
    class="ma-auto pa-3"
    :style="{ width: '100vw', maxWidth: '450px' }"
    @submit.prevent="handleLogin"
  >
    <v-text-field
      v-model="username"
      :label="$t('username')"
      outlined
      required
      :rules="usernameRules"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :label="$t('password')"
      outlined
      required
      :rules="passwordRules"
      type="password"
    ></v-text-field>
    <v-btn
      block
      :loading="loading"
      outlined
      type="submit"
    >{{ $t('login') }}</v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'Login',

  data: () => ({
    loading: false,
    username: null,
    password: null,
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
  computed: {
    usernameRules() {
      return [(v) => !!v || `${this.$t('username')} ${this.$t('isRequired').toLowerCase()}`];
    },
    passwordRules() {
      return [
        (v) => !!v || `${this.$t('password')} ${this.$t('isRequired').toLowerCase()}`,
        (v) => (!!v && v.length > 3) || `${this.$t('minLenIs')} 4`,
      ];
    },
  },
};
</script>
