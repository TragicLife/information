<template>
  <div class="home-container" v-cloak>
    <div class="nav-container">
      <ul class="nav-wrapper">
        <li class="nav-item" :class="{active: item.id === currentNavId}" v-for="item in navData"
            @click="changeNav(item)">{{item.title}}
        </li>
      </ul>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
  import axios from 'axios'
  import common from '../mixins/common'

  let navMap = {
    1: '/Recommends',
    2: '/FocusNews',
    3: '/Videos',
    4: '/TasteJokes'
  }

  export default {
    name: 'Home',
    mixins: [common],
    data() {
      return {
        navData: [],
        currentNavId: 0
      }
    },
    methods: {
      // TODO 获取导航栏
      getNav() {
        axios.get('/content/verify/home/cate').then(res => {
          let data = res.data
          if (data.ResultCode === 0) {
            this.currentNavId = data.cate_data[0].id
            this.$router.replace({
              path: '/Recommends',
              query: {
                id: this.currentNavId
              }
            })
            this.navData = data.cate_data
//            this.navData = this.navData.concat(data.cate_data)
//            this.navData = this.navData.concat(data.cate_data)
          }
        })
      },
      // TODO 导航切换
      changeNav(item) {
        console.log(item)
        this.currentNavId = item.id
        this.$router.replace({
          path: navMap[item.id],
          query: {
            id: this.currentNavId
          }
        })
      }
    },
    filters: {
      // TODO 过滤视频时间长度
      durationFilter(val) {
        // 往少于两位数的字符串前面补0
        let padStart = (t) => {
          return ('' + parseInt(t)).padStart(2, '0')
        }
        let second = padStart(val % 60)
        let minute = padStart(val / 60)
        let hour = ''
        // 判断是否有小时位
        if (parseInt(val / 3600) > 0) {
          hour = padStart(val / 3600) + ':'
          minute = padStart(val % 3600 / 60)
        }
        return `${hour}${minute}:${second}`
      },
      // TODO 修改时间为和当前时间的差距
      filterDate(val) {
        if (!val) {
          return ''
        }
        let date = new Date(val.replace(/-/g, '/'))
        let cur = new Date()
        let cal = (cur.getTime() - date.getTime()) / 1000
        let calSecond = parseInt(cal / 60)
        let calMinute = parseInt(cal / 60)
        let calHour = parseInt(cal / 3600)
        let calDay = parseInt(cal / 3600 / 30)
        if (calSecond > 0) {
          if (calHour > 0) {
            // 大于14个小时则显示为昨天
            if (calHour > 14 && calHour < 24) {
              return '昨天'
            }
            if (calDay > 0) {
              return `${calDay}天前`
            }
            return `${calHour}小时前`
          }
          return `${calMinute}分钟前`
        } else {
          return '刚刚'
        }
      }
    },
    created() {
      this.editHeader({
        title: '资讯'
      })
      this.getNav()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .home-container {
    padding-top: .76rem;
    height: 100%;
    box-sizing: border-box;
  }

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
</style>
