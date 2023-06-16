/*
 * @Author: hxz
 * @Date: 2021-04-26 13:59:45
 * @LastEditors: hxz
 * @LastEditTime: 2023-06-16 09:37:42
 * @Description:
 */
import Vue from 'vue';
import App from './views/SideList.vue';

import 'reset-css';

Vue.config.productionTip = false;

/* 手机查看console */
if (process.env.NODE_ENV !== 'production') {
	var VConsole = require('vconsole/dist/vconsole.min.js');
	new VConsole();
}

new Vue({
	render: (h) => h(App),
}).$mount('#app');
