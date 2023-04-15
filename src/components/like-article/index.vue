<template>
  <van-button
  class="btn-item"
  :icon="isliked === 1 ? 'good-job' : 'good-job-o'"
  :class="{ liked: isliked === 1 }"
  :loading="loading"
  @click="onlike"
  >
  </van-button>
</template>

<script>
import { addLike, deleteLike } from '@/api/article'
export default {
  name:'LikeArticle',
  model: {
    prop: "isliked",
    event: "update-is_isliked"
  },
  props: {
    isliked: {
      type: Number,
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
    async onlike () { 
      this.loading = true
      try {
        let status = -1
        if (this.isliked === 1) {
          // 已点赞，取消点赞
          await deleteLike(this.articleId)
        } else {
          // 未点赞，添加点赞
          await addLike(this.articleId)
          status = 1
        }
        this.$emit("update-is_isliked", status)
        this.$toast.success(status === 1 ? "点赞失败" : "取消点赞")
      } catch (err) {
        this.$toast.fail('点赞失败，请重试')
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.liked {
  .van-icon {
    color: #e5645f;
  }
}
</style>