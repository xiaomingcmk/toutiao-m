<template>
  <van-button
  class="btn-item"
  :icon="isCollected ? 'star' : 'star-o'"
  :class="{ collected: isCollected }"
  :loading="loading"
  @click="onCollect"
  >
  </van-button>
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'

export default {
  name: 'CollectArticle',
  model: {
    prop: "isCollected",
    event: "update-is_collected"
  },
  props: {
    isCollected: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async onCollect () { 
      this.loading = true
      try {
        if (this.isCollected) {
          // 已收藏，取消收藏
          await deleteCollect(this.articleId)
        } else {
          // 未收藏，添加收藏
          await addCollect(this.articleId)
        }
        this.$emit("update-is_collected", !this.isCollected)
        this.$toast.success(!this.isCollected ? '收藏成功' : '取消收藏')
      } catch (err) {
        this.$toast.fail('收藏失败，请重试')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.collected {
  .van-icon {
    color: #ffa500
  }
}
</style>