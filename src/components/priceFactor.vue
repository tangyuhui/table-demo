<template>
     <div>
     <div v-for="(value,key) in priceOption" :key="key" class="pd-8 h-50">
        <span class="option-type">{{priceFactorKv[key]}}</span>
        <el-tag :key="tag"
              v-for="tag in value"
              closable
              :disable-transitions="false"
              @close="deletePriceFacOption(key,tag)">
              {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible[key]"
          size="small"
          v-model="inputValue[key]"
          ref="saveTagInput"
          @keyup.enter.native="handleInputConfirm(key)"
          @blur="handleInputConfirm(key)"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput(key)">+ 新增</el-button>
     </div>  

  </div>
</template>

<script>
export default {
  data () {
    return {
      inputVisible: {},
      inputValue: {}
    }
  },
  props: ['priceOption', 'priceFactorKv'],
  methods: {
    addPriceFacOption (optionType, optionValue) {
      this.$emit('addPriceFacOption', optionType, optionValue)
    },
    deletePriceFacOption (optionType, optionValue) {
      this.$emit('deletePriceFacOption', optionType, optionValue)
    },
    showInput (type) {
      this.$set(this.inputVisible, type, true)
      this.$nextTick(_ => {
        this.$refs.saveTagInput[this.$refs.saveTagInput.length - 1].$refs.input.focus()
      })
    },
    handleInputConfirm (type) {
      if (this.inputValue[type] === '' || this.inputValue[type] === undefined) {
        this.$set(this.inputVisible, type, false)
      } else if (this.inputVisible[type]) {
        let inputValue = this.inputValue[type]
        this.addPriceFacOption(type, inputValue)
        this.$set(this.inputVisible, type, false)
        this.$set(this.inputValue, type, '')
      }
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
  vertical-align: middle;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 32px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: middle;
}
.h-50{
  height:50px;
  line-height:50px;
}
</style>