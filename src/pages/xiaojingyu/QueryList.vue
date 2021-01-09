<template>
  <a-card>
    <a-form layout="horizontal">
      <a-row :gutter="24">
        <a-col :md="8" :sm="24">
          <a-form-item
              label="症状名称"
              :labelCol="{span: 5}"
              :wrapperCol="{span: 18, offset: 1}"
          >
            <a-input v-model="queryWords" placeholder="请输入"/>
          </a-form-item>
        </a-col>
        <a-col :md="8" style="margin-top:4px">
          <a-button type="primary" @click="query()">查询</a-button>
          <a-button style="margin-left: 8px" @click="clear()">重置</a-button>
        </a-col>
        <a-col :offset="6" :md="1" style="margin-top:4px">
          <a-button @click="showModal" type="primary">新建</a-button>
        </a-col>
      </a-row>
    </a-form>
    <a-modal :visible="visible" title="新建病症" @ok="handleOk" @cancel="hideModal">
      <a-input-group size="large">
        <a-row :gutter="8">
          <a-col :span="24">
            <a-input v-model="addWord" placeholder="输入病症名称"/>
          </a-col>
        </a-row>
      </a-input-group>
    </a-modal>
    <div>

      <standard-table
          :columns="columns"
          :dataSource="dataSource"
      >
        <div slot="description" slot-scope="{text}">
          {{ text }}
        </div>
        <div slot="action" slot-scope="{text, record}">
          <a style="margin-right: 8px" @click="goto(1)">
            <a-icon type="plus"/>
            查看症状
          </a>
          <a style="margin-right: 8px" @click="goto(2)">
            <a-icon type="edit"/>
            查看用药
          </a>
          <a @click="deleteRecord(record.key)">
            <a-icon type="delete"/>
            删除
          </a>
        </div>
      </standard-table>
    </div>
  </a-card>
</template>

<script>
import StandardTable from '@/components/table/StandardTable'
import {message} from "ant-design-vue"

const columns = [
  {
    title: '病症编号',
    dataIndex: 'no'
  },
  {
    title: '名称',
    dataIndex: 'description',
    scopedSlots: {customRender: 'description'}
  },
  {
    title: '操作',
    scopedSlots: {customRender: 'action'}
  }
]

const dataSource = [{
  key: 0,
  no: "NO 0",
  description: '中风',
}]

export default {
  name: 'QueryList',
  components: {StandardTable},
  data() {
    return {
      advanced: true,
      columns: columns,
      dataSource: dataSource,
      selectedRows: [],
      queryWords: "",
      visible: false,
      addWord: ""
    }
  },
  methods: {
    deleteRecord(key) {
      this.dataSource = this.dataSource.filter(item => item.key !== key)
      this.selectedRows = this.selectedRows.filter(item => item.key !== key)
      message.success("删除成功")
    },
    addNew() {
      this.dataSource.unshift({
        key: this.dataSource.length,
        no: 'NO ' + this.dataSource.length,
        description: this.addWord,
      })
      message.success("新建成功")
    },
    query() {
      this.dataSource = this.dataSource.filter(item => item.description === this.queryWords)
    },
    clear() {
      this.dataSource = dataSource;
      this.queryWords = ""
    },
    goto(i) {
      switch (i) {
        case 1:
          this.$router.push('/list/search/article')
          return
        case 2:
          this.$router.push('/list/search/application')
          return
      }

    },
    showModal() {
      this.visible = true;
    },
    hideModal() {
      this.visible = false;
      this.addWord = ""
    },
    handleOk() {
      this.addNew()
      this.hideModal()
    },
  }
}
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 54px;
}

.fold {
  width: calc(100% - 216px);
  display: inline-block
}

.operator {
  margin-bottom: 18px;
}

@media screen and (max-width: 900px) {
  .fold {
    width: 100%;
  }
}
</style>
