<template>
  <div class="dbody">
    <div class="body" v-for="(item, index) in list" :key="index">
      <div class="top" @click="change(item)">
        <img :src="item.img" alt=""/>
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: ''
    }
  },
  mounted () {
    const that = this
    wx.showLoading({
      title: '加载中...'
    })
    wx.setNavigationBarTitle({
      title: '忍村'
    })
    wx.cloud.callFunction({
      name: 'getrencunlist',
      success: function (res) {
        // console.log('云函数获取数据成功', res.result.data)
        that.list = res.result.data.map(item => {
          item.img = item.img.replace(/www.hxy1995.xyz/, 'n8.hxy1995.xyz:8081')
          return item
        })
        wx.hideLoading()
      },
      fail: function (err) {
        console.log('云函数获取数据失败', err)
      }
    })
  },
  methods: {
    btn () {
      this.check = !this.check
    },
    change (obj) {
      wx.navigateTo({
        url: '/pages/renzhe/main?cunzi=' + obj.cunzi
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.fold-content {
  width: 100%;
  background: #e5e5e5;
  height: 0px;
  opacity: 0;
  z-index: 998;
}
.fon {
  transition: all 1s;
}
.checked {
  background: #e5e5e5;
}
.on {
  background: #ffffff;
  opacity: 1;
  height: 100%;
  z-index: 998;
  transition: all 1s;
}
.dbody {
  display: flex;
  flex-direction: column;
  .body {
    border-bottom: 1px solid #e5e5e5;
    .top {
      display: flex;
      align-items: center;
      z-index: 9999;
      image {
        width: 1rem;
        height: 1rem;
        margin: 0.2rem;
      }
      span {
        flex: 1;
      }
    }
  }
}
</style>