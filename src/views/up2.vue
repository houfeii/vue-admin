<template>
  <div style="padding:30px;">
    <el-alert type="success" :closable="false" title="生成表单" />
    <fm-generate-form
      :data="jsonData" 
      @on-change="onChange"
      :remote="remoteFuncs"
      :value="formData"
      ref="generateForm"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ActivityGuide from './form_making/maked_demo/ActivityGuide.json'
export default {
  data() {
    return {
      jsonData: ActivityGuide,
      formData: {
        show: ''
      },
      remoteFuncs: {
        // 下拉选择框 获取远端数据，注意 json 文件的配置
        func_1607566057000_61956 (resolve) {
          // 获取到远端数据后执行回调函数
          // resolve(data)
          // 模拟数据获取
          setTimeout(() => {
            const options = [
              {value: 'value1', label: '111'},
              {value: 'value2', label: '222'},
              {value: 'value3', label: '333'},
            ]
            // 对象中 value、label 是设计器中配置的值和标签
            resolve(options)
          }, 2000)
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'formJson'
    ])
  },
  mounted() {
    // this.jsonData = JSON.parse(this.formJson.content)
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
