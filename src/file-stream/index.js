import FileStreamHelper from './stream-helper';

export default class FileStream {

  constructor(props) {
    this.fileMode = props.mode
    this.filePath = props.filePath
    this.fileEncoding = props.fileEncoding || 'utf8'
    this.init()
  }

  init() {
    this.fileSize = FileStreamHelper.fileSize(this.filePath)
    this.fd = FileStreamHelper.openSync(this.filePath, this.fileMode)
    this.charRead = 0
  }

  read() {
    this.charRead += 1
    return this.charRead <= this.fileSize
      ? FileStreamHelper.readSync(this.fd, 1, this.fileEncoding)
      : null
  }

  readBetween(start, end) {
    const buffer = []
    let startFlag = false
    while(true) {
      const char = this.read()
      if (!startFlag && char === start) {
        startFlag = true
      } else if(startFlag && char === end) {
        break
      } else {
        buffer.push(char)
      }
    }
    return buffer.join('')
  }

  readBefore(beforeChar) {
    const buffer = []
    let beforeCharFlag = false
    while (true) {
      const char = this.read()
      if (char === beforeChar) {
        break
      }
      buffer.push(char)
    }
    return buffer.join('')
  }

};
