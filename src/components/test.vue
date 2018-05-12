<template>
     <div>
    <el-table
      :data="tableData6"
      border
      style="width: 100%; margin-top: 20px"  :cellClassName="getCellClassName" :spanMethod="objectSpanMethod" :emptyText="'--'">
       <el-table-column  :prop="tablekey"  :label="tableHeadName" v-for="(tableHeadName, tablekey) in tableHeader" :key="tablekey">
      </el-table-column>
      <el-table-column prop="price"  label="价格">
        <template slot-scope="scope">
            <el-input size="medium" v-model="scope.row.price" placeholder="请输入价格" @change="handleEdit(scope.$index, scope.row)"></el-input>  
         </template>
      </el-table-column>
    </el-table>

    <el-row style="margin-top:10px;">
      <el-button type="primary" @click="addRow">增加一行</el-button>
         <el-button type="primary" @click="addColumn">增加一列</el-button>
    </el-row>

  </div>
</template>

<script>
import _ from 'lodash'
import * as util from '@/common/js/util'
export default {
  data () {
    return {
      tableData6: [],
      attrKv: {
        sex: '性别',
        age: '年龄',
        hc: '承载人数',
        fs: '份数'
      },
      theadKey: ['sex', 'age', 'hc'],
      priceOption: {
        sex: ['男', '女'],
        age: [18, 20],
        hc: ['2-6人', '7-8人']
      }
    }
  },
  created () {
    this.initializeTable()
  },
  methods: {
    initializeTable () {
      this.tableData6 = this.startCombine(this.priceOption)
      this.buildSortAndCombineArr(this.tableData6)
    },
    refreshTable () {},
    getAttributeCount (obj) {
      var count = 0
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          // 建议加上判断,如果没有扩展对象属性可以不加
          count++
        }
      }
      return count
    },
    addColumn () {
      this.theadKey.push('fs')
      this.addTagChoose('fs', '5份')
      this.tableData6 = this.startCombine(this.priceOption)
      this.buildSortAndCombineArr(this.tableData6)
    },
    addRow () {
      this.addTagChoose('hc', '9-12人')
      this.tableData6 = this.tableData6.concat(
        this.buildNewDataArray('hc', '9-12人')
      )
      this.buildSortAndCombineArr(this.tableData6)
    },
    buildSortAndCombineArr (datas) {
      datas = util.orderBy(datas, this.priceFactor)
      if (_.isPlainObject(datas)) {
        datas = datas.results
      }
      datas = datas.map(data => {
        return _.pick(data, ['price', ...this.priceFactor])
      })
      this.tableData6 = this.combineCell(datas)
      // console.log(datas)
    },
    buildNewDataArray (curAttr, curdata) {
      let pendData = _.pickBy(this.priceOption, function (value, key) {
        if (key !== curAttr) {
          return true
        }
      })
      pendData[curAttr] = [curdata]
      return this.startCombine(pendData)
    },
    addTagChoose (tagType, tagValue) {
      let dealValue = this.priceOption[tagType]
      if (_.isArray(dealValue)) {
        if (dealValue.indexOf(tagValue) === -1) {
          dealValue.push(tagValue)
        }
      } else {
        this.$set(this.priceOption, tagType, [tagValue])
      }
    },
    addPrice (item, price) {
      this.$set(item, 'price', price)
    },
    getCellClassName ({ row, column, rowIndex, columnIndex }) {
      if (
        columnIndex < this.attributeCount &&
        row['@' + this.priceFactor[columnIndex] + 'dis']
      ) {
        return 'hidden'
      } else {
        return ''
      }
    },
    calCombination (prevCombinationStore, pendArr, attr) {
      var curCombinationStore = []
      if (
        prevCombinationStore &&
        prevCombinationStore.length &&
        prevCombinationStore.length > 1
      ) {
        for (let i = 0; i < prevCombinationStore.length; i++) {
          for (let j = 0; j < pendArr.length; j++) {
            let plan = _.cloneDeep(prevCombinationStore[i])
            plan[attr] = pendArr[j]
            curCombinationStore.push(plan)
          }
        }
      } else {
        for (let i = 0; i < pendArr.length; i++) {
          let plan = {}
          plan[attr] = pendArr[i]
          curCombinationStore.push(plan)
        }
      }
      return curCombinationStore
    },
    startCombine (list) {
      var combineArr = []

      for (let z in list) {
        combineArr = this.calCombination(combineArr, list[z], z)
      }
      return combineArr
    },
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      let rowSpan = row['@' + this.priceFactor[columnIndex] + 'span']
      if (row['@' + this.priceFactor[columnIndex] + 'span']) {
        return [rowSpan, 1]
      } else {
        return [1, 1]
      }
    },
    combineCell (list) {
      for (let field in list[0]) {
        var k = 0
        while (k < list.length) {
          list[k]['@' + field + 'span'] = 1
          list[k]['@' + field + 'dis'] = false
          for (var i = k + 1; i <= list.length - 1; i++) {
            if (list[k][field] === list[i][field] && list[k][field] !== '') {
              list[k]['@' + field + 'span']++
              list[k]['@' + field + 'dis'] = false
              list[i]['@' + field + 'span'] = 1
              list[i]['@' + field + 'dis'] = true
            } else {
              break
            }
          }
          k = i
        }
      }
      return list
    },
    handleEdit (index, row) {}
  },
  computed: {
    priceFactor: function () {
      var priceFactorArray = []
      for (var i in this.tableHeader) {
        priceFactorArray.push(i)
      }
      return priceFactorArray
    },
    attributeCount () {
      return this.getAttributeCount(this.tableHeader)
    },
    tableHeader () {
      return _.pick(this.attrKv, this.theadKey)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
 

<style lang="less">
.hidden {
  display: none;
}
.hidden {
  display: none !important;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>