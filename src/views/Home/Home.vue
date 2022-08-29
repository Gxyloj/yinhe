<template>
  <div id="home">
    <el-upload
        action
        accept='.xls,.xlsx'
        :auto-upload='false'
        :on-change='inputFile'
        :show-file-list='false'
    >
      <el-button type="primary">Primary</el-button>
    </el-upload>
    <el-table :data="tableList"
              style="width: 50%"
              show-summary
              :summary-method="getSummaries"
              stripe
              border>
      <el-table-column prop="CustomerCode" label="客户编码"></el-table-column>
      <el-table-column prop="CustomerName" label="客户名称"></el-table-column>
      <el-table-column prop="PaymentDate" label="收款单日期"></el-table-column>
      <el-table-column prop="SaleOrderCode" label="销售订单号"></el-table-column>
      <el-table-column prop="PaymentAmount" label="销售金额"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import formatDate, {changeCnToEn, readFile} from "@/utils/fileUpload";
import moment from "moment/moment";
import * as xlsx from "xlsx";
export default {
  name: "Home",
  data(){
    return {
      inputFileName:'',
      tableList:[]
    }
  },
  methods:{
    async  inputFile(e){
      console.log(e)
      this.inputFileName = e.name
      let file = e.raw
      if(!file) return
      console.log(file)
      // 读取file文件的内容(转换为json格式)
      let data = await readFile(file)
      // console.log(data) //解析出的二进制文件
      // type :'binary' 类型为二进制
      let eleData = xlsx.read(data,{type:"binary",cellDates:false})
      console.log(eleData)
      let eleDataSheet = eleData.Sheets[eleData.SheetNames[0]]
      eleData = xlsx.utils.sheet_to_json(eleDataSheet,{range:1}) // 将解析出的数据转换为json格式（xlsx自带的方法）
      // eleData = eleData.length >1? eleData[1] : eleData[0]
      console.log(eleData)
      const arr =[]
      // console.log(Object.keys(changeCnToEn))
      eleData.forEach(item =>{
        const userInfo = {}
        //  console.log(Object.keys(item))
        Object.keys(item).forEach(key => {
          userInfo[changeCnToEn[key]] = item[key]
        })
        // userInfo.PaymentDate = moment(userInfo.PaymentDate).format()
        userInfo.PaymentDate = formatDate(userInfo.PaymentDate,'-')
        userInfo.PaymentAmount = userInfo.PaymentAmount.toFixed(2)
        // if (userInfo.PaymentDate === 'NaN-NaN-NaN') userInfo.PaymentDate = '合计'
        // console.log(userInfo)
        arr.push(userInfo)
      })
      arr.pop()
      this.tableList = arr

      console.log(arr)
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] = sums[index].toFixed(2);
        } else {
          sums[index] = ' ';
        }
      });

      return sums;
    }
  }
}
</script>

<style scoped lang="scss">
#home{
  padding: 10px;
}
</style>
