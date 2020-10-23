const formatDetailTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function assertNotNull(value){
  // String    
  if (value === null || value === undefined || value == "" || String(value).trim().length==0){
    return false;
  }

  return true;
}

module.exports = {
  formatDetailTime: formatDetailTime,
  formatTime:formatTime,
  assertNotNull:assertNotNull
}
