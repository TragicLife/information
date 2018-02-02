<template>
  <div class="app">
    <mt-header :title="header.title" fixed>
      <div slot="left" @click="leftHandler" v-show="header.showBack">
        <mt-button icon="back"></mt-button>
      </div>
    </mt-header>
    <router-view/>
  </div>
</template>

<script>
  import {Header, Button} from 'mint-ui'
  import {mapState} from 'vuex'

  export default {
    name: 'App',
    components: {
      mtHeader: Header,
      mtButton: Button
    },
    computed: {
      ...mapState({
        header: state => state.header
      })
    },
    methods: {
      leftHandler() {
        let handler = this.header.leftHandler
//        handler && (typeof handler === 'function') && handler()
        if (handler && (typeof handler === 'function')) {
          handler()
        } else {
          this.$router.go(-1)
        }
      }
    }
  }
</script>

<style lang="scss">
  body {
    overflow: hidden;
  }

  .app {
    height: 100%;
    font-size: .12rem;
    .mint-header {
      height: .4rem;
    }
  }
</style>
