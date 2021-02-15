export default [
  {
    name: 'SHOW_MESSAGE',
    callback(params) {
      this.$toasted.show(params.text, {
        theme: 'outline',
        position: 'top-right',
        duration: 5000,
      });
    },
  },
  {
    name: 'SHOW_ERROR',
    callback(params) {
      this.$toasted.error(params.text, {
        theme: 'outline',
        position: 'top-right',
        duration: 5000,
      });
    },
  },
  {
    name: 'LOADING',
    callback(flag) {
      this.$loading(flag);
    },
  },
];
