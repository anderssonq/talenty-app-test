<template>
  <v-row justify="center" align="center" class="mt-12 pt-12">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          <img class="logo-white" src="../assets/logoWhite.jpeg" alt="logoWhite" />
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-row dense>
              <v-col cols="12">
                <v-text-field id="email" v-model="user.name" color="primary" background-color="white" :label="'Nombre'" :rules="[v => !!v || 'Nombre' + ' es requerido.']" outlined @keyup.enter="onRegister" />
              </v-col>
              <v-col cols="12">
                <v-text-field id="email" v-model="user.usr" color="primary" background-color="white" :label="'Correo'" :rules="[v => !!v || 'Correo' + ' es requerido.', v => /.+@.+\..+/.test(v) || 'Debe ser un Correo valido']" outlined @keyup.enter="onRegister" />
              </v-col>
              <v-col cols="12">
                <v-text-field id="password" ref="password" v-model="user.pwd" color="primary" label="Password" :type="showp ? 'text' : 'password'" :rules="[v => !!v || 'Password' + ' es requerido.', v => (v && v.length >= 8) || 'Password' + ' debe tener mas de 8 caracteres.']" outlined @keypress.enter="onRegister">
                  <template #append>
                    <v-btn tabindex="-1" small icon @click="showp = !showp">
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
                <v-btn color="primary" nuxt block @click="onRegister">
                  Iniciar sesión
                </v-btn>
              </v-col>
              <v-col cols="12" class="text-center">
                <p>
                  ¿Ya tienes cuenta?

                  <a class="primary--text" @click="$router.push({ name: 'Login' })">
                    Inicia sesión.
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
import { postRegister } from '../api/modules';

export default {
  data: () => ({
    user: {},
    showp: false,
  }),
  methods: {
    /**
       * Async Method when user tries to sign up to app
       */
    async onRegister() {
      if (this.$refs.form.validate()) {
        const body = {
          name: this.user.name,
          email: this.user.usr,
          password: this.user.pwd,
        };
        const resp = await postRegister(body);
        if (resp.success) {
          alert('Registro exitoso, por favor inicia session con tus credenciales');
          this.$router.push({ path: '/', query: { email: resp.message.email } });
        } else {
          alert('Ups, ha ocurrido un error');
        }
      }
    },
  },
};
</script>
