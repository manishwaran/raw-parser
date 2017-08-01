import FileStreamHelper from './stream-helper';

export default class FileStream {

  constructor(props) {
    this.fileMode = props.mode
    this.filePath = props.filePath
    this.fileEncoding = props.fileEncoding || 'utf8'
    this.init()
    this.read =this.read.bind(this)
    this.readBefore = this.readBefore.bind(this)
    this.trimedRead = this.trimedRead.bind(this)
    this.readBetween = this.readBetween.bind(this)
  }

  init() {
    this.fileSize = FileStreamHelper.fileSize(this.filePath) * 8
    this.fd = FileStreamHelper.openSync(this.filePath, this.fileMode)
    this.charRead = 0
  }

  read() {
    this.charRead += 1
    if (this.charRead >= this.fileSize) {
      this.fileEndReached = true
      return null
    }
    return FileStreamHelper.readSync(this.fd, 1, this.fileEncoding)
  }

  readBefore(beforeChar) {
    const buffer = []
    let beforeCharFlag = false
    while (true) {
      const char = this.read()
      if (char === null) return null
      if (char === beforeChar) {
        break
      }
      buffer.push(char)
    }
    return buffer.join('')
  }

  readBetween(start, end) {
    return this.readBefore(start) ? this.readBefore(end) : null
  }

  trimedRead(func, ...params) {
    const string = func(...params)
    return string ? string.trim() : null
  }

};
