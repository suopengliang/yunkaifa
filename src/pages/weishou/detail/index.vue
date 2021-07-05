<template>
  <view class="dbody">
    <view class="top">
      <image :src="listDetail.img"></image>
    </view>
    <view class="content">
      <table>
        <tr v-for="(item, index) in tableList" :key="index">
          <td>{{item.name}}:</td><td>{{item.value}}</td>
        </tr>
      </table>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      listDetail: {},
      tableList: []
    }
  },
  mounted () {
    const that = this
    this.list = []
    this.listDetail.img = ''
    this.loadData()
    wx.showLoading({
      title: '加载中'
    })
    const number = this.$root.$mp.query.number
    wx.cloud.callFunction({
      name: 'getweishoulist',
      success: function (res) {
        that.list = res.result.data
        that.list.forEach(item => {
          if (item.number === parseInt(number)) {
            that.listDetail = item.content
          }
        })
        wx.setNavigationBarTitle({
          title: that.listDetail.name
        })
        that.tableList.forEach(item => {
          for (var key in that.listDetail) {
            if (item.key === key) {
              item.value = that.listDetail[key]
            }
          }
        })
        that.listDetail.img = that.listDetail.img.replace(/www.hxy1995.xyz/, 'n8.hxy1995.xyz:8081')
        wx.hideLoading()
      },
      fail: function (err) {
        console.log('云函数获取数据失败', err)
      }
    })
  },
  onUnload () {
    this.loadData()
  },
  methods: {
    btn () {
      this.check = !this.check
    },
    change (obj) {
      console.log(obj)
    },
    loadData () {
      this.tableList = [{
        key: 'name',
        name: '尾兽',
        value: ''
      }, {
        key: 'shengyou',
        name: '声优',
        value: ''
      }, {
        key: 'weishu',
        name: '尾数',
        value: ''
      }, {
        key: 'introduce',
        name: '介绍',
        value: ''
      }, {
        key: 'yuanxing',
        name: '原型特征',
        value: ''
      }, {
        key: 'nengli',
        name: '能力',
        value: ''
      }, {
        key: 'xiangzheng',
        name: '象征',
        value: ''
      }, {
        key: 'renzhuli',
        name: '人柱力',
        value: ''
      }, {
        key: 'address',
        name: '国家/忍村',
        value: ''
      }]
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
  .top {
    display: flex;
    justify-content: center;
    image {
      width: 3rem;
      height: 3rem;
      margin: 0.2rem;
    }
  }
  .content {
    table {
      width: 100%;
      tr {
        display: flex;
        justify-content: center;
        td:nth-child(1) {
          text-align: right;
        }
        td:nth-child(2) {
          margin-left: 5px;
          flex: 1;
        }
      }
    }
  }
}
</style>