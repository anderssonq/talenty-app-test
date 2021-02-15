<template>
  <v-container v-if="currentClass">
    <h4 class="mb-2">Comentarios</h4>
    <v-divider></v-divider>
    <div>
      <v-card class="mb-2 pa-2">
        <form ref="formComment" @submit.prevent="onPostComment">
          <v-row>
            <v-col cols="12" class="mt-1 d-flex">
              <v-avatar color="primary" size="56" class="ml-1 white--text text-center mr-2">
                <p class="text-center ma-0 mt-0 mr-0 display-1">{{ user.name.charAt(0).toUpperCase() }}</p>
              </v-avatar>
              <v-text-field v-model="comment" solo rows="2" label="Comentario"></v-text-field>
            </v-col>
          </v-row>
        </form>
      </v-card>
      <v-card v-if="comments.length > 0">
        <v-list-item v-for="_comment in comments" :key="_comment.id" :ref="`comment_id${_comment.id}`">
          <v-list-item-avatar>
            <v-avatar color="primary" size="56" class="white--text text-center mx-auto pr-3">
              <p class="text-center ma-0 display-1">{{ _comment.user.name.charAt(0).toUpperCase() }}</p>
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">
              {{ _comment.user.name }} <span class="grey--text caption">{{ commentTimeLeft(_comment.created_at) }}</span>
            </v-list-item-title>
            <div v-if="_comment.id === editId" class="d-flex flex-wrap justify-end">
              <v-row dense>
                <v-col cols="12">
                  <v-text-field v-model="editComment" solo rows="2" label="Comentario" @keypress.enter="onPostComment" hide-details=""></v-text-field>
                </v-col>
                <v-col cols="12" class="d-flex justify-end">
                  <v-btn color="red" outlined @click="onCancel">
                    Cancelar
                  </v-btn>
                </v-col>
              </v-row>
            </div>

            <v-list-item-subtitle v-else v-text="_comment.content"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-menu bottom right offset-y origin="top right" transition="slide-y-transition">
              <template #activator="{ on }">
                <v-btn icon v-if="user.id === _comment.user_id" v-on="on">
                  <v-icon color="grey lighten-1">mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list dense nav>
                <v-list-item v-for="(n, i) in newOptions" :key="`item-${i}`" v-ripple="{ class: `primary--text` }" color="primary" link @click="action(n.payload, _comment)">
                  <v-list-item-icon>
                    <v-icon v-text="n.icon" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title color="primary" v-text="n.text" />
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-action>
        </v-list-item>
      </v-card>
      <div v-else class="text-center">
        <strong>Sé el primero en comentar!</strong>
      </div>
    </div>
  </v-container>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import { postCommentsAPI, updateCommentsAPI, deleteCommentsAPI } from '../api/modules';

export default {
  name: 'Comments',
  data: () => ({
    comment: '',
    editComment: '',
    editMode: false,
    editId: null,
    newOptions: [
      { text: 'Editar', payload: 'update', icon: 'mdi-pencil' },
      { text: 'Eliminar', payload: 'delete', icon: 'mdi-delete' },
    ],
  }),
  computed: {
    ...mapGetters(['comments', 'user', 'currentClass']),
  },
  methods: {
    onRefreshComments() {
      this.$emit('onRefreshComments');
    },
    /**
       * Method for calculate when was the last time time
       * @param {Date} date - date from a comment
       */
    commentTimeLeft(date) {
      const now = moment(new Date());
      const end = moment(date);
      const duration = moment.duration(now.diff(end));
      const left = duration.asHours();
      // eslint-disable-next-line no-nested-ternary
      const result = left === 0 ? 'Hace unos minutos...' : left === 1 ? `${left.toFixed(0)} Hora` : `${left.toFixed(0)} Horas`;
      return result;
    },
    async onPostComment(event) {
      event.preventDefault();
      if (this.comment || this.editComment) {
        if (this.editMode) {
          const body = {
            content: this.editComment,
          };
          const respEdit = await updateCommentsAPI(this.editId, body);
          if (respEdit[0].id) {
            this.comment = '';
            this.onRefreshComments();
            this.onCancel();
          }
        } else {
          const body = {
            content: this.comment,
            user_id: this.user.id,
            content_id: this.currentClass.id,
          };
          const resp = await postCommentsAPI(body);
          if (resp.message) {
            this.comment = '';
            this.onRefreshComments();
          }
        }
      }
    },
    /**
       * Method trigged when a user se;ects somethings from menu
       * @param {Object} payload - reponse when a user clics an option from the menu
       * @param {Object} item - item selected
       */
    action(payload, item) {
      switch (payload) {
        case 'update':
          this.editMode = true;
          this.editId = item.id;
          this.editComment = item.content;
          break;
        default:
          this.onDeleteComment(item.id);
          break;
      }
    },
    async onDeleteComment(id) {
      const resp = await deleteCommentsAPI(id);
      if (resp[0]) {
        this.model = {};
        this.onRefreshComments();
      }
    },
    onCancel() {
      this.editComment = '';
      this.editMode = false;
      this.editId = null;
    },
  },
};
</script>
