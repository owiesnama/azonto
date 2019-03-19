/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and ExpressJs.
 */

require('./bootstrap');
require('chart.js');
require('./argon');


import FileView from './views/Files'

Vue.component('FilesView', FileView);

import WorkflowView from './views/Workflow'

Vue.component('WorkflowView', WorkflowView);

import StepsView from './views/Steps'

Vue.component('StepsView', StepsView);

import ArchiveView from './views/Archive'

Vue.component('ArchiveView', ArchiveView);

import TrashView from './views/Trash'

Vue.component('TrashView', TrashView);


Vue.filter('ago', function (time) {
    return window.moment(time).lang('ar').fromNow();
});


Vue.filter('size', function (size) {
    return window.filesize(size);
});


const app = new Vue({
    el: '#app'
});
