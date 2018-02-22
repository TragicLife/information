<template>
  <div class="no-data-container">
    <i class="icon-no-data"></i>
    <div>暂无数据</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    }
  }
</script>
<style lang="scss">
  .no-data-container {
    display: flex;
    width: 100%;
    height: 2rem;
    justify-content: center;
    -webkit-justify-content: center;
    align-items: center;
    -webkit-align-items: center;
    flex-direction: column;
    -webkit-flex-direction: column;
    .icon-no-data {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      background: url(../../assets/nodata.png) no-repeat;
      background-size: 100% 100%;
    }
  }
</style>
