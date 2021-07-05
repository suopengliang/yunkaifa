<template>
  <div class="dbody">
    <div class="body">
      <section class="content">
        <div class="fold-content on">
          <div
            class="tops"
            v-for="(items, indexs) in list"
            :key="indexs"
          >
            <span>{{ items }}</span>
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
    that.list = []
    wx.showLoading({
      title: '加载中...'
    })
    wx.cloud.callFunction({
      name: 'getrenshulist',
      success: function (res) {
        var arr = res.result.data
        arr.forEach(function (item) {
          if (item.id === parseInt(that.$root.$mp.query.id)) {
            that.list = item.renshu.split('?')
            wx.setNavigationBarTitle({
              title: item.name + '忍术'
            })
          }
        })
        wx.hideLoading()
      },
      fail: function (err) {
        console.log('云函数获取数据失败', err)
      }
    })
  },
  methods: {
    change (obj) {
      console.log(obj.renshu.split('?'))
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
    .tops {
      display: flex;
      align-items: center;
      z-index: 9999;
      border-bottom: 1px solid #e5e5e5;
      span {
        flex: 1;
        line-height: 1rem;
        height: 1rem;
        margin-left: 0.3rem;
      }
    }
  }
}
</style>