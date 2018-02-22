let scrollMap = {}

export default {
  data() {
    return {}
  },
  // TODO 离开当前路由
  beforeRouteLeave(to, from, next) {
    if (from.name) {
      scrollMap[from.name] = document.querySelector('.home-router').scrollTop

    }
    next()
  },
  beforeRouteUpdate() {
    console.log('---------------beforeRouteUpdate ')
  },
  // TODO 进入当前路由
  beforeRouteEnter(to, from, next) {
    next(() => {
      setTimeout(() => {
        if (scrollMap[to.name]) {
          document.querySelector('.home-router').scrollTop = scrollMap[to.name]
        }
      })
    })
  }
}
