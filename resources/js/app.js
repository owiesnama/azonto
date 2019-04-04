/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and ExpressJs.
 */

require('./bootstrap');
require('chart.js');


moment.updateLocale('en', {
    calendar: {
        lastDay: 'D MMMM',
        sameDay: '[Today\'s]',
        nextDay: '[Tomorrow]',
        lastWeek: 'D MMMM',
        nextWeek: 'D MMMM',
        sameElse: 'L'
    }
});

Vue.filter('ago', function (time) {
    return window.moment(time).fromNow();
});

Vue.filter('calendar', function (time) {
    console.log(time)
    return window.moment(new Date(time).toDateString()).calendar();
});


Vue.filter('size', function (size) {
    return window.filesize(size);
});


import HomeView from './Views/Home'

Vue.component('HomeView', HomeView);

import RequestsView from './Views/Requests'

Vue.component('RequestsView', RequestsView);

import SubmitView from './Views/Submit'

Vue.component('SubmitView', SubmitView);


import MessagesView from './Views/Messages'

Vue.component('MessagesView', MessagesView);

import UsersView from './Views/Users'

Vue.component('UsersView', UsersView);

import CategoriesView from './Views/Categories'

Vue.component('CategoriesView', CategoriesView);

import FeaturedView from './Views/Featured'

Vue.component('FeaturedView', FeaturedView);

import VideosView from './Views/Videos'

Vue.component('VideosView', VideosView);


import ShowView from './Views/Show.vue'

Vue.component('ShowView', ShowView);


import VueDisqus from 'vue-disqus'

Vue.use(VueDisqus)

import Paginate from 'vuejs-paginate'
Vue.component('paginate', Paginate)

import VueFlashMessage from 'vue-flash-message';
Vue.use(VueFlashMessage, {
    messageOptions: {
        timeout: 1000,
        important: true,
        autoEmit: false,
        pauseOnInteract: true
    }
});

require('vue-flash-message/dist/vue-flash-message.min.css');

const app = new Vue({
    el: '#app',

    methods: {
        getVideoId(url) {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = url.match(regExp);

            if (match && match[2].length == 11) {
                return match[2];
            } else {
                return 'error';
            }
        }
    }
});
