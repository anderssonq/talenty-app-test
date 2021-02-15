<template>
  <v-row justify="center" align="center" class="mt-12 pt-12">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          <img class="logo-white" src="../assets/logoWhite.jpeg" alt="logoWhite">
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  id="email"
                  v-model="user.usr"
                  color="primary"
                  background-color="white"
                  :label="'Correo'"
                  :rules="[ v => !!v || 'Correo' + ' es requerido.',
                            v => /.+@.+\..+/.test(v) || 'Debe ser un Correo valido',]"
                  outlined
                  @keyup.enter="onLogin"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  id="password"
                  ref="password"
                  v-model="user.pwd"
                  color="primary"
                  label="Password"
                  :type="showp ? 'text' : 'password'"
                  :rules="[ v => !!v || 'Password' + ' es requerido.',
                            v => (v && v.length >= 8) || 'Password' + ' debe tener mas de 8 caracteres.' ]"
                  outlined
                  @keypress.enter="onLogin"
                >
                  <template #append>
                    <v-btn
                      tabindex="-1"
                      small
                      icon
                      @click="showp = !showp"
                    >
                      <v-icon v-if="showp">
                        mdi-eye
                      </v-icon>
                      <v-icon v-if="!showp">
                        mdi-eye-off
                      </v-icon>
                    </v-btn>
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-btn
                  color="primary"
                  block
                  @click="onLogin"
                >
                  Iniciar sesión
                </v-btn>
              </v-col>
              <v-col cols="12">
                <p class="text-center">
                  ¿Nuevo en Talently?
                  <a class="primary--text" @click="$router.push({name: 'Register'})">
                    Crear una cuenta
                  </a>
                </p>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex';
import { postLogin } from '../api/modules';

export default {
  data: () => ({
    user: {},
    showp: false,
  }),
  mounted() {
    if (this.$route.query.email) {
      const { email } = this.$route.query;
      this.user = {
        usr: email,
      };
    }
  },
  methods: {
    ...mapActions(['setToken']),
    /**
       * Async Method when user tries to sign in to app
       */
    async onLogin() {
      if (this.$refs.form.validate()) {
        const body = {
          email: this.user.usr,
          password: this.user.pwd,
        };
        const resp = await postLogin(body);
        if (resp.access_token) {
          this.setToken(resp.access_token);
          this.$router.push({ name: 'Class' });
        } else {
          alert('Error en las credenciales o usuario no existe');
        }
      }
    },
  },
};
</script>
