
import Vue from 'vue';

// On load nos custom web elements
Vue.component('page', require("./components/Page.vue").default);
Vue.component('resources', require("./components/Resources.vue").default);
Vue.component('task-list', require("./components/TaskList.vue").default);
Vue.component('file-reader', require("./components/FileReader.vue").default);

const app = new Vue({
    el: '#app',
})