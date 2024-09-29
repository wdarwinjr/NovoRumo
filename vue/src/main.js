import Vue from 'vue'
import VueLogger from 'vuejs-logger'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import App from './App.vue'
import JsonViewer from 'vue-json-viewer'


Vue.config.productionTip = false

Vue.use(VueLogger);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(JsonViewer);


(async () => {
  try {
    const query = new URL(window.location).searchParams;
    const usuario_hash = query.get('usuario_hash');
    const cpf_hash = query.get('cpf_hash');

    // Chama a action para verificar os hashes
    await store.dispatch('verificarHashes', { usuario_hash, cpf_hash });

    // Após a verificação bem-sucedida, inicializa a aplicação
    new Vue({
      vuetify,
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
    // Redireciona para a página UserInput
    const backprefix = process.env.VUE_APP_BACKPREFIX;
    window.location.href = `/entrar.html?backprefix=${encodeURIComponent(backprefix)}`;
  }
})();  