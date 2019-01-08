import Vue from 'vue'
import Vuex from 'vuex';
import Router from 'vue-router';
import axios from 'axios';
import iView from 'iview';
import App from './App.vue'

import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.use(Vuex);
Vue.use(Router);
Vue.use(iView);
Vue.prototype.axios = axios;

var myData = {
  a: 'aabbcc',
  c: 'charlie'
}

var vm = new Vue({
  render: h => h(App),
  /*
  等效于：
  template: '<App></App>',
  components: {
     App
  }
  */
  data: function () {  
    return myData;
  },
  created: function () {  
    console.log("I'v been created!!");
  },
  mounted: function () {  
    console.log("I'v been Mounted!!!");
  },
  updated: function () {  
    console.log("OMG! I'v been updated~");
  },
  destroyed: function () {  
    console.log("oopS! I'v been destroyed!!!");
  }
}).$mount('#app')

console.log("vm: ", vm);
console.log("vm.data: ", vm.a);
vm.a = "aaabbbccc";
console.log("vm.data2: ", vm.a);
// vm.$setData({a: "aaaabbbbcccc"});
// console.log("vm.data3: ", vm.a);

vm.b = 'balance';
console.log("vm.data --: ", vm, myData);

