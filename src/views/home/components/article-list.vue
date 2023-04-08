<template>
  <div class="article-list">
    <van-pull-refresh v-model="isreFreshLoading" :success-duration="800" :success-text="refreshSuccessText" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
      <article-item v-for="(article,index) in list" :key="index" :article="article" />
      <!-- <van-cell v-for="(article,index) in list" :key="index" :title="article.title" /> -->
      </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name:'ArticleList',
  components: {
    ArticleItem
  },
  data () {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 请求获取下一页数据的时间戳
      error: false, // 控制列表加载失败的提示状态
      isreFreshLoading: false, // 控制下拉刷新的loading状态
      refreshSuccessText: '刷新成功' // 下拉刷新成功提示文本
    }
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 初始化或滚动到底部的时候会触发调用 onLoad
    async onLoad () {
      try {
        // 1.请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道 id
          timestamp: this.timestamp || Date.now() // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        })
        // 2.把请求的结果数据放到 list 数组中
        const { results } = data.data
        this.list.push(...results)
        // 3.本次数据加载结束之后要把加载状态设置为结束
        // loading 关闭之后才能触发下一次的加载更多
        this.loading = false
        // 4.判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了，将 finished 设置为 true，不再 loading 加载更多
          this.finished = true 
        }
      } catch (err) {
        // 展示错误提示状态
        this.error = true
        // 请求失败了，loading要关闭
        this.loading = false
      }
    },
    // 下拉刷新时会触发该函数
    async onRefresh () {
      try {
      // 1.请求获取数据
      const { data } = await getArticles({
          channel_id: this.channel.id, // 频道 id
          timestamp: Date.now() // 下拉刷新，每次获取最新数据，所以传递当前时间戳
        })
      // 2.将数据追加到列表的顶部
      const { results } = data.data
      this.list.unshift(...results)
      // 3.关闭下拉刷新的 loading 状态
      this.isreFreshLoading = false
      // 更新下拉刷新成功提示的文本
      this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        this.refreshSuccessText = '刷新失败'
        this.isreFreshLoading = false
      }
    }
  }
}
</script>

<style>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>