
module.exports = {
  limitCheckBox: limitCheckBox
}

// 限制checkbox的数目
// checkedValues:e.detail.value
// optionValues:checkbox的初始值list
function limitCheckBox(checkedValues, optionValues, limit) {
  var num;
  if (checkedValues.length > limit) {
    num = limit;
  } else {
    num = checkedValues.length;
  }
  for (var i = 0; i < optionValues.length; i++) {
    optionValues[i].checked = false;
    for (var j = 0; j < num; j++) {
      if (checkedValues[j] == optionValues[i].value) {
        optionValues[i].checked = true;
      }
    }
  }
  return optionValues;
}