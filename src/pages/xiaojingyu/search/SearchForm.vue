<template>
  <div></div>
</template>

<script>
export default {
  name: 'SearchForm',
  data() {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    lookMyself() {
      this.form.setFieldsValue({
        owner: '3'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.search-form {
  margin-bottom: 24px;
}
</style>
