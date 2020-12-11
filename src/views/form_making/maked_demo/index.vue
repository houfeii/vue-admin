<template>
  <div class="dashboard-container">
    <el-alert type="success" :closable="false" title="设计的表单会在生成表单的 menu 下预览" />
    <el-row>
      <p style="paddingBottom: '10px';">
        <el-tag>表单生成器——使用本地的JSON生成表单</el-tag>
      </p>
      <fm-generate-form 
      :data="jsonData" 
      ref="generateForm"
    >
    </fm-generate-form>
    </el-row>
    <el-row>
      <p style="paddingBottom: '10px';">
        <el-tag>表单设计器——将拖拽组件生成JSON，默认使用本地的JOSN</el-tag>
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
      <el-button type="danger" size="mini" @click="save">点击保存 设计表单 并 跳转到生成表单demo页</el-button>
    </p>
  </div>
</template>

<script>
import GenerateFormJson from './GenerateFormJson.json'
import ActivityGuide from './ActivityGuide.json'
import { mapGetters } from 'vuex'
export default {
  name: 'making',
  data() {
    return {
      jsonData: GenerateFormJson,
    }
  },
  computed: {
    ...mapGetters([
      'formJson'
    ])
  },
  mounted() {
    this.$refs['makingForm'].setJSON(ActivityGuide)
  },
  methods: {
    save() {
      const json = this.$refs['makingForm'].getJSON()
      this.$refs.generateForm.getData().then(data => {
        const result = { ...data, content: JSON.stringify(json) }
        this.$store.dispatch('formMaking/setFormJson', result)
        this.$router.push('generated_demo')
      }).catch(e => {
        console.log(e)
      })
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
