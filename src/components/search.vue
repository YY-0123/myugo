<template>
  <view class="search" :class="{focused: isFocused}">
    <!-- 搜索框 -->
    <view class="input-box">
      <input
        @confirm="handleEnter"
        v-model="keyword"
        @input="handleQuery"
        :placeholder="placeholder"
        type="text"
        @focus="goSearch"
      />
      <text class="cancel" @click="handleCancel">取消</text>
    </view>
    <!-- 搜索结果 -->
    <view class="content">
      <div class="title">
        搜索历史
        <span class="clear"></span>
      </div>
      <div class="history">
        <navigator url :key="index" v-for="(item,index) in history">{{item}}</navigator>
      </div>
      <!-- 结果 -->
      <scroll-view scroll-y class="result" v-if="qlist.length>0">
        <navigator url :key="item.goods_id" v-for="item in qlist">{{item.goods_name}}</navigator>
      </scroll-view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      isFocused: false,
      keyword: "",
      qlist: [],
      // 缓存历史关键字：先查询之前的搜索历史，如果没有查到，默认为[]
      history: uni.getStorageSync("history") || []
    };
  },
  methods: {
    handleEnter(e) {
      // 监听回车事件
      // 获取输入框最新的值
      let v = e.detail.value;
      this.history.unshift(v);
      // 控制数组的去重操作
      let arr = [...new Set(this.history)];
      // 更新状态
      this.history = arr;
      // 把当前的历史关键字进行缓存
      uni.setStorageSync("history", arr);
    },
    async handleQuery() {
      // 根据关键字调用后台接口查询商品列表
      const { message } = await this.$request({
        path: "goods/qsearch?query=" + this.keyword
      });
      this.qlist = message;
    },
    goSearch() {
      // 获取可视区域的高度，设置父容器的高度为可视区域的高度，并禁止滚动
      const { windowHeight } = uni.getSystemInfoSync();
      console.log(windowHeight);
      // 触发父组件自定义事件，将可视区域高度传给父组件
      this.$emit("window-height", {
        height: windowHeight
      });
      //   console.log("hello");
      // 当输入框获取焦点时，在父元素添加一个类名 focused
      this.isFocused = true;
      this.placeholder = "请输入想要的商品";
    },
    // 点击取消按钮回复原状态,通过类名的显示与隐藏控制状态
    handleCancel() {
      // 点击取消按钮回复原始状态
      this.$emit("window-height", {
        pageHeight: "auto"
      });
      // 取消功能，回复原始状态
      this.isFocused = false;
      // 清空提示信息
      this.placeholder = "";
      // 清空关键字
      this.keyword = "";
      // 清空搜索结果
      this.qlist = [];
    }
  }
};
</script>
<style lang='less'>
.search {
  .content {
    position: absolute;
    top: 94rpx;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    background-color: #fff;
    display: none;
    padding: 30rpx;
    .title {
      font-size: 27rpx;
      line-height: 1;
      color: #333;
    }
    .clear {
      display: block;
      width: 27rpx;
      height: 27rpx;
      float: right;
      background-image: url(http://static.botue.com/ugo/images/clear.png);
      background-size: cover;
    }
    .history {
      padding-top: 30rpx;
      navigator {
        display: inline-block;
        line-height: 1;
        padding: 15rpx 20rpx 12rpx;
        background-color: #ddd;
        font-size: 24rpx;
        margin-right: 20rpx;
        margin-bottom: 15rpx;
        color: #333;
      }
    }
    .result {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: #fff;
      navigator {
        line-height: 1;
        padding: 20rpx 30rpx;
        font-size: 24rpx;
        color: #666;
        border-bottom: 1px solid #eee;
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
  .input-box {
    background-color: #ff2d4a;
    padding: 20rpx 16rpx;
    display: flex;
    position: relative;
    input {
      background-color: #fff;
      height: 60rpx;
      border-radius: 6rpx;
      flex: 1;
      padding-left: 55rpx;
    }
    .cancel {
      display: none;
    }
    &::before {
      content: "";
      display: none;
      width: 32rpx;
      height: 32rpx;
      position: absolute;
      top: 50%;
      transform: translate(15rpx, -50%);
      background-image: url("http://static.botue.com/ugo/images/icon_search%402x.png");
      background-size: 32rpx;
    }
    &::after {
      content: "搜索";
      position: absolute;
      left: 50%;
      top: 50%;
      padding-left: 40rpx;
      transform: translate(-50%, -50%);
      font-size: 24rpx;
      color: #ccc;
      background-image: url("http://static.botue.com/ugo/images/icon_search%402x.png");
      background-size: 32rpx;
      background-repeat: no-repeat;
    }
  }
  &.focused {
    .content {
      display: block;
    }
    .input-box {
      background-color: #eee;
      &::after {
        display: none;
      }
      &::before {
        display: block;
      }
    }
    .cancel {
      display: block;
      width: 100rpx;
      height: 50rpx;
      line-height: 50rpx;
      text-align: center;
      font-size: 30rpx;
    }
  }
}
</style>    