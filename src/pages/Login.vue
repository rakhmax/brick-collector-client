<template>
  <v-form
    ref="loginForm"
    class="ma-auto pa-3"
    :style="{ width: '100vw', maxWidth: '450px' }"
    @submit.prevent="handleAuth"
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
      :error-messages="message"
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
    >{{ login ? $t('login') : $t('signup') }}</v-btn>
    <p
      class="text--secondary text-center pt-2 text-caption"
      @click="login = !login"
    >
      {{ login ? $t('notRegistered?') : $t('alreadyRegistered?') }}
      <a>{{ login ? $t('signup') : $t('login') }}</a>
    </p>
  </v-form>
</template>

<script>
import { login, signup } from '@/api/auth';

export default {
  name: 'Login',

  data: () => ({
    message: '',
    login: true,
    loading: false,
    username: null,
    password: null,
  }),

  methods: {
    handleAuth() {
      if (this.login) {
        this.handleLogin();
      } else {
        this.handleSignup();
      }
    },

    async handleLogin() {
      if (this.$refs.loginForm.validate()) {
        this.loading = true;

        try {
          await login({ username: this.username, password: this.password });

          this.loading = false;

          window.location.reload();
        } catch (error) {
          this.message = error.response.data;
          this.loading = false;
        }
      }
    },

    async handleSignup() {
      if (this.$refs.loginForm.validate()) {
        this.loading = true;

        try {
          await signup({ username: this.username, password: this.password });
          this.handleLogin();
        } catch (error) {
          this.message = error.response.message;
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
