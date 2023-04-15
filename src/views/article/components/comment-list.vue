<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :error="error"
    error-text="加载失败，请稍后重试"
    :immediate-check="false"
    @load="onLoad"
  >
    <comment-item
    v-for="(item, index) in list"
    :key="index"
    :comment="item"
    @reply-click="$emit('reply-click', $event)"
    />
  </van-list>
</template>

<script>
import { getComment } from '@/api/comment'
import CommentItem from './comment-item'
export default {
  name:'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      // 自定义 prop 数据验证
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, // 获取下一页数据的标记
      limit: 10,
      error: false
    }
  },
  created () {
    this.loading = true
    this.onLoad()
  },
  methods: {
    async onLoad () {
      try {
        // 1.请求获取数据
        const { data } = await getComment({
          type: this.type, // 评论类型
          source: this.source.toString(), // 源 id，文章 id 或者评论 id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        })
        // 2.将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)
        // 把文章评论总数量传递到外部
        this.$emit('onload-success', data.data)
        // 3.将 loading 设置为 false
        this.loading = false
        // 4.判断是否还有数据
        if (results.length) {
        // 有就更新获取下一页数据的页码
          this.offset = data.data.last_id
        } else {
        // 没有就将 finished 设置结束
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>