import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  public timeLength = '45'
  public remainLength = 0
  public controlIcon = 'play_arrow'
  public controlDisabled = true
  public hasRecorded = false
  public isRecording = false

  private timer: NodeJS.Timeout

  public startRecord() {
    this.isRecording = true
    // Set microphone
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
    this.isRecording = false
    this.controlIcon = 'play_arrow'
    this.hasRecorded = true
  }

  public control() {
    if (this.isRecording) {
      this.stopRecord()
    }
  }
}
