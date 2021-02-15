<template>
  <div>
    <v-row class="mt-2">
      <v-col cols="6">
        <h2 class="display-1 mt-0"><img src="../assets/logo.jpeg" alt="talent" /></h2>
      </v-col>
      <v-col cols="6" class="d-flex justify-end">
        <v-btn color="red" @click="onSignOut" class="white--text" text>
          Cerrar sesión
          <v-icon>
            mdi-exit-to-app
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="mt-3" dense>
      <v-col cols="9">
        <v-row>
          <v-col cols="12">
            <v-card>
              <div v-if="currentClass">
                <v-container>
                  <vimeo-player v-if="reloadPlayer" ref="player" :video-id="'1'" class="playerStyle" :video-url="currentClass.video_url" @ended="onEnd" />
                  <h3>{{ currentClass.title }}</h3>
                  <p>{{ currentClass.description }}</p>
                </v-container>
              </div>
              <div v-else class="no-class-container pa-2">
                <h1 class="text-h4 text-center mt-2">
                  Primero antes de aprender, selcciona un video de la lista!
                  <v-icon color="primary" size="50">
                    mdi-hand-pointing-right
                  </v-icon>
                </h1>

                <img class="pa-12" src="../assets/pc.png" alt="PC" />
              </div>
            </v-card>
          </v-col>
          <v-col cols="12">
            <comments-module @onRefreshComments="onRefreshComments" />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="3">
        <lateral-content @classVideoEmit="onHandlerClassVideoListener" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
/* eslint-disable object-shorthand */
import { mapActions, mapGetters } from 'vuex';
import {
  getAllContent, getCommentsAPI, getUser, postProgressAPI,
} from '../api/modules';

export default {
  name: 'Class',
  components: {
    'lateral-content': () => import('../components/LateralContent'),
    'comments-module': () => import('../components/Comments'),
  },
  data: () => ({
    user: null,
    content: [],
    comments: [],
    player: null,
    reloadPlayer: true,
    timer: null,
  }),
  watch: {
    async 'currentClass.id'() {
      this.onRefreshComments();
    },
  },
  computed: {
    ...mapGetters(['currentClass']),
  },
  mounted() {
    this.onInit();
  },
  destroyed() {
    clearTimeout(this.timer);
  },
  methods: {
    ...mapActions(['setClasses', 'setComments', 'setCurrentClass', 'setUser', 'cleanApp', 'retoreData', 'token']),
    /**
       * Async Init Method,
       * Its has a simple logic, if user has class a user data from localstore,
       * we will restore all data from there and put them back to vuex,
       * this a way for upgraded app perfomance !
       * @param {Array} classes - data from localstore
       * @param {Object} user - data from localstore
       * @param {Boolean} doIt - flag for restore data from api
       */
    async onInit(doIt = false) {
      if (localStorage.getItem('classes') && localStorage.getItem('user') && !doIt) {
        this.retoreData();
      } else {
        this.player = this.$refs.player;
        const respUser = await getUser();
        this.setUser(respUser);

        const resp = await getAllContent();
        if (resp.content) {
          const content = [...resp.content];
          this.setClasses(content);
        }
      }
    },
    /**
       * Listener when user select a class from lateral list component
       * @param {Object} data - observable response from lateral list component
       */
    onHandlerClassVideoListener(data) {
      this.setCurrentClass(data);
      this.reloadPlayer = false;
      this.tiemr = setTimeout(() => {
        this.reloadPlayer = true;
      }, 200);
    },
    /**
       * Method for restore all comments from a class selected
       */
    async onRefreshComments() {
      const respComments = await getCommentsAPI(this.currentClass.id);
      if (respComments.comments) {
        this.setComments([...respComments.comments]);
      }
    },
    /**
       * Method trigged when a user ends a class videos
       */
    // eslint-disable-next-line no-unused-vars
    onEnd(event, data, player) {
      this.onSendProgress(10);
    },
    /**
       * Async Method for send a progress to a particular class video
       */
    async onSendProgress(progress) {
      const body = {
        progress,
      };
      await postProgressAPI(this.currentClass.id, body);
      this.onInit(true);
    },
    /**
       *  Method when user logs out from the app
       */
    onSignOut() {
      this.cleanApp();
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>

<style>
.playerStyle {
  width: 100%;
}
iframe {
  width: 100%;
}

.no-class-container img {
  width: 80%;
}

.no-class-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
