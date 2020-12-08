<template>
  <div class="dashboard-container">
    <fm-making-form 
      ref="makingform" 
      style="height: 500px;"
      upload
      preview 
      generate-code 
      generate-json
      clearable
    >
      <template slot="action" />
    </fm-making-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FormMaking',
  computed: {
    ...mapGetters([
      'name'
    ])
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
