import Vue from 'vue'
import VueRouter from 'vue-router'

import UserInput from '../views/UserInput.vue'
import PrincipalView from '@/views/PrincipalView.vue'
import SecondaryView from '../views/SecondaryView.vue'

// import UploadView from '../views/UploadView.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '',
  //   name: 'Default',
  //   component: Portal
  // },
  {
    path: '',
    name: 'Default',
    component: PrincipalView
  },
  {
    path: '/entrar',
    name: 'entrar',
    component: UserInput,
  },
  {
    path: '/SecondaryView',
    name: 'SecondaryView',
    component: SecondaryView
  },
  // {
  //   path: '/CaligrafiaView',
  //   name: 'Conjuntos',
  //   component: CaligrafiaView
  // },
  // {
  //   path: '/SobreView',
  //   name: 'About',
  //   component: SobreView
  // },
  // {
  //   path: '/UploadView',
  //   name: 'Upload',
  //   component: UploadView
  // },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router