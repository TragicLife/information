<template>
  <div class="home-container" v-cloak>
    <div class="nav-container">
      <ul class="nav-wrapper">
        <li class="nav-item" :class="{active: item.id == navId}" v-for="item in navData"
            @click="navHandler(item)">{{item.title}}
        </li>
      </ul>
    </div>
    <transition name="slide-left">
      <keep-alive>
        <router-view class="home-router"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  import axios from 'axios'
  import common from '../mixins/common'
  import {mapState} from 'vuex'
  import mType from '../store/mType'

  let navMap = {
    1: '/Home/Recommends',
    2: '/Home/FocusNews',
    3: '/Home/Videos',
    4: '/Home/TasteJokes'
  }

  export default {
    name: 'Home',
    mixins: [common],
    data() {
      return {
        navData: []
      }
    },
    computed: {
      ...mapState({
        navId: state => state.navId
      })
    },
    methods: {
      // TODO 获取导航栏
      getNav() {
        axios.get('/content/verify/home/cate').then(res => {
          let data = res.data
          if (data.ResultCode === 0) {
            let query = this.$route.query
            let navId = query.id ? query.id : data.cate_data[0].id
            this.setNav(navId)
            this.navData = data.cate_data
//            this.navData = this.navData.concat(data.cate_data)
//            this.navData = this.navData.concat(data.cate_data)
          }
        })
      },
      // TODO 设置导航的id和子路由的跳转
      setNav(id) {
        this.$store.commit(mType.UPDATE_NAV_ID, id)
        console.log(this.navId)
        this.$router.replace({
          path: navMap[id],
          query: {
            id: id
          }
        })
      },
      // TODO 导航切换
      navHandler(item) {
        this.setNav(item.id)
      }
    },
    created() {
      this.getNav()
    },
    activated() {
      this.editHeader({
        title: '资讯'
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .home-container {
    padding-top: .76rem;
    height: 100%;
    box-sizing: border-box;
    .nav-container {
      $height: .36rem;
      position: fixed;
      top: .4rem;
      z-index: 1;
      width: 100%;
      height: $height;
      line-height: $height;
      background-color: #fff;
      .nav-wrapper {
        margin: 0 .1rem;
        overflow: auto;
        white-space: nowrap;
        .nav-item {
          display: inline-block;
          margin: 0 .1rem;
          color: #444;
          font-size: .14rem;
          &.active {
            color: #da3838;
            font-weight: 700;
          }
        }
      }
    }
    .home-router {
      transform-origin: left top 0;
      -webkit-transform-origin: left top 0;
      transition: all .25s linear;
      -webkit-transition: all .25s linear;
    }
  }

  .slide-left-leave-active, .slide-left-enter-active {
    opacity: 0;
    transform: scaleX(0);
    -webkit-transform: scaleX(0);
  }
</style>
