<template>
  <div>
    <div :class="['search-head', layout, pageWidth]">
      <div class="search-input">
        <a-input-search class="search-ipt" style="width: 522px" placeholder="请输入名称" size="large" enterButton="搜索"/>
      </div>
      <div style="padding: 0 24px">
        <a-tabs :tabBarStyle="{margin: 0}" @change="navigate" :activeKey="activeKey">
          <a-tab-pane tab="症状" key="1"></a-tab-pane>
          <a-tab-pane tab="用药" key="2"></a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <div class="search-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'SearchLayout',
  computed: {
    ...mapState('setting', ['layout', 'pageWidth']),
    activeKey() {
      switch (this.$route.path) {
        case '/list/search/article':
          return '1'
        case '/list/search/application':
          return '2'
        default:
          return '1'
      }
    }
  },
  methods: {
    navigate(key) {
      switch (key) {
        case '1':
          this.$router.push('/list/search/article')
          break
        case '2':
          this.$router.push('/list/search/application')
          break
        default:
          this.$router.push('/workplace')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-head {
  background-color: @base-bg-color;
  margin: -24px;

  &.head.fixed {
    margin: -24px 0;
  }

  .search-input {
    text-align: center;
  }
}

.search-content {
  margin-top: 48px;
}
</style>
