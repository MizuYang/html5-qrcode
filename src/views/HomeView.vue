<template>
  <div class="home">
    <div class="mb-2">
      掃描結果
      <button type="button" class="btn btn-primary" @click="getCameras">扫码</button>
      ====
      <button type="button" class="btn btn-primary" @click="stop">取消扫码</button>
    </div>
    <pre>decodedText: {{ decodedText }}</pre> <br />
    <pre>decodedResult: {{ decodedResult }}</pre> <br />
  </div>
  <hr/>
  <div style="height: 100%; width: 100%">
    <div class="qrcode">
      <div id="reader"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Html5Qrcode } from 'html5-qrcode'

let html5QrCode = null
const decodedText = ref('')
const decodedResult = ref('')

const start = () => {
  html5QrCode.start(
    // environment后置摄像头 user前置摄像头
    { facingMode: 'environment' },
    {
      fps: 2, // 可选，每秒帧扫描二维码
      qrbox: { width: 250, height: 250 } // 可选，如果你想要有界框UI
      // aspectRatio: 1.777778 // 可选，视频馈送需要的纵横比，(4:3--1.333334, 16:9--1.777778, 1:1--1.0)传递错误的纵横比会导致视频不显示
    },
    (decodedText, decodedResult) => {
      // do something when code is read
      console.log('decodedText', decodedText)
      console.log('decodedResult', decodedResult)
      decodedText.vlaue = decodedText
      decodedResult.vlaue = decodedResult
      // this.$emit("goBack", decodedText)
    }
  )
    .catch((err) => {
      console.log('扫码错误信息', err)
      // 错误信息处理仅供参考，具体情况看输出！！！
      if (typeof err === 'string') {
        // this.$toast(err)
      } else {
        // if (err.name == 'NotAllowedError') return this.$toast("您需要授予相机访问权限")
        // if (err.name == 'NotFoundError') return this.$toast('这个设备上没有摄像头')
        // if (err.name == 'NotSupportedError') return this.$toast('摄像头访问只支持在安全的上下文中，如https或localhost')
        // if (err.name == 'NotReadableError') return this.$toast('相机被占用')
        // if (err.name == 'OverconstrainedError') return this.$toast('安装摄像头不合适')
        // if (err.name == 'StreamApiNotSupportedError') return this.$toast('此浏览器不支持流API')
      }
    })
}

const getCameras = () => {
  Html5Qrcode.getCameras()
    .then((devices) => {
      if (devices && devices.length) {
        html5QrCode = new Html5Qrcode('reader')
        start()
      }
    })
    .catch(() => {
      // handle err
      html5QrCode = new Html5Qrcode('reader')
      // this.$toast('您需要授予相机访问权限')
    })
}

const stop = () => {
  html5QrCode.stop().then((ignore) => {
    // QR Code scanning is stopped.
    console.log('QR Code scanning stopped.')
  })
    .catch(() => {
      // Stop failed, handle it.
      console.log('Unable to stop scanning.')
    })
}
</script>
