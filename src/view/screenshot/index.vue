<template>
  <div class="screenshot">
    <div ref="screenshotArea" class="screenshotArea">
      <div ref="playerVideo" class="prism-player" id="player-con"></div>
    </div>
    <button @click="btnClick()" style="margin-left: 5px">点击开始截图</button>
    <img class="img" :src="this.imgUrl" />
  </div>
</template>

<script>
import ScreenShort from 'js-web-screen-shot'
import Html2Canvas from 'html2canvas'

export default {
  name: 'screenshot',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      imgUrl: null,
      player: ''
    }
  },
  mounted(){
    console.log('Aliplayer',Aliplayer)
    this.player = new Aliplayer({
      "id": "player-con",
      "source": "https://qvs-live-hls.cpgroup.cn:447/2xenzw32d1rf9/31011500991180017202_34020000001310000006.m3u8",
      "width": "100%",
      "height": "100%",
      "autoplay": true,
      "isLive": true,
      "rePlay": false,
      "playsinline": true,
      "snapshot": true,
      "preload": true,
      // "setSanpshotProperties":{
      //   height:500,
      //   width:600
      // },
      "controlBarVisibility": "hover",
      "useH5Prism": true
    }, function (player) {
        console.log("The player is created");
    });
  },
  methods:{
    btnClick() {
      const screenshotArea = this.$refs.screenshotArea;
      // 更多参数 和使用可以看它包里面的README.md文件
       // 使用html2canvas进行截图
       console.log(screenshotArea);
       Html2Canvas(screenshotArea).then(canvas => {
              // 将截图生成的canvas转为DataURL
        const dataURL = canvas.toDataURL();
        // this.screenshotImage = dataURL;

        // // 创建一个新的Image元素，用于展示截图
        // const screenshotImage = new Image();
        // screenshotImage.src = dataURL;
        // 将截图添加到页面中，或者你可以进行其他操作，比如上传到服务器
        // document.body.appendChild(screenshotImage);
        const screenShotHandler = new ScreenShort({
          //  截图响应回调函数
          triggerCallback:() => {
            // plugin.completeScreenshot()
          },
          // 取消分享回到函数
          cancelCallback: ()=>{

          },
          // 保存截图会掉
          saveCallback: ()=>{
            console.log('保存截图++++++++++++++');
          },
          // 需要隐藏的截图工具栏图标-设置为true隐藏
          /*
            square 矩形绘制
            round 圆形绘制
            rightTop 箭头绘制
            brush 涂鸦
            mosaicPen马赛克工具
            text 文本工具
            separateLine 分割线
            save 下载图片
            undo 撤销工具
            confirm 保存图片
          */
          hiddenToolIco:{
            save:true,
            separateLine:true,
            mosaicPen:true,
            rightTop:true
          },
          //需要进行截图的容器,值为HTMLElement类型，默认使用的是body
          screenShotDom:screenshotArea,
          // 初始裁剪框，值为{ x: number; y: number; w: number; h: number }类型
          cropBoxInfo:{
            x:0,
            y:0,
            h:screenshotArea.offsetHeight,
            w:screenshotArea.offsetWidth
          },
          // 截图内容
          imgSrc:dataURL,
          //截图组件加载完毕后，是否显示截图内容至canvas画布内，值为boolean类型
          showScreenData:true,
          // 是否启用webrtc，值为boolean类型，值为false则使用html2canvas来截图
          enableWebRtc: false,
          //单击截全屏启用状态,值为boolean类型， 默认为false
          clickCutFullScreen:false,  
          // 截图容器位置，值为{left?: number, top?: number}类型
          // position:{left:0,top:0},
          // 层级级别，这个要比你页面上其他元素的z-index的值大，不然截不了
          level: 2001,
          loadCrossImg: true, // 跨域
          completeCallback: this.callback, // 截图成功完成的回调
          closeCallback: this.closeFn, // 截图取消的回调
        })
      });
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
      console.log('取消截图============');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.screenshotArea{
  height: 80vh;
  width: 100vw;
  /* background: url("../../assets/123123.jpeg") no-repeat; */
  background-size: 100% 100%;
}
.img{
  width: 100vw;
}
</style>
