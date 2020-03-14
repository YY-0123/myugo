<template>
  <view>列表页面: {{kw}}</view>
</template>

<script>
export default {
  data() {
    return {
      kw: ""
    };
  },
  onLoad(param) {
    // 获取路由参数
    this.kw = param.kw;
  }
};
</script>

<style lang="less" scoped>
</style>
