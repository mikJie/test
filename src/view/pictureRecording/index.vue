<template>
  <div>
    <video class="video" ref="videoElement" autoplay></video>
    <button class="button" @click="()=>{
      isBefourVideo = !isBefourVideo
      rollCamera()
      }">
      {{ isBefourVideo ? "前置" : "后置" }}
    </button>
    <button class="button" @click="toggleCamera">
      {{ cameraActive ? "关闭摄像头" : "打开摄像头" }}
    </button>
    <button class="button" @click="takeSnapshot">截图</button>
    <button class="button" @click="toggleRecording">
      {{ recording ? "停止录制" : "开始录制" }}
    </button>
    <button class="button" @click="downloadImage">下载图片</button>
    <button class="button" @click="downloadVideo">下载视频</button>

    <canvas ref="canvasElement"></canvas>
    <img :src="snapshotUrl" v-if="snapshotUrl" alt="截图预览" />
    <video
      :src="recordedVideoUrl"
      v-if="recordedVideoUrl"
      autoplay
      controls
    ></video>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isBefourVideo: true,
      cameraActive: false,
      recording: false,
      snapshotUrl: "",
      recordedVideoUrl: "",
      stream: null,
      videoElement: null,
      canvasElement: null,
      mediaRecorder: null,
      chunks: [],

      rotate: {
        x: 0,
        y: 0,
      },
    };
  },
  mounted() {
    this.videoElement = this.$refs.videoElement;
    this.canvasElement = this.$refs.canvasElement;
  },
  methods: {
    rollCamera() {
      this.cameraActive = false;
      this.videoElement.srcObject = null;
      this.stream.getTracks().forEach((track) => {
        track.stop();
      });
      this.toggleCamera();
    },
    toggleCamera() {
      console.log('----',this.cameraActive)
      if (!this.cameraActive) {
        let params = this.isBefourVideo ? {
          video: true
        } : {
          audio: true,
            video: { facingMode: { exact: "environment" } }
        }
        navigator.mediaDevices
          .getUserMedia(params)
          .then((stream) => {
            this.stream = stream;
            this.videoElement.srcObject = stream;
            this.cameraActive = true;
          })
          .catch((error) => {
            console.error("无法打开摄像头:", error);
          });
      } else {
        this.videoElement.srcObject = null;
        this.stream.getTracks().forEach((track) => {
          track.stop();
        });
        this.cameraActive = false;
      }
    },
    takeSnapshot() {
      const context = this.canvasElement.getContext("2d");
      context.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      this.snapshotUrl = this.canvasElement.toDataURL();
    },
    toggleRecording() {
      if (!this.recording) {
        this.startRecording();
      } else {
        this.stopRecording();
      }
    },
    startRecording() {
      if (MediaRecorder.isTypeSupported("video/webm")) {
        this.chunks = [];
        this.mediaRecorder = new MediaRecorder(this.stream, {
          mimeType: "video/webm",
        });
        this.mediaRecorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            this.chunks.push(e.data);
          }
        };
        this.mediaRecorder.onstop = () => {
          const recordedBlob = new Blob(this.chunks, { type: "video/webm" });
          this.chunks = [];
          this.recordedVideoUrl = URL.createObjectURL(recordedBlob);
        };
        this.mediaRecorder.start();
        this.recording = true;
      } else {
        console.error("不支持录制视频");
      }
    },
    stopRecording() {
      if (this.recording) {
        this.mediaRecorder.stop();
        this.mediaRecorder = null;
        this.recording = false;
      }
    },
    downloadImage() {
      if (this.snapshotUrl) {
        const a = document.createElement("a");
        a.href = this.snapshotUrl;
        a.download = "snapshot.png";
        a.click();
      }
    },
    downloadVideo() {
      if (this.recordedVideoUrl) {
        const a = document.createElement("a");
        a.href = this.recordedVideoUrl;
        a.download = "recorded_video.webm";
        a.click();
      }
    },
  },
};
</script>


