<template>
  <view>
    <!-- 搜索 -->
    <search />
    <!-- 分类 -->
    <view class="category">
      <!-- 顶级分类 -->
      <view class="sup">
        <scroll-view scroll-y @click="handleChange">
          <text :data-id='item.cat_id' :class='{active: currentId === item.cat_id}' :key="item.cat_id" v-for="item in categories">{{item.cat_name}}</text>
        </scroll-view>
      </view>
      <!-- 子级分类 -->
      <view class="sub">
        <scroll-view scroll-y>
          <!-- 封面图 -->
          <image src="http://static.botue.com/ugo/uploads/category.png" class="thumb"></image>
          <view class="children">
            <view class="title">电视</view>
            <!-- 品牌 -->
            <view class="brands">
              <navigator url="/pages/list/index">
                <image src="http://static.botue.com/ugo/uploads/brand_1.jpg"></image>
                <text>曲面电视</text>
              </navigator>
              <navigator url="/pages/list/index">
                <image src="http://static.botue.com/ugo/uploads/brand_2.jpg"></image>
                <text>海信</text>
              </navigator>
              <navigator url="/pages/list/index">
                <image src="http://static.botue.com/ugo/uploads/brand_3.jpg"></image>
                <text>创维</text>
              </navigator>
              <navigator url="/pages/list/index">
                <image src="http://static.botue.com/ugo/uploads/brand_4.jpg"></image>
                <text>夏普</text>
              </navigator>
              <navigator url="/pages/list/index">
                <image src="http://static.botue.com/ugo/uploads/brand_5.jpg"></image>
                <text>TCL</text>
              </navigator>
              <navigator url="/pages/list/index">
                <image src="http://static.botue.com/ugo/uploads/brand_6.jpg"></image>
                <text>PPTV</text>
              </navigator>
              <navigator url="/pages/list/index">
                <image src="http://static.botue.com/ugo/uploads/brand_7.jpg"></image>
                <text>小米</text>
              </navigator>
              <navigator url="/pages/list/index">
                <image src="http://static.botue.com/ugo/uploads/brand_8.jpg"></image>
                <text>长虹</text>
              </navigator>
            </view>
          </view>
          <view class="children">
            <view class="title">电视</view>
            <!-- 品牌 -->
            <view class="brands">
              <navigator url="/pages/list/index">
                <image src="http://static.botue.com/ugo/uploads/brand_1.jpg"></image>
                <text>曲面电视</text>
              </navigator>
              <navigator url="/pages/list/index">
                <image src="http://static.botue.com/ugo/uploads/brand_2.jpg"></image>
                <text>海信</text>
              </navigator>
              <navigator url="/pages/list/index">
                <image src="http://static.botue.com/ugo/uploads/brand_3.jpg"></image>
                <text>创维</text>
              </navigator>
              <navigator url="/pages/list/index">
                <image src="http://static.botue.com/ugo/uploads/brand_4.jpg"></image>
                <text>夏普</text>
              </navigator>
              <navigator url="/pages/list/index">
                <image src="http://static.botue.com/ugo/uploads/brand_5.jpg"></image>
                <text>TCL</text>
              </navigator>
              <navigator url="/pages/list/index">
                <image src="http://static.botue.com/ugo/uploads/brand_6.jpg"></image>
                <text>PPTV</text>
              </navigator>
              <navigator url="/pages/list/index">
                <image src="http://static.botue.com/ugo/uploads/brand_7.jpg"></image>
                <text>小米</text>
              </navigator>
              <navigator url="/pages/list/index">
                <image src="http://static.botue.com/ugo/uploads/brand_8.jpg"></image>
                <text>长虹</text>
              </navigator>
            </view>
          </view>
          <view class="children">
            <view class="title">电视</view>
            <!-- 品牌 -->
            <view class="brands">
              <navigator url="/pages/list/index">
                <image src="http://static.botue.com/ugo/uploads/brand_1.jpg"></image>
                <text>曲面电视</text>
              </navigator>
              <navigator url="/pages/list/index">
                <image src="http://static.botue.com/ugo/uploads/brand_2.jpg"></image>
                <text>海信</text>
              </navigator>
              <navigator url="/pages/list/index">
                <image src="http://static.botue.com/ugo/uploads/brand_3.jpg"></image>
                <text>创维</text>
              </navigator>
              <navigator url="/pages/list/index">
                <image src="http://static.botue.com/ugo/uploads/brand_4.jpg"></image>
                <text>夏普</text>
              </navigator>
              <navigator url="/pages/list/index">
                <image src="http://static.botue.com/ugo/uploads/brand_5.jpg"></image>
                <text>TCL</text>
              </navigator>
              <navigator url="/pages/list/index">
                <image src="http://static.botue.com/ugo/uploads/brand_6.jpg"></image>
                <text>PPTV</text>
              </navigator>
              <navigator url="/pages/list/index">
                <image src="http://static.botue.com/ugo/uploads/brand_7.jpg"></image>
                <text>小米</text>
              </navigator>
              <navigator url="/pages/list/index">
                <image src="http://static.botue.com/ugo/uploads/brand_8.jpg"></image>
                <text>长虹</text>
              </navigator>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
  import search from '@/components/search';

  export default {
     data() {
    return {
      categories: [],
      currentId: 1,
    };
  },
    components: {
      search
    },
    onLoad () {
      this.loadData ()
    },
    computed: {
  rightData () {
    // 根据当前选中的一级分类计算出二级和三级分类的数据
    const data = this.categories.filter(item => {
      return item.cat_id === this.currentId
    })
    // [] 作为条件是true if ([]) {}
    return data[0]? data[0].children: []
  }
},
    methods: {
      handleChange (e) {
  // 控制一级分类的切换
  // console.log('change' + e.target.dataset.id)
  this.currentId = e.target.dataset.id
},
        // 请求后端接口
async loadData () {
  // 调用分类接口获取数据
  const { message } = await this.$request({
    path: 'categories'
  })
  this.categories = message
}
      }
    }
</script>

<style scoped lang="less">
  scroll-view {
    height: 100%;
  }

  .category {
    display: flex;
    width: 100%;
    position: absolute;
    top: 100rpx;
    bottom: 0;

    .sup {
      width: 196rpx;
      background-color: #f4f4f4;

      text {
        display: block;
        height: 100rpx;
        text-align: center;
        line-height: 100rpx;
        font-size: 27rpx;
        color: #333;
        border-bottom: 1rpx solid #eee;

        &:last-child {
          border-bottom: none;
        }
        
        &.active {
          background-color: #FFF;
          color: #ea4451;
          position: relative;

          &::before {
            content: '';
            display: block;
            width: 8rpx;
            height: 60rpx;
            transform: translateY(-50%);
            background-color: #ea4451;

            position: absolute;
            left: 0;
            top: 50%;
          }
        }
      }
    }

    .sub {
      flex: 1;
      padding: 20rpx 18rpx;

      .thumb {
        width: 100%;
        height: 180rpx;
      }

      .children {
        text-align: center;
        color: #333;

        .title {
          display: inline-block;
          margin: 40rpx 0 20rpx;
          font-size: 30rpx;

          &::before {
            content: '/';
            margin-right: 20rpx;
            color: #666;
          }

          &::after {
            content: '/';
            margin-left: 20rpx;
            color: #666;
          }
        }
      }

      .brands {
        display: flex;
        flex-wrap: wrap;

        navigator {
          width: 33%;
          margin-bottom: 20rpx;
        }

        image {
          width: 120rpx;
          height: 120rpx;
        }

        text {
          display: block;
          font-size: 24rpx;
        }
      }
    }
  }
</style>


