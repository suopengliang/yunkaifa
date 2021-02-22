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
      list: ''
    }
  },
  mounted () {
    const that = this
    wx.setNavigationBarTitle({
      title: '忍者'
    })
    wx.cloud.callFunction({
      name: 'getrenzhelist',
      success: function (res) {
        // console.log('云函数获取数据成功', res.result.data)
        that.list = res.result.data
        that.list.forEach((item) => {
          item.checked = false
        })
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
      this.list.forEach((item, index) => {
        if (item.id === obj.id) {
          item.checked = !item.checked
          this.$set(this.list, index, {
            id: item.id,
            checked: item.checked,
            title: { img: item.title.img, name: item.title.name },
            content: item.content
          })
        } else {
          item.checked = false
        }
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
        width: 2rem;
        height: 2rem;
        margin: 0.4rem 1rem;
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