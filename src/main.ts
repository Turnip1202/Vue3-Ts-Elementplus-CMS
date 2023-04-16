import { createApp, App } from 'vue'
import 'normalize.css' //清除默认样式
import './assets/css/index.less' //自己设置的默认样式
import router from './router'
import rootApp from './App.vue'
import store from './store'
import { globalRegister } from './global'
// import 'element-plus/lib/theme-chalk/index.css'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import './service/axios_demo.ts'

import { setupStore } from './store'

const app: App = createApp(rootApp)
// 注册element-plus
app.use(globalRegister)
app.use(store)
setupStore()

app.use(router)

// app.use(ElementPlus) //有bug
app.mount('#app')

console.log(process.env.VUE_APP_BASE_NAME)
console.log(process.env.VUE_APP_BASE_URL)
