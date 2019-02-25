import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  public timeLength = '45'
  public remainLength = 0
  public controlIcon = 'play_arrow'
  public controlDisabled = true
  public hasRecorded = false
  public isRecording = false
  public isPlaying = false
  public snackbar = false
  public errorMsg = ''

  private timer: NodeJS.Timeout
  private stream = undefined
  private mediaRecorder: any
  private audio: HTMLAudioElement
  private audioUrl: string

  public startRecord() {
    if (!this.stream) {
      this.snackbar = true
      return
    }

    this.isRecording = true

    // Set up audio recorder
    try {
    this.mediaRecorder = new MediaRecorder(this.stream, { mimeType: 'audio/webm' })
    } catch {
      this.errorMsg = 'Your browser does NOT support MediaRecorder'
      this.snackbar = true
    }
    const audioChunks = []
    this.mediaRecorder.addEventListener('dataavailable', (event) => {
      audioChunks.push(event.data)
    })
    this.mediaRecorder.addEventListener('stop', () => {
      this.audioUrl = URL.createObjectURL(new Blob(audioChunks, { type: 'audio/webm' }))
      this.audio = new Audio(this.audioUrl)
      this.audio.addEventListener('ended', () => {
        this.stopPlay()
      })
    })

    // Start countdown timer
    this.mediaRecorder.start()
    this.remainLength = Number(this.timeLength)
    this.timer = setInterval(() => {
      this.remainLength--
      if (this.remainLength <= 0) {
        this.stopRecord()
      }
    }, 1000)
    this.controlDisabled = false
    this.controlIcon = 'stop'
  }

  public stopRecord() {
    clearInterval(this.timer)
    this.mediaRecorder.stop()
    this.isRecording = false
    this.controlIcon = 'play_arrow'
    this.hasRecorded = true
  }

  public control() {
    if (this.isRecording) {
      this.stopRecord()
    } else if (this.isPlaying) {
      this.stopPlay()
    } else {
      this.isPlaying = true
      this.audio.play()
      this.controlIcon = 'stop'
    }
  }

  public stopPlay() {
    this.audio.pause()
    this.audio.currentTime = 0
    this.isPlaying = false
    this.controlIcon = 'play_arrow'
  }

  public download() {
    const link = document.createElement('a')
    link.download = 'recorded.webm'
    link.href = this.audioUrl
    link.click()
    link.remove()
  }

  public async created() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch {
      this.errorMsg = 'Cannot get user\'s microphone'
      this.snackbar = true
    }
  }
}
