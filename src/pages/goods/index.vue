<template>
  <view>详情页面{{id}}</view>
</template>

<script>
export default {
  data() {
    return {
      id: ""
    };
  },
  onLoad(param) {
    this.id = param.id;
  }
};
</script>

<style lang="less" scoped>
</style>
