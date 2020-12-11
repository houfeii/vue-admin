<template>
  <div class="dashboard-container">
    <el-alert type="success" :closable="false" title="设计表单" />
    <p style="padding: '0 10px';">
      <el-button type="danger" size="mini" @click="save">保存</el-button>
      <el-button type="info" size="mini" @click="goGenerate">跳转</el-button>
    </p>
    <el-row>
      <fm-generate-form 
      :data="jsonData" 
      ref="generateForm"
    >
    </fm-generate-form>
    </el-row>
    <el-row>
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
  </div>
</template>

<script>
import GenerateFormJson from './form_making/maked_demo/GenerateFormJson.json'
import ActivityGuide from './form_making/maked_demo/ActivityGuide.json'
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
      }).catch(e => {
        console.log(e)
      })
    },
    goGenerate() {
      this.$router.push('generate')
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
