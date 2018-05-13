<template>
     <div>
     <div v-for="(value,key) in priceOption" :key="key" class="pd-8">
       <span class="option-type">{{priceFactorKv[key]}}</span>
       <el-tag :key="tag"
            v-for="tag in value"
            closable
            :disable-transitions="false"
            @close="handleClose(value,tag)">
            {{tag}}
      </el-tag>
           <el-button   class="button-new-tag" size="small">+ 新增</el-button>
       </div>  

  </div>
</template>

<script>
export default {
  data () {
    return {
      inputVisible: false,
      inputValue: ''
    }
  },
  props: ['priceOption', 'priceFactorKv'],
  methods: {
    handleClose (value, tag) {
      value.splice(value.indexOf(tag), 1)
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
 

<style lang="less">
.option-type{
  text-align:center;
  width:100px;
  display: inline-block;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>