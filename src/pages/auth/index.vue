<template>
  <button open-type="getUserInfo" @getuserinfo="getuserinfo" type="primary">点击授权</button>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    getuserinfo(e) {
      // 1、获取微信的授权信息
      const { encryptedData, iv, rawData, signature } = e.detail;
      //2、获取code
      uni.login({
        success: res => {
          // 获取code之后，可以组合上述4个属性，进而调用接口进行登录
          const { code } = res;
        }
      });

      //3、调用后台接口获取token信息

      //4、获取token后，进行缓存，然后跳回到上一个页面
    }
  }
};
</script>

<style lang="less" scoped>
</style>
