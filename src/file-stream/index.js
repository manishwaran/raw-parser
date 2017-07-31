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

  readBetween(start, end) {
    this.readBefore(start)
    return this.readBefore(end)
  }

  trimedRead(func, ...params) {
    return func(...params).trim()
  }

};
