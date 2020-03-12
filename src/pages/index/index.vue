<template>
  <view class="container">
    <!-- 搜索栏 -->
    <view class="search">
      <view class="input-box">
        <input type="text" />
      </view>
      <view class="content"></view>
    </view>
    <!-- 轮播图 -->
    <swiper indicator-dots>
      <swiper-item>
        <image src="/static/uploads/banner1.png" />
      </swiper-item>
      <swiper-item>
        <image src="/static/uploads/banner2.png" />
      </swiper-item>
      <swiper-item>
        <image src="/static/uploads/banner3.png" />
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Nihao"
    };
  },
  onLoad() {},
  methods: {}
};
</script>

<style lang='less'>
.search {
  .input-box {
    padding: 20rpx 16rpx;
    background-color: #ff2d4a;
    input {
      background-color: #fff;
    }
  }
}
swiper {
  height: 340rpx;
  image {
    width: 750rpx;
    height: 340rpx;
  }
}
</style>
