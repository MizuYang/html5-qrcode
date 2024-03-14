<script setup>
import { ref, onMounted } from 'vue'
// 可以自定義開啟相機的class
import { Html5Qrcode } from 'html5-qrcode'

// qrCode實體
const html5QrCode = ref(null)
const searchProductName = ref('')

onMounted(() => {
  console.log('Html5Qrcode', Html5Qrcode)

  html5QrCode.value = new Html5Qrcode('barcode-reader')

  console.log('html5QrCode', html5QrCode)
})

// 初始化要在 onMounted 中 （要在virtual dom render之後才抓得到 dom）
onMounted(() => {
})

// 掃描成功後會得到 decodedText
const qrCodeSuccessCallback = (decodedText) => {
  // 傳入 searchProductName 去做後續處理
  searchProductName.value = decodedText
  // 停止相機
  handleStop()
}

// 啟動相機  開啟掃描功能
// 傳入 qrCodeSuccessCallback 掃描成功後要做的事
const start = (qrCodeSuccessCallback) => {
  // 相機brcode顯示設定
  const brConfig = { fps: 10, qrbox: { width: 300, height: 150 } }

  // 套件啟動相機function
  html5QrCode.value.start(
    // 使用預設前或後鏡頭 （environment 為使用預設）
    { facingMode: 'environment' },
    // 相機brcode顯示設定
    brConfig,
    // 掃描成功後的 Callback
    qrCodeSuccessCallback
    // Error的 Callback
    // qrCodeErrorCallback
  )
}
// // 關閉相機
const handleStop = () => {
  try {
    // 套件關閉相機function
    html5QrCode.value
      .stop()
      .then(() => {
        // 清除
        html5QrCode.value.clear()
      })
      .catch((error) => {
        console.log('danger', error.message)
      })
  } catch (error) {
    console.log('danger', error)
  }
}
// 啟動相機
const scanBarcode = () => {
  start(qrCodeSuccessCallback)
  // html5QrCode.value.start(qrCodeSuccessCallback)
}
// 停止相機
// const handleStop = () => {
//   html5QrCode.value.handleStop()
// }

</script>

<template>
  <button type='button'
          class='btn btn-primary'
          @click="scanBarcode">
    開啟相機權限
  </button>

  <!-- barcode 相機初始化 -->
  <div id="barcode-reader" class="component-barcode-reader"></div>

  "{{ searchProductName }}"
</template>

<style lang='scss' scope></style>
