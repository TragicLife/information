<template>
  <div class="recommends-container">
    <mt-loadmore :top-method="refreshData" :bottom-method="loadMoreData" :bottom-all-loaded="allLoaded" ref="loadmore">
      <ul class="list-container">
        <li class="list-item border-bottom" v-for="item in listData" @click="linkToDetail(item)">
          <!-- 单张照片的情况 -->
          <div class="list-item-wrapper list-item-wrapper-single"
               v-if="item.content_type === 1 && item.title_img && item.title_img.length === 1">
            <div class="list-item-single">
              <header class="list-title">{{item.title}}</header>
              <div class="list-info">
                <div class="list-info-item">{{item.auth}}</div>
                <!--<div class="list-info-item" v-if="item.comment_count > 0">{{item.comment_count}}评</div>-->
                <!--<div class="list-info-item">{{item.date | filterDate}}</div>-->
              </div>
            </div>
            <div class="list-content-img" :style="{'background-image': 'url('+item.title_img[0]+')'}"></div>
          </div>
          <!-- 有多张照片 -->
          <div class="list-item-wrapper" v-else-if="item.content_type === 1">
            <header class="list-title">{{item.title}}</header>
            <div class="list-content">
              <div class="list-content-img" v-for="img in item.title_img"
                   :style="{'background-image': 'url('+img+')'}"></div>
            </div>
            <div class="list-info">
              <div class="list-info-item">{{item.auth}}</div>
              <!--<div class="list-info-item" v-if="item.comment_count > 0">{{item.comment_count}}评</div>-->
              <!--<div class="list-info-item">{{item.date | filterDate}}</div>-->
            </div>
          </div>
          <!-- 视频类型 -->
          <div class="list-item-wrapper" v-else>
            <header class="list-title">{{item.title}}</header>
            <!-- 视频类型 -->
            <div class="list-content-video" :style="{'background-image': 'url('+item.title_img[0]+')'}">
              <div class="list-video-play"></div>
              <!--<div class="list-video-duration">{{item.duration | durationFilter}}</div>-->
            </div>
            <div class="list-info">
              <div class="list-info-item">{{item.auth}}</div>
              <!--<div class="list-info-item" v-if="item.comment_count > 0">{{item.comment_count}}评</div>-->
            </div>
          </div>
        </li>
      </ul>
    </mt-loadmore>
  </div>
</template>
<script>
  import axios from 'axios'
  import {Navbar, TabItem, Loadmore} from 'mint-ui'
  import common from '../../mixins/common'

  export default {
    name: 'Home',
    mixins: [common],
    components: {
      mtNavbar: Navbar,
      mtTabItem: TabItem,
      mtLoadmore: Loadmore
    },
    data() {
      return {
        NAV_ID: 0,
        listData: [],
        allLoaded: true,
        limit: 10,
        content_id: 0
      }
    },
    methods: {
      // TODO 下拉刷新
      refreshData() {
        this.content_id = 0
        this.getListData()
      },
      // TODO 上拉加载
      loadMoreData() {
        console.log('loadBottom')
        this.$nextTick(() => {
          this.$refs.loadmore.onBottomLoaded();
        })
      },
      getListData() {
        this.requestList({id: this.NAV_ID, content_id: this.content_id}).then(res => {
          let data = res.data
          this.listData = data
          this.content_id = this.listData[this.listData.length - 1].content_id
          this.$nextTick(() => {
            this.$refs.loadmore.onTopLoaded();
          })
        })
      },
      // TODO 跳转到详情页
      linkToDetail(item) {
        console.log(item)
        this.$router.push({
          path: '/Detail',
          query: {
            id: this.NAV_ID,
            content_id: item.content_id
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
      }
      ,
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
    }
    ,
    created() {
      let query = this.$route.query
      this.NAV_ID = query.id
      this.getListData()
    }
  }
</script>
<style lang="scss">
  @import '../../lib/css/mixins/clamp';

  .recommends-container {
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  /* 列表容器 */
  .list-container {
    padding: 0 .15rem;
    width: 100%;
    font-size: .18rem;
    box-sizing: border-box;
    .list-item {
      padding-top: .04rem;
      width: 100%;
      overflow: hidden;
      .list-item-wrapper {
        .list-title {
          @include clamp(2);
          margin: .07rem 0;
          line-height: .22rem;
        }
        .list-content {
          position: relative;
          padding-bottom: 21.9%;
          width: 100%;
          .list-content-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 33%;
            height: 100%;
            background: no-repeat;
            background-size: 100% 100%;
            &:nth-child(2) {
              left: 50%;
              transform: translateX(-50%);
              -webkit-transform: translateX(-50%);
            }
            &:last-child {
              left: auto;
              right: 0;
            }
          }
        }
        .list-content-video {
          position: relative;
          padding-bottom: 56%;
          width: 100%;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          .list-video-play {
            position: absolute;
            top: 50%;
            left: 50%;
            width: .5rem;
            height: .5rem;
            background-image: url(../../assets/play.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            transform: translate(-50%, -50%);
            -webkit-transform: translate(-50%, -50%);
          }
          .list-video-duration {
            position: absolute;
            right: .07rem;
            bottom: .07rem;
            padding: .05rem .1rem .04rem;
            border-radius: .14rem;
            color: #fff;
            background: rgba(0, 0, 0, .5);
            font-size: .1rem;
          }
        }
        .list-info {
          margin: .1rem 0;
          color: #999;
          font-size: .12rem;
          .list-info-item {
            display: inline-block;
            margin-right: .1rem;
            max-width: .89rem;
            vertical-align: middle;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
      .list-item-wrapper-single {
        display: flex;
        display: -webkit-flex;
        padding: .15rem 0;
        .list-item-single {
          display: flex;
          display: -webkit-flex;
          flex-direction: column;
          -webkit-flex-direction: column;
          justify-content: space-between;
          -webkit-justify-content: space-between;
          padding-right: .1rem;
          width: calc(100% - 1.12rem);
          box-sizing: border-box;
          .list-title,
          .list-info {
            margin: 0;
          }
        }
        .list-content-img {
          width: 1.12rem;
          height: .75rem;
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
</style>
