<template>
  <div style="padding:30px;">
    <el-alert type="success" :closable="false" title="生成表单" />
    <fm-generate-form
      :data="jsonData" 
      @on-change="onChange"
      :value="formData"
      ref="generateForm"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      jsonData: {"list":[{"type":"input","icon":"icon-input","options":{"width":"100%","defaultValue":"","required":false,"dataType":"string","pattern":"","placeholder":"","customClass":"","disabled":false,"labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"showPassword":false,"remoteFunc":"func_1575897887618","remoteOption":"option_1575897887618"},"name":"名称","key":"1575897887618","model":"name","rules":[{"type":"string","message":"名称格式不正确"}]},{"type":"text","icon":"icon-wenzishezhi-","options":{"defaultValue":"","customClass":"","labelWidth":100,"isLabelWidth":false,"hidden":false,"dataBind":true,"remoteFunc":"func_1575906202073","remoteOption":"option_1575906202073"},"name":"","key":"1575906202073","model":"show","rules":[]}],"config":{"labelWidth":100,"labelPosition":"right","size":"small","customClass":""}},
      formData: {
        show: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'formJson'
    ])
  },
  mounted() {
    this.jsonData = JSON.parse(this.formJson.content)
  },
  methods: {
    onChange (field, value) {
      if (field == 'name') {
        this.formData.show = value
      }
    }
  }
}
</script>
