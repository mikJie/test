import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Screenshot from '@/view/screenshot'
import Recorder from '@/view/recorder'
import PictureRecording from '@/view/pictureRecording'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    /*
      截图标注
    */
    {
      path: '/screenshot',
      name: 'screenshot',
      component: Screenshot
    },
    /*
      录音功能
    */
    {
      path: '/recorder',
      name: 'recorder',
      component: Recorder
    },
    /*
      录像功能
    */
    {
      path: '/pictureRecording',
      name: 'pictureRecording',
      component: PictureRecording
    }
  ]
})
