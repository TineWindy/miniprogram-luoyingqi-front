// Component/choice.js
Component({
  properties: {
    content: Object
  },
  data: {

  },
  methods: {
    //不定项选择题
    tapOption: function (e) {
      var index = e.currentTarget.dataset.index;

      //判断选项状态
      if (this.data.content.questionOptions[index].res == false) {
        // 需要判断是否可以继续选择
        if (this.data.content.questionTotal == this.data.content.questionOptionsMaxLimit) {
          return;
        }
        var newTotal = this.data.content.questionTotal + 1
        this.setData({
          [`content.questionOptions[${index}].res`]: true,
          [`content.questionTotal`]: newTotal
        })
      } else {
        var newTotal = this.data.content.questionTotal - 1
        this.setData({
          [`content.questionOptions[${index}].res`]: false,
          [`content.questionTotal`]: newTotal
        })
      }
      var valueTemp = []    //输出value结果
      for (var i = 0; i < this.data.content.questionOptions.length; i++) {
        if (this.data.content.questionOptions[i].res) {
          valueTemp.push(this.data.content.questionOptions[i].text)
        }
      }
      this.setData({
        [`content.questionValue`]: valueTemp
      })

      this.triggerEvent('ComponentTap', this.data.content)
    },

    //列表选择
    PickerChange: function (e) {
      var result = this.data.content.questionOptions[e.detail.value]
      this.setData({
        [`content.questionValue`]: result
      })
      this.triggerEvent('ComponentTap', this.data.content)
    },

    //填空题
    inputResult: function (e) {
      this.setData({
        [`content.questionValue`]: e.detail.value
      })
      this.triggerEvent('ComponentTap', this.data.content)
    }
  }
})
