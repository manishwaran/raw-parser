import fs from 'fs';

export default class FileStreamHelper {

  static existsSync(filePath) {
    return fs.existsSync(filePath)
  }

  static openSync(filePath, mode) {
    if (!FileStreamHelper.existsSync(filePath)) {
      throw new Error('Unknown path')
    }
    return fs.openSync(filePath, mode)
  }

  static fileSize(filePath) {
    if (!FileStreamHelper.existsSync(filePath)) {
      throw new Error('Unknown path')
    }
    return fs.statSync(filePath).size
  }

  static readSync(fd, bytes = 1, decoding = 'utf8') {
    const buffer = new Buffer(bytes)
    const charsRead = fs.readSync(fd, buffer, 0, 1, null)
    return buffer.toString(decoding, 0, charsRead)
  }

  static closeSync(fd) {
    return fs.closeSync(fd)
  }

};
