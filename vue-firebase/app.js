const app = Vue.createApp({
  data() {
    return {
      title: 'The Final Empire',
      author: 'Brandon Smith'
      age:35
    };
  },
  methods: {
    changeTitle() {
      console.log('you clicked me')
    }
  }
});
app.mount("#app");
