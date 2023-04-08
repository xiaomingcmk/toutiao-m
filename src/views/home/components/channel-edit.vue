<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        size="mini"
        round
        type="danger"
        plain
        @click="isEdit = ! isEdit"
      >{{ isEdit ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10">
      <van-grid-item class="grid-item" v-for="(channel, index) in myChannels" :key="index" @click="onMyChannelClick(channel, index)">
        <van-icon slot="icon" name="clear" v-show="isEdit && !fixedChannels.includes(channel.id)"></van-icon>
        <span slot="text" class="text" :class="{ active:index === active }">{{ channel.name }}</span>
      </van-grid-item>

    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommed-grid" :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        icon="plus"
        :text="channel.name"
        @click="onAddChannel(channel)"
       />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [], // 所有频道
      isEdit: false, // 控制编辑状态的显示
      fixedChannels: [0, 1, 2] // 固定频道，不允许删除
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      // 数组的 filter 方法：遍历数组，把符合条件的元素存储到新数组中并返回
      return this.allChannels.filter(channel => {
        // const channels = []
        // 数组的 find 方法：遍历数组，把符合条件的第1个元素返回
        return !this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
        // return channels
      })
    }
    
  },
  watch: {},
  created () {
    this.loadAllChannels()
    },
  mounted () {},
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    async onAddChannel (channel) {
      this.myChannels.push(channel)
      // 数据持久化处理
      if (this.user) {
        try {
          // 已登录，把数据请求接口放到线上
          await addUserChannel({
          id:channel.id, // 频道 id
          seq:this.myChannels.length // 序号
        })
        } catch (error) {
          this.$toast('保存失败，请稍后重试')
        }
      } else {
        // 未登录，把数据存储到本地
        setItem("TOUTIAO_CHANNELS", this.myChannels)
      }
    },
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        // 如果是固定频道，则不删除
        if (this.fixedChannels.includes(channel.id)) {
          return 0
        }
        // 编辑状态，执行删除频道
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        // 删除频道项
        this.myChannels.splice(index, 1)
        // 处理持久化
        this.deleteChannel(channel)
      } else {
        // 非编辑状态，执行切换频道
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannel (channel) {
      try {
        if (this.user) {
        // 已登录，则将数据更新到线上
          await deleteUserChannel(channel.id)
        } else {
          // 未登录，将数据更新到本地
          setItem("TOUTIAO_CHANNELS", this.myChannels)
        }
      } catch (error) {
        this.$toast('操作失败，请稍后尝试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;

  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  /deep/ .grid-item {
    height: 86px;
    width: 160px;
    .van-grid-item__content {
      background-color: #f4f5f6;
      white-space: nowrap;
      .van-grid-item__text, .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }

      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        top: -10px;
        right: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  /deep/ .recommed-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
        
      }
    }
  }
}
</style>