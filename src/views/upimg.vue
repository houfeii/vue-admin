<template>
  <div>
    <editor id="tinymce" placeholder="请输入内容" v-model="value" :init="init" />
    <p style="padding: '0 10px';">
      <el-button type="danger" size="mini" @click="save">保存</el-button>
    </p>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import 'tinymce/icons/default'

import 'tinymce/plugins/image'// 插入上传图片插件
import 'tinymce/plugins/media'// 插入视频插件
import 'tinymce/plugins/table'// 插入表格插件
import 'tinymce/plugins/lists'// 列表插件
import 'tinymce/plugins/wordcount'// 字数统计插件
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/fullpage'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/contextmenu'

console.log(process.env.VUE_APP_BASE_API)

export default {
  components: {
    Editor
  },
  data() {
    return {
      init: {
        language_url: '/tinymce/zh_CN.js', // 语言包的路径
        language: 'zh_CN',
        skin_url: '/tinymce/skins/ui/oxide', // skin路径
        font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif',
        height: 500, // 编辑器高度
        branding: false, // 是否禁用“Powered by TinyMCE”
        menubar: false, // 顶部菜单栏显示
        contextmenu: false, // 禁用富文本的右键菜单，使用浏览器自带的右键菜单
        emoticons_database_url: '/tinymce/emojis.js',
        plugins: 'lists image media link table wordcount emoticons code contextmenu preview fullscreen fullpage contextmenu',
        toolbar: 'undo redo |  formatselect | contextmenu emoticons bold italic forecolor backcolor code | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media link table | preview fullscreen fullpage | removeformat',
        // images_upload_url: '/activity/uploadImg', // 后端处理程序地址
        // images_upload_base_path: '' // 如果返回的地址是相对路径，还有一个参数images_upload_base_path，可以给相对路径指定它所相对的基本路径
        // 图片本地上传方法  点击上传后执行的事件
        images_upload_handler: (blobInfo, success, failure) => {
          console.log(111, blobInfo, success, failure)
        }
      },
      value: ''
    }
  },
  methods: {
    save() {

    }
  }
}
</script>