<template>
  <div class="search-suggestion">
    <van-cell
    :title="text"
    icon="search"
    v-for="(text, index) in suggestions"
    :key="index"
    @click="$emit('search', text)"
    >
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: [],
      htmlStr: 'Hello <span style="color: red">World</span>'
    }
  },
  computed: {},
  watch: {
    searchText: {
      // 当 searchText 发生变化时会调用 handler 函数
      // 注意：handler 函数的名称是固定的
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }, 200),
      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  },
  created () {},
  mounted () {},
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q);
        this.suggestions = data.data.options
      } catch (error) {
        this.$toast('数据获取失败,请稍后重试')
      }
    },
    highlight (text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style scoped lang="less">
.search-suggestion {
  /deep/ .active {
    color: #3296fa;
  }
}
</style>