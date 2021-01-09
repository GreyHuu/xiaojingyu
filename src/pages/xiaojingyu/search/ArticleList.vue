<template>
  <div>
    <search-form/>
    <a-card :bordered="false">
      <a-list itemLayout="vertical">
        <a-list-item :key="j" v-for="(item1,j) in disease">
          <a-list-item-meta :title="item1.d">
            <div slot="description">
              <a-tag :key="i" v-for="(item,i) in item1.s">{{ item }}</a-tag>
            </div>
          </a-list-item-meta>
          <div class="content">
            <div class="detail">
              肢体乏力、鼻出血、眩晕、单眼突然发黑、哈欠不断、呛咳、手指麻木、说话吐字不清、原因不明跌跤、嗜睡、精神状态发生变化
            </div>
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
                新病症
              </a-tag>
            </div>

          </a-modal>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import SearchForm from './SearchForm'

const symptom = ["面部一侧出汗另", "口角歪斜", "无法说话", "伸舌偏斜", "眩晕", "偏盲", "对侧肢体偏瘫", "偏瘫", "眼球震颤", "口眼歪斜", "Todd瘫痪"]

const disease = [{
  d: "中风",
  s: symptom
}]

export default {
  name: 'ArticleList',
  components: {SearchForm},
  data() {
    return {
      disease: disease,
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
      this.tags = this.disease[0].s
    },
    hideModal() {
      this.visible = false;
      this.addWord = ""
      this.disease[0].s = this.tags
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
.extra {
  width: 272px;
  height: 1px;
}

.content {
  .detail {
    line-height: 22px;
    max-width: 720px;
  }

  .author {
    color: @text-color-second;
    margin-top: 16px;
    line-height: 22px;

    & > :global(.ant-avatar) {
      vertical-align: top;
      margin-right: 8px;
      width: 20px;
      height: 20px;
      position: relative;
      top: 1px;
    }

    & > em {
      color: @disabled-color;
      font-style: normal;
      margin-left: 16px;
    }
  }
}
</style>
