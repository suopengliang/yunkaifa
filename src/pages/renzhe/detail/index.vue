<template>
  <view class="dbody" v-if="show">
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
      listDetail: '',
      tableList: [{
        key: 'shenfen',
        name: '身份',
        value: ''
      }, {
        key: 'dengji',
        name: '等级',
        value: ''
      }, {
        key: 'chakelashuxing',
        name: '查克拉属性',
        value: ''
      }, {
        key: 'shengyou',
        name: '声优',
        value: ''
      }, {
        key: 'rname',
        name: '外文名字',
        value: ''
      }, {
        key: 'renxcun',
        name: '忍村',
        value: ''
      }, {
        key: 'renshu',
        name: '忍术',
        value: ''
      }, {
        key: 'jiazu',
        name: '家族',
        value: ''
      }, {
        key: 'jiaren',
        name: '家人',
        value: ''
      }, {
        key: 'jianjie',
        name: '简介',
        value: ''
      }],
      show: false
    }
  },
  mounted () {
    const that = this
    var id = this.$root.$mp.query.id
    wx.cloud.callFunction({
      name: 'getrenzhelist',
      success: function (res) {
        res.result.data.forEach(item => {
          if (item.id === parseInt(id)) {
            if (item['content'] !== undefined) {
              that.listDetail = item.content
              that.show = true
            } else {
              wx.showToast({
                title: '暂无忍者数据',
                icon: 'none',
                duration: 2000
              })
              that.show = false
            }
          }
        })
        if (that.show) {
          that.listDetail.img = that.listDetail.img.replace(/www.hxy1995.xyz/, 'n8.hxy1995.xyz:8081')
          wx.setNavigationBarTitle({
            title: that.listDetail.zname
          })
          that.tableList.forEach(item => {
            for (var key in that.listDetail) {
              if (item.key === key) {
                item.value = that.listDetail[key]
              }
            }
          })
        }
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
      console.log(obj)
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
          width: 1.6rem;
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