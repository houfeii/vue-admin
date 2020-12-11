<template>
  <div class="dashboard-container">
    <el-alert type="success" :closable="false" title="设计的表单会在生成表单的 menu 下预览" />
    <el-row>
      <p style="paddingBottom: '10px';">
        <el-tag>表单设计器——将拖拽组件生成JSON</el-tag>
      </p>
      <fm-making-form 
        ref="makingForm" 
        style="height: 500px;"
        upload
        preview 
        generate-code 
        generate-json
        clearable
      >
        <template slot="action" />
      </fm-making-form>
    </el-row>
    <p style="paddingBottom: '10px';">
      <el-button type="danger" size="mini" @click="save">点击保存设计的表单</el-button>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'making',
  computed: {
    ...mapGetters([
      'formJson'
    ])
  },
  methods: {
    save() {
      const json = this.$refs['makingForm'].getJSON()
      const result = { content: JSON.stringify(json) }
      this.$store.dispatch('formMaking/setFormJson', result)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 14px;
    line-height: 46px;
  }
}
</style>
