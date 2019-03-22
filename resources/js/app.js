/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and ExpressJs.
 */

require('./bootstrap');
require('chart.js');


Vue.filter('ago', function (time) {
    return window.moment(time).fromNow();
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


const app = new Vue({
    el: '#app'
});
