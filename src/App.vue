<template>
<v-app light>
    <v-main light>
      <v-container>
            <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Events from './events/event';

export default {
  name: 'App',
  data: () => ({
    //
  }),
  created() {
    Events.forEach((item) => {
      this.$on(item.name, item.callback);
    });
    window.getApp = this;
  },
};
</script>

<style>
.v-application {
  background-color: #ECF1F6 !important;
}
</style>
