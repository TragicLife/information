import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Detail from '@/components/Detail'

// TODO 组装异步路由子组件
let getChildComponent = (arr) => {
  let child = []
  arr.forEach(item => {
    child.push({
      path: `/${item}`,
      name: item,
      component(resolve) {
        require.ensure([], () => {
          resolve(require(`@/components/Home/${item}`))
        })
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
      children: getChildComponent(['Recommends', 'FocusNews', 'Videos', 'TasteJokes'])
    }, {
      path: '/Detail',
      name: 'Detail',
      component: Detail
    }
  ]
})
