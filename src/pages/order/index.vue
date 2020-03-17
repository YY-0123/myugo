<template>
  <view class="wrapper">
    <!-- 订单状态 -->
    <view class="tabs">
      <text class="active">全部</text>
      <text>待付款</text>
      <text>已付款</text>
      <text>退款/退货</text>
    </view>
    <!-- 订单 -->
    <scroll-view class="orders" scroll-y>
      <view :key='item.goods_id' v-for='item in list' class="item">
        <block :key='p.goods_id' v-for='p in item.goods'>
      <!-- 商品图片 -->
      <image class="pic" :src="p.goods_small_logo"></image>
      <!-- 商品信息 -->
      <view class="meta">
        <view class="name">{{p.goods_name}}</view>
        <view class="price">
          <text>￥</text>{{p.goods_price}}<text>.00</text>
        </view>
        <view class="num">x{{p.goods_number}}</view>
      </view>
        </block>
    <!-- 总价 -->
    <view class="amount">
      共{{item.total_count}}件商品 总计: ￥{{item.total_price}}(含运费0.00)
    </view>
    <!-- 其它 -->
    <view class="extra">
      订单号: {{item.order_number}}
      <button :data-id = 'item.order_number' @click="handlePay" size="mini" type="primary">支付</button>
    </view>
  </view>
</scroll-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
      }
    },
    onLoad () {
      this.allOrders ()
    },
    methods: {
      async handlePay (e) {
  // 实现支付操作
  // 1、调用接口请求实现付款
  // console.log(e.target.dataset.id)
  const { message } = await this.$request({
    path: 'my/orders/req_unifiedorder',
    method: 'post',
    param: {
      order_number: e.target.dataset.id
    },
    header: {
      Authorization: uni.getStorageSync('mytoken')
    }
  })
  // 2、用户确认进行付款
  uni.requestPayment({
    ...message.pay,
    success: () => {
      uni.showToast({
        title: '支付成功'
      })
    }
  })
  // 把支付过的商品从购物车清空
let orderInfo = this.list.filter(item => {
  return item.order_number === e.target.dataset.id
})
// 此次支付订单中的商品列表
let goods = orderInfo[0].goods
// 获取该商品列表中的所有ID
goods = goods.map(item => {
  return item.goods_id
})
// 查询购物车当前的商品
let cart = uni.getStorageSync('mycart') || []
// 过滤出剩余的商品（未支付的商品）
let other = cart.filter(item => {
  return !goods.includes(item.goods_id)
})
// 把未支付的商品重新放回缓存
uni.setStorageSync('mycart', other)
},
      async allOrders () {
  // 获取所有订单数据
  const { message } = await this.$request({
    path: 'my/orders/all',
    param: {
      type: 1
    },
    header: {
      Authorization: uni.getStorageSync('mytoken')
    }
  })
  this.list = message.orders
}
    },
  }
</script>

<style scoped lang="less">
  .tabs {
    display: flex;
    height: 96rpx;
    line-height: 96rpx;
    background-color: #fff;
    box-shadow: 0 4rpx 10rpx #ccc;

    text {
      flex: 1;
      text-align: center;
      font-size: 27rpx;
      color: #333;

      &.active {
        color: #ea4451;
      }
    }
  }

  .orders {
    width: 100%;
    background-color: #f4f4f4;

    position: absolute;
    top: 97rpx;
    bottom: 0;
  }

  .item {
    padding: 30rpx 20rpx 0;
    margin-top: 16rpx;
    background-color: #fff;

    .pic {
      width: 200rpx;
      height: 200rpx;
      float: left;
    }

    .meta {
      height: 200rpx;
      margin-left: 230rpx;
      font-size: 27rpx;
      color: #333;
      position: relative;
    }

    .name {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .price {
      position: absolute;
      bottom: 0;

      color: #ea4451;
      font-size: 33rpx;

      text {
        font-size: 22rpx;
      }
    }

    .num {
      position: absolute;
      bottom: 0;
      right: 20rpx;
      color: #333;
    }

    .amount {
      text-align: right;
      padding: 20rpx;
      font-size: 24rpx;
      border-top: 1rpx solid #eee;
      border-bottom: 1rpx solid #eee;
      margin-top: 20rpx;
      color: #999;
    }

    .extra {
      padding: 30rpx;
      font-size: 24rpx;
      color: #999;
      position: relative;

      button {
        position: absolute;
        right: 20rpx;
        font-size: 24rpx;
        margin-top: -10rpx;
      }
    }
  }
</style>
