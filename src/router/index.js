import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Detail from '@/components/Detail'

// TODO 组装异步路由子组件
let getChildComponent = (arr, prefix = '', beforeEnter = null) => {
  let child = []
  arr.forEach(item => {
    child.push({
      path: `${prefix}/${item}`,
      name: item,
      component(resolve) {
        require.ensure([], () => {
          resolve(require(`@/components/Home/${item}`))
        })
      },
      beforeEnter(to, from, next) {
        next()
        beforeEnter && typeof beforeEnter === 'function' && beforeEnter(to, from)
      }
    })
  })
  return child
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: getChildComponent(['Recommends', 'FocusNews', 'Videos', 'TasteJokes'], 'Home'),
      meta: {
        keepAlive: true
      }
    }, {
      path: '/Detail',
      name: 'Detail',
      component: Detail
    }
  ]
})
