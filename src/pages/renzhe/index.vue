<template>
  <div class="dbody">
    <div class="body">
      <!-- <div class="top" :class="item.checked === true ? 'checked' : ''" @click="change(item)">
        <img :src="item.img" alt=""/>
        <span>{{ item.name }}</span>
      </div> -->
      <section class="content">
        <div class="fold-content on">
          <div
            class="tops"
            v-for="(items, indexs) in list"
            :key="indexs"
            @click="change(items)"
          >
            <image :src="items.img"></image>
            <span>{{ items.name }}</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  mounted () {
    const that = this
    wx.setNavigationBarTitle({
      title: '忍者'
    })
    wx.showLoading({
      title: '加载中...'
    })
    that.list = []
    const rencun = that.$root.$mp.query.cunzi
    wx.cloud.callFunction({
      name: 'getrenzhelist',
      success: function (res) {
        var arr = res.result.data
        arr.forEach((item) => {
          if (item.cunzi === rencun) {
            that.list.push(item)
          }
        })
        that.list = that.list.map(item => {
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
        url: '/pages/renzhe/detail/main?id=' + obj.id
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
        width: 1.5rem;
        height: 1.5rem;
        margin: 0.4rem 0.3rem;
      }
      span {
        flex: 1;
      }
    }
    .tops {
      display: flex;
      align-items: center;
      z-index: 9999;
      image {
        width: 2rem;
        height: 2rem;
        margin: 0.1rem 0.5rem;
      }
      span {
        flex: 1;
      }
    }
  }
}
</style>