<template>
  <view class="wrapper">
    <!-- 收货信息 -->
    <view class="shipment">
      <template v-if="address">
        <view class="dt">收货人: </view>
    <view class="dd meta">
      <text class="name">{{address.userName}}</text>
      <text class="phone">{{address.telNumber}}</text>
    </view>
    <view class="dt">收货地址:</view>
    <view class="dd">{{addressDetail}}</view>
  </template>
  <button @click='getAddress' v-else>获取收货地址</button> 
    </view>
    <!-- 购物车 -->
    <view class="carts">
      <view class="item">
        <!-- 店铺名称 -->
        <view class="shopname">优购生活馆</view>
        <view class="goods" :key="item.goods_id" v-for="(item,index) in cart">
          <!-- 商品图片 -->
          <image class="pic" :src="item.goods_img"></image>
          <!-- 商品信息 -->
          <view class="meta">
            <view class="name">{{item.goods_name}}</view>
            <view class="price">
              <text>￥</text>{{item.goods_price}}<text>.00</text>
            </view>
            <!-- 加减 -->
            <view class="amount">
              <text class="reduce" @click="changeNum(index,-1)">-</text>
              <input type="number" :value="item.goods_num" class="number">
              <text class="plus" @click="changeNum(index,1)">+</text>
            </view>
          </view>
          <!-- 选框 -->
          <view class="checkbox">
            <icon @click="toggleTtem(index)" type="success" size="20" :color="item.goods_check?'#ea4451':'#ccc'"></icon>
          </view>
        </view>
      </view>
    </view>
    <!-- 其它 -->
    <view class="extra">
      <label class="checkall">
        <icon @click="toggleAll()" type="success" :color="isAll?'#EA4451':'#ccc'" size="20"></icon>
        全选
      </label>
      <view class="total">
        合计: <text>￥</text><label>{{countTotal}}</label><text>.00</text>
      </view>
      <view @click="createOrder()" class="pay">结算({{checkedProducts.length}})</view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        address: null,
        cart: [],
      }
    },
    computed: {
      addressDetail () {
  return this.address && this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo
},
      countTotal () {
  // 计算所有的选中的商品的总价
  // 单价 * 数量 并 进行累加
  let total = 0
  this.checkedProducts.forEach(item => {
      total += item.goods_price * item.goods_num
  })
  return total
},
      isAll () {
        // 通过计算属性解决uni.app的bug(三目运算符条件不支持计算)
        return this.checkedProducts.length === this.cart.length
      },
      checkedProducts () {
        // 过滤出所有选中的商品
        return this.cart.filter(item => item.goods_check)
      }
    },
    // 每次页面显示时都要重新获取缓存最新的数据
    onShow () {
      // 初始化购物车数据
      this.cart = uni.getStorageSync('mycart') || []
    },
    methods: {
       async createOrder () {
        // 创建订单
        // 1、判断是否选中了商品
        if (this.checkedProducts.length === 0) {
          // 没有选中商品，提示一下，终止后续代码运行
          uni.showToast({
            title: '请选择商品'
          })
          return 
        } 
        // 2、判断是否选中了收货地址
        if (this.address === null) {
          // 没有选中地址，提示选择地址，终止后续代码运行
          uni.showToast({
            title: '请选择地址'
          })
          return 
        }
        // 3、判断是否已经登录
        const token = uni.getStorageSync('mytoken')
        if (!token) {
          // 没有登录过，跳转到登录页面，进行登录
          uni.navigateTo({
            url: '/pages/auth/index'
          })
        }
        // 4、创建订单
        // 准备创建订单的参数
        let list = this.checkedProducts.map(item => {
          return {
            goods_id: item.goods_id,
            goods_number: item.goods_num,
            goods_price: item.goods_price
          }
        })
        const orderParam = {
          order_price: this.countTotal,
          consignee_addr: this.addressDetail,
          goods: list
        }
        // 调用接口
        const {message} = await this.$request({
          method: 'post',
          path: 'my/orders/create',
          param: orderParam,
          header: {
            Authorization: token
          }
        })
        // 获取订单号，跳转到订单确认页面
        const { order_number } = message
        uni.navigateTo({
          url: '/pages/order/index?order_number'+ order_number
        })
      },
      getAddress () {
  // 获取收货地址
  uni.chooseAddress({
    success: (res) => {
      this.address = res
    }
  })
},
      toggleAll () {
  // 控制所有商品的选中和反选
  let flag = !this.isAll
  this.cart.forEach(item => {
    // 把所有的商品状态修改为全选按钮相反的状态
    item.goods_check = flag
  })
  // 把全选的状态同步到缓存
  uni.setStorageSync('mycart', this.cart)
},
      toggleTtem (index) {
        // 控制单个商品的选中与否
        this.cart[index].goods_check = !this.cart[index].goods_check
        // 把选中状态同步到缓存
        uni.setStorageSync('mycart', this.cart)
      },
      changeNum (index,n) {
        // 修改购物车商品的数量
        // 商品数量最少为1
        if (n === -1 && this.cart[index].goods_num <= 1) {
          return
        }
        // 商品数量最大不能超过库存
        if (n === 1 && this.cart[index].goods_num >= 5) {
          return
        }
        this.cart[index].goods_num += n
         // 把修改后的数据从新同步到缓存
        uni.setStorageSync('mycart', this.cart)
      }
    },
  }
