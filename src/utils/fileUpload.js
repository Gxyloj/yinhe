export const readFile = file =>{
  return new Promise(resolve => {
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = ev =>{
      resolve(ev.target.result)
    }
  })
}

export const changeCnToEn = {
  '客户编码':'CustomerCode',
  '客户名称':'CustomerName',
  '收款单日期':'PaymentDate',
  '销售订单号':'SaleOrderCode',
  '收款金额':'PaymentAmount',
  '合计':'TotalAmount'
}


export default function formatDate(numb, format) {
  const time = new Date((numb - 1) * 24 * 3600000 + 1)
  time.setYear(time.getFullYear() - 70)
  const year = time.getFullYear() + ''
  const month = time.getMonth() + 1 + ''
  const date = time.getDate() - 1 + ''
  if (format && format.length === 1) {
    return year + format + month + format + date
  }
  return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
}
