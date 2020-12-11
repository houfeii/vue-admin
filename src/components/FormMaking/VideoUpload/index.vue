<template>
  <div class="fm-uplaod-container" :id="uploadId">
    <div
      class="el-upload"
      :class="{ 'is-disabled': disabled }"
      v-show="fileList.length < length"
      :style="{ textAlign: 'left', display: 'block' }"
      @click.self="handleAdd"
      :file-list="fileList"
    >
      <div class="el-button" @click.self="handleAdd">点击上传</div>
      <div slot="tip" class="el-upload__tip">{{ext}}</div>
      <input
        accept="video/*"
        v-if="multiple"
        multiple
        ref="uploadInput"
        @change="handleChange"
        type="file"
        name="file"
        class="el-upload__input upload-input"
      />
      <input
        accept="video/*"
        v-else
        ref="uploadInput"
        @change="handleChange"
        type="file"
        name="file"
        class="el-upload__input upload-input"
      />
    </div>
    <div
      :id="item.key"
      :class="{
        uploading: item.status == 'uploading',
        'is-success': item.status == 'success',
        'is-diabled': disabled,
      }"
      class="upload-file-list"
      v-for="item in fileList"
      :key="item.key"
    >
      <p class="file-list" v-show="item.status == 'success'">
        <i class="el-icon-document"></i>
        <span :style="{ padding: '0 20px' }">{{ item.url }}</span>
        <i
          v-if="isDelete"
          class="iconfont icon-delete"
          :title="$t('fm.upload.delete')"
          @click="handleRemove(item.key)"
          :style="{ 'font-size': miniWidth / 8 + 'px' }"
        ></i>
      </p>
    </div>
  </div>
</template>

<script>
import Viewer from 'viewerjs'
import Draggable from 'vuedraggable'
require('viewerjs/dist/viewer.css')
export default {
  components: {
    Draggable,
  },
  props: {
    tip: {
      type: String,
      default: '请输入正确的格式',
    },
    value: {
      type: Array,
      default: () => [],
    },
    width: {
      type: Number,
      default: 100,
    },
    height: {
      type: Number,
      default: 100,
    },
    token: {
      type: String,
      default: '',
    },
    domain: {
      type: String,
      default: '',
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    length: {
      type: Number,
      default: 9,
    },
    isQiniu: {
      type: Boolean,
      default: false,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    min: {
      type: Number,
      default: 0,
    },
    meitu: {
      type: Boolean,
      default: false,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    action: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fileList: this.value.map(item => {
        return {
          key: item.key
            ? item.key
            : new Date().getTime() + '_' + Math.ceil(Math.random() * 99999),
          url: item.url,
          percent: item.percent ? item.percent : 100,
          status: item.status ? item.status : 'success',
        }
      }),
      viewer: null,
      uploadId: 'upload_' + new Date().getTime(),
      editIndex: -1,
      meituIndex: -1,
    }
  },
  computed: {
    miniWidth() {
      if (this.width > this.height) {
        return this.height
      } else {
        return this.width
      }
    },
  },
  mounted() {
    this.$emit('input', this.fileList)
  },
  methods: {
    handleChange() {
      console.log(this.$refs.uploadInput.files)
      const files = this.$refs.uploadInput.files

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const reader = new FileReader()
        const key =
          new Date().getTime() + '_' + Math.ceil(Math.random() * 99999)
        reader.readAsDataURL(file)
        reader.onload = () => {
          if (this.editIndex >= 0) {
            this.$set(this.fileList, this.editIndex, {
              key,
              url: reader.result,
              percent: 0,
              status: 'uploading',
            })

            this.editIndex = -1
          } else {
            this.fileList.push({
              key,
              url: reader.result,
              percent: 0,
              status: 'uploading',
            })
          }

          this.$nextTick(() => {
            console.log(111, file, key)
            this.uplaodAction(reader.result, file, key)
          })
        }
      }
      this.$refs.uploadInput.value = []
    },
    uplaodAction(res, file, key) {
      let changeIndex = this.fileList.findIndex(item => item.key === key)
      console.log(this.fileList.findIndex(item => item.key === key))
      const xhr = new XMLHttpRequest()

      const url = this.action
      xhr.open('POST', url, true)
      // xhr.setRequestHeader('Content-Type', 'multipart/form-data')

      let formData = new FormData()
      formData.append('file', file)

      xhr.send(formData)
      xhr.onreadystatechange = () => {
        console.log(xhr)
        if (xhr.readyState === 4) {
          let resData = JSON.parse(xhr.response)
          // 注意：修改这里为上传图片接口返回的数据格式
          console.log('resData', resData.data)
          if (resData && resData.data.img_url) {
            this.$set(
              this.fileList,
              this.fileList.findIndex(item => item.key === key),
              {
                ...this.fileList[
                  this.fileList.findIndex(item => item.key === key)
                ],
                url: resData.data.img_url,
                percent: 100,
              }
            )
            setTimeout(() => {
              this.$set(
                this.fileList,
                this.fileList.findIndex(item => item.key === key),
                {
                  ...this.fileList[
                    this.fileList.findIndex(item => item.key === key)
                  ],
                  status: 'success',
                }
              )
              this.$emit('input', this.fileList)
            }, 200)
          } else {
            this.$set(
              this.fileList,
              this.fileList.findIndex(item => item.key === key),
              {
                ...this.fileList[
                  this.fileList.findIndex(item => item.key === key)
                ],
                status: 'error',
              }
            )
            this.fileList.splice(
              this.fileList.findIndex(item => item.key === key),
              1
            )
          }
        }
      }
      xhr.onprogress = res => {
        console.log('progress', res)
        if (res.total && res.loaded) {
          this.$set(
            this.fileList[this.fileList.findIndex(item => item.key === key)],
            'percent',
            (res.loaded / res.total) * 100
          )
        }
      }
    },
    handleRemove(key) {
      this.fileList.splice(
        this.fileList.findIndex(item => item.key === key),
        1
      )
    },
    handleAdd() {
      if (!this.disabled) {
        this.editIndex = -1
        this.$refs.uploadInput.click()
      }
    },
  },
  watch: {
    fileList: {
      deep: true,
      handler(val) {
        // this.$emit('input', this.fileList)
      },
    },
  },
}
</script>

<style lang="scss">
.fm-uplaod-container {
  i {
    cursor: pointer;
  }
  .upload-file-list {
    margin: 5px 0;
    padding: 0 10px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    box-sizing: border-box;
    position: relative;
    vertical-align: top;
    &:hover {
      .uplaod-action {
        display: flex;
      }
    }
    .uplaod-action {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.6);
      display: none;
      justify-content: center;
      align-items: center;
      i {
        color: #fff;
        cursor: pointer;
        margin: 0 5px;
      }
    }
    &.uploading {
      &:before {
        display: block;
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.3);
      }
    }
    .upload-progress {
      position: absolute;
      .el-progress__text {
        color: #fff;
        font-size: 16px !important;
      }
    }
    .file-list {
      width: 100%;
      height: 30px;
      margin: 5px 10px;
    }
  }
  .upload-input {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    opacity: 0;
  }
}
</style>
