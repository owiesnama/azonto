import Form from './utilites/form'
import "video.js/dist/video.min"
import "video.js/dist/video-js.css"
window.Form = Form;
/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.$ = window.jQuery = require('jquery');
    require('bootstrap')
} catch (e) {
}

/**
 * vue framework where is magic happened
 * @type {{CreateElement: CreateElement; VueConstructor: VueConstructor; Component: Component; AsyncComponent: AsyncComponent; ComponentOptions: ComponentOptions; FunctionalComponentOptions: FunctionalComponentOptions; RenderContext: RenderContext; PropOptions: PropOptions; ComputedOptions: ComputedOptions; WatchHandler: WatchHandler; WatchOptions: WatchOptions; WatchOptionsWithHandler: WatchOptionsWithHandler; DirectiveFunction: DirectiveFunction; DirectiveOptions: DirectiveOptions; PluginFunction: PluginFunction; PluginObject: PluginObject; VNodeChildren: VNodeChildren; VNodeChildrenArrayContents: VNodeChildrenArrayContents; VNode: VNode; VNodeComponentOptions: VNodeComponentOptions; VNodeData: VNodeData; VNodeDirective: VNodeDirective}}
 */
window.Vue = require('vue');

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.create({ withCredentials: true, });

/**
 * Add moment js for time and date operations
 * its easy to use and has awesome api
 */

window.moment = require('moment');

/**
 * Now we will add filesize which is a library that
 * provide a human readable file sizes
 */

window.filesize = require('filesize');

/**
 * Injecting v-modal plugin to vue for easy use
 * of modal anywhere inside the app.
 */
import VModal from 'vue-js-modal';
Vue.use(VModal);

import './utilites/helpers'




// import './bootstrap-material-design.min'
// import './popper.min'
// import './admin'