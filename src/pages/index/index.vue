<template>
	<view class="container">
	<view class="search">
		<view class="input-box">
		<input type="text" />
	</view>
	<view class="content"></view>
	</view>
		<image class="logo" src="/static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Nihao'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.search .input-box {
		padding: 20rpx 16rpx;
		background-color: #FF2D4A;
	}
	.search .input-box input {
		background-color: #fff;
	}
</style>