</script>

<style scoped lang="less">
  .shipment {
    height: 100rpx;
    line-height: 2;
    padding: 30rpx 30rpx 40rpx 30rpx;
    font-size: 27rpx;
    color: #333;
    background-color: #fff;
    background-image: url(http://static.botue.com/ugo/images/cart_border%402x.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom;

    .dt {
      width: 140rpx;
      float: left;
      clear: both;
    }

    .dd {
      padding-left: 160rpx;
    }

    .meta {
      padding-right: 50rpx;
    }

    text.phone {
      float: right;
    }
  }

  .carts {
    background-color: #f4f4f4;
    padding-bottom: 110rpx;
    overflow: hidden;

    .shopname {
      padding: 30rpx;
      margin-top: 20rpx;
      font-size: 30rpx;
      color: #333;
      background-color: #fff;
      border-top: 1rpx solid #eee;
      border-bottom: 1rpx solid #eee;
    }

    .goods {
      display: flex;
      padding: 30rpx 20rpx 30rpx 0;
      margin-left: 100rpx;
      border-bottom: 1rpx solid #eee;
      background-color: #fff;
  
      position: relative;

      .checkbox {
        width: 101rpx;
        height: 100%;
        background-color: #fff;

        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        left: -100rpx;
        top: 0;
      }

      &:last-child {
        border-bottom: none;
      }

      .pic {
        width: 200rpx;
        height: 200rpx;
        margin-right: 30rpx;
      }

      .meta {
        flex: 1;
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

      .amount {
        position: absolute;
        bottom: 0;
        right: 20rpx;

        height: 48rpx;
        text-align: center;
        border: 1rpx solid #ddd;
        border-radius: 8rpx;

        display: flex;
        align-items: center;

        text {
          display: block;
          width: 60rpx;
          line-height: 48rpx;
          font-size: 36rpx;
          color: #ddd;
          text-align: center;
        }

        input {
          width: 60rpx;
          height: 48rpx;
          min-height: 48rpx;
          font-size: 27rpx;
          border-left: 1rpx solid #ddd;
          border-right: 1rpx solid #ddd;
        }
      }
    }
  }

  .extra {
    position: fixed;
    bottom: 0;
    /* #ifdef H5 */
    bottom: 50px;
    /* #endif */
    left: 0;
    z-index: 9;

    width: 750rpx;
    height: 96rpx;
    text-align: center;
    line-height: 96rpx;
    font-size: 36rpx;
    border-top: 1rpx solid #eee;
    background-color: #fff;
    color: #333;
    display: flex;

    .checkall {
      width: 140rpx;
      line-height: 1;
      margin-left: 25rpx;
      display: flex;
      align-items: center;

      icon {
        margin-right: 20rpx;
      }
    }

    .total {
      display: flex;
      justify-content: center;
      flex: 1;

      label, text {
        color: #ea4451;
        vertical-align: bottom;
        position: relative;
        bottom: -2rpx;
      }

      text {
        position: relative;
        bottom: -3rpx;
        font-size: 24rpx;

        &:first-child {
          margin-left: 10rpx;
        }
      }
    }

    .pay {
      width: 200rpx;
      background-color: #ea4451;
      color: #fff;
    }
  }
</style>
