import FileStream from '../file-stream';
import RecordReaderHelper from './record-reader-helper';

export default class RecordReader {

  constructor(props) {
    this.fileStream = new FileStream(props)
    this.recordBlockName = props.blockName
  }

  moveToRecordBlock() {
    while(this.fileStream.trimedRead(this.fileStream.readBetween, '<', '>') !== this.recordBlockName);
    const tree = { [this.recordBlockName]: {} }
    this.formDOMTree(tree, this.recordBlockName)
    return tree
  }

  formDOMTree(tree, parentBlockName) {
    const data = this.fileStream.trimedRead(this.fileStream.readBefore, '<')
    if (data) {
      tree[parentBlockName] = data
      return
    }
    while (1) {
      let blockName = this.fileStream.trimedRead(this.fileStream.readBefore,'>')
      blockName = RecordReaderHelper.removeSpace(blockName)
      console.log(blockName, parentBlockName);
      if (blockName === `/${parentBlockName}`) {
        console.log(parentBlockName, blockName);
        return
      }
      tree[blockName] = {}
      this.formDOMTree(tree[parentBlockName], blockName)
    }
  }

};
