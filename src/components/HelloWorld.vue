<template>
  <div class="hello">
    <button @click="btnClick()" style="margin-left: 5px">点击开始截图</button>
    <img :src="this.imgUrl" />
  </div>
</template>

<script>
import ScreenShort from 'js-web-screen-shot'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      imgUrl: null
    }
  },
  methods:{
    btnClick() {
 // 更多参数 和使用可以看它包里面的README.md文件
      const screenShotHandler = new ScreenShort({
        // 是否启用webrtc，值为boolean类型，值为false则使用html2canvas来截图
        enableWebRtc: false,
        // 层级级别，这个要比你页面上其他元素的z-index的值大，不然截不了
        level: 2001,
        completeCallback: this.callback, // 截图成功完成的回调
        closeCallback: this.closeFn // 截图取消的回调
      })
    },
  
   callback(base64data) {
      console.log('1111',base64data);
      var image = new Image()
      image.src = base64data;
      this.imgUrl = base64data.base64;
      // image.onload = () => {
      //   var canvas = this.convertImageToCanvas(image)
      //   var url = canvas.toDataURL('image/jpeg') // base64编码的图片
      //   // 通过atob将base64进行编码
      //   var bytes = window.atob(url.split(',')[1])
      //   // 处理异常，将ASCII码小于0的转换为大于0,进行二进制转换
      //   var buffer = new ArrayBuffer(bytes.length)
      //   // 生成一个8位数的数组
      //   var uint = new Uint8Array(buffer)
      //   for (var j = 0; j < bytes.length; j++) {
      //     uint[j] = bytes.charCodeAt(j)// 根据长度返回相对应的Unicode 编码
      //   }
      //   // Blob对象  // type 为图片的格式
      //   var imageFile = new Blob([buffer], { type: 'image/jpeg' })
      //   const formData = new FormData()
      //   // 上传的参数名是file，数据是该图片的blob对象，文件名是当前时间戳.jpeg；
      //   //如果不指定第三个参数文件名，那么默认文件名就是blob，没有后缀，后端的上传接口如果要截取文件名的话会出问题
      //   formData.append('file', imageFile, Date.now() + '.jpeg')
      //   // 我这儿是上传到某个地方了，上传地址是在data中定义的uploadRequestUrl
      //   axios.post(this.uploadRequestUrl, formData, {
      //     'Content-type' : 'multipart/form-data'
      //   }).then((res) => {
      //     // 上传成功的处理
      //   }).catch(e => {
      //     errorMsg('截图上传失败')
      //   })
      // }
    },
    convertImageToCanvas(image) {
      var canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      canvas.getContext('2d').drawImage(image, 0, 0)
      return canvas
    },
    closeFn() {
      // 取消截图的回调
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
