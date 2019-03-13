import Vue from 'vue';
import VueRouter from 'vue-router';
import { routers } from './router';
import Vuex from 'vuex';
import App from './app.vue';

// iviewUI库
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Cellet from './components/efview/common/Cellet';
Vue.component(Cellet.name, Cellet);

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(iView);

// 路由配置
const RouterConfig = {
    // mode: 'history',
    routes: routers
};
const router = new VueRouter(RouterConfig);
router.beforeEach((to, from, next) => {
    next();
});
router.afterEach(() => {
    window.scrollTo(0, 0);
});

// 状态管理
const store = new Vuex.Store({
    state: {
        jesus: {}
    },
    getters: {

    },
    mutations: {

    },
    actions: {

    }
});

new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {},
    mounted() { },
    created() { }
});
