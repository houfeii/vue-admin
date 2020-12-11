<template>
  <div style="padding:30px;">
    <el-alert type="success" :closable="false" title="生成表单" />
    <el-divider></el-divider>
    <fm-generate-form
      :data="jsonData" 
      @on-change="onChange"
      :value="formData"
      ref="generateForm"
    />
    <p style="paddingBottom: '10px';">
      <el-button type="danger" size="mini" @click="save">获取表单的JOSN</el-button>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ActivityGuide from '../maked_demo/ActivityGuide.json'
export default {
  data() {
    return {
      jsonData: {
        "list": [
        ],
        "config": {
          "labelWidth": 100,
          "labelPosition": "right",
          "size": "small"
        }
      },
      formData: {}
    }
  },
  computed: {
    ...mapGetters([
      'formJson'
    ])
  },
  mounted() {
    console.log(this.formJson.content)
    if(this.formJson.content) this.jsonData = JSON.parse(this.formJson.content)
    else this.jsonData = ActivityGuide
  },
  methods: {
    // 表单字段值改变后会触发 on-change 事件。
    onChange(field, value) {
      console.log(field, value)
    },
    save() {
      this.$refs.generateForm.getData().then(data => {
        alert('获取填入表单的JSON： \r\n' + JSON.stringify(data))
      }).catch(e => {
      })
    }
  }
}
</script>
