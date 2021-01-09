<template>
  <div>
    <search-form/>
    <a-list
        :grid="{gutter: 16, xl: 4, lg: 3, md: 3, sm: 2, xs: 1}"
        style="margin: 0 -8px"
    >
      <a-list-item :key="n" v-for="(item,n) in medical" style="padding: 0 8px">
        <a-card :title="item.d">
          <div :key="i" v-for="(item,i) in item.m">
            <a-tag style="margin-top: 5px">{{ item }}</a-tag>
          </div>
          <span slot="actions">
             <a-button type="primary" @click="showModal">修改</a-button>
          </span>
          <a-modal :visible="visible" title="新建病症" @ok="handleOk" @cancel="hideModal">
            <div>
              <template>
                <a-tag style="margin: 5px" :key="index"
                       v-for="(tag, index) in tags" :closable="true" @close="handleClose(tag)">
                  {{ tag }}
                </a-tag>
              </template>
              <a-input
                  v-if="inputVisible"
                  ref="input"
                  type="text"
                  size="small"
                  :style="{ width: '78px' }"
                  v-model="inputValue"
                  @blur="handleInputConfirm"
                  @keyup.enter="handleInputConfirm"
              />
              <a-tag v-else @click="showInput"
                     style="background: #fff; borderStyle: dashed; font-weight: bolder;color: coral">
                新用药
              </a-tag>
            </div>

          </a-modal>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import SearchForm from './SearchForm'

const medical = [{
  d: "中风",
  m: ["脑络通胶囊", "银杏叶片", "辛伐他汀片", "安宫牛黄丸", "大活络丸", "丁苯酞软胶囊", "辛伐他汀胶囊"]
}]
export default {
  name: 'ApplicationList',
  components: {SearchForm},
  data() {
    return {
      medical: medical,
      visible: false,
      addWord: "",
      tags: [],
      inputVisible: false,
      inputValue: '',
    }
  },
  methods: {
    handleClose(removedTag) {
      const tags = this.tags.filter(tag => tag !== removedTag);
      console.log(tags);
      this.tags = tags;
    },
    showModal() {
      this.visible = true;
      this.tags = this.medical[0].m
    },
    hideModal() {
      this.visible = false;
      this.addWord = ""
      this.medical[0].m = this.tags
    },
    handleOk() {
      this.hideModal()
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      const inputValue = this.inputValue;
      let tags = this.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: '',
      });
    },
  }
}
</script>

<style lang="less" scoped>
.clearfix() {
  zoom: 1;
  &:before,
  &:after {
    content: ' ';
    display: table;
  }
  &:after {
    clear: both;
    visibility: hidden;
    font-size: 0;
    height: 0;
  }
}

.content {
  .clearfix();
  margin-top: 16px;
  margin-left: 40px;

  & > div {
    position: relative;
    text-align: left;
    float: left;
    width: 50%;

    p {
      line-height: 32px;
      font-size: 24px;
      margin: 0;
    }

    p:first-child {
      color: @text-color-second;
      font-size: 12px;
      line-height: 20px;
      margin-bottom: 4px;
    }
  }
}
</style>
