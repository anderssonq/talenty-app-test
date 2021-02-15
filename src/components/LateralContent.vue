<template>
  <v-container>
    <v-card class="pa-2">
      <h4 class="text-h5 mb-2">Contenido</h4>
      <v-divider></v-divider>
      <v-list>
        <v-list-item-group v-model="model">
          <v-list-item v-for="(item, i) in classes" :key="i" class="pa-1" dense color="primary" @click="onSelectClassVideo(item)">
            <v-list-item-icon>
              <div class="video-preview text-center">
                <v-icon class="white mt-3">
                  mdi-play
                </v-icon>
              </div>
            </v-list-item-icon>
            <v-list-item-content>
              <p class="font-weight-bold">{{ item.title }}</p>
              <p class="font-weight-bold pt-2">
                <v-icon small>
                  mdi-clock-time-three-outline </v-icon
                >1 min
              </p>
            </v-list-item-content>
            <v-avatar v-if="item.progress === 10" color="primary" size="26" class="white--text text-center">
              <v-icon color="white">mdi-check</v-icon>
            </v-avatar>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'LateralContent',

  data: () => ({
    model: {},
  }),
  computed: {
    ...mapGetters(['classes']),
  },
  methods: {
    onSelectClassVideo(data) {
      this.$emit('classVideoEmit', data);
    },
  },
};
</script>

<style scope>
.video-preview {
  width: 100px;
  height: 50px;
  background: rgba(0, 0, 0, 0.782);
}
</style>
