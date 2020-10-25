// Component/choice.js
Component({
  properties: {
    content: Object,
    basic:Boolean,
    basicPersonalInfo:Object
  },
  data: {

  },
  methods: {
    //不定项选择题
    tapOption:function(e){
      var index = e.currentTarget.dataset.index
      //判断选项状态
      if(this.data.content.options[index].res == false){
        var newTotal  = this.data.content.total +1
        this.setData({
          [`content.options[${index}].res`]:true,
          [`content.total`]:newTotal
        })
      } else{
        var newTotal  = this.data.content.total -1
        this.setData({
          [`content.options[${index}].res`]:false,
          [`content.total`]:newTotal
        })
      }
      if(this.data.content.total >= this.data.content.min && this.data.content.total <= this.data.content.max){
        this.setData({
          [`content.fit`]:true
        })
      } else{
        this.setData({
          [`content.fit`]:false
        })
      }
      var valueTemp =[]
      for(var i=0; i<this.data.content.options.length;i++){
        if(this.data.content.options[i].res){
          valueTemp.push(this.data.content.options[i].text)
        }
      }
      this.setData({
        [`content.value`]:valueTemp
      })
      
      this.triggerEvent('ComponentTap',this.data.content)
    },
    //列表选择
    PickerChange:function(e){
      var result = this.data.content.options[e.detail.value]
      this.setData({
        [`content.value`]:result
      })
      this.triggerEvent('ComponentTap',this.data.content)
    },
    //填空题
    inputResult:function(e){
      this.setData({
        [`content.value`]:e.detail.value
      })
      this.triggerEvent('ComponentTap',this.data.content)
    }
  }
})
