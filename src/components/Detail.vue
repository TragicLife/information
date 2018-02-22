<template>
  <div class="detail-container">
    <div class="article-container">
      <h1 class="detail-title">{{detail.title}}</h1>
      <div class="author-container"></div>
      <article class="content-container">
        <div v-html="detail.content"></div>
      </article>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import common from '../mixins/common'

  export default {
    mixins: [common],
    data() {
      return {
        content_id: 0,
        detail: {}
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      },
      // TODO 获取详情数据
      getDetail() {
        axios.get('/content/verify/home/detail', {
          params: {
            content_id: this.content_id
          }
        }).then(res => {
          let data = res.data
          this.detail = {
            title: data.title,
            content: data.content
          }
        })
      }
    },
    activated() {
      let query = this.$route.query
      this.editHeader({
        title: '详情',
        show: true
      })
      this.content_id = query.content_id
      this.getDetail()
    }
  }
</script>
<style lang="scss" scoped>
  .detail-container {
    padding: .4rem .15rem .04rem;
    height: 100%;
    .article-container {
      height: 100%;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
    .detail-title {
      font-size: .22rem;
    }
  }
</style>
