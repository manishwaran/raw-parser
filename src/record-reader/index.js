import FileStream from '../file-stream';
import RecordReaderHelper from './record-reader-helper';

export default class RecordReader {

  constructor(props) {
    this.fileStream = new FileStream(props)
    this.recordBlockName = props.blockName
  }

  moveToRecordBlock() {
    while(this.fileStream.trimedRead(this.fileStream.readBetween, '<', '>') !== this.blockName);
    const tree = { [this.blockName]: {} }
    this.formDOMTree(tree[this.blockName], this.blockName)
  }

  formDOMTree(tree, parentBlockName) {
    let blockName = this.fileStream.trimedRead(this.fileStream.readBetween, '<', '>')
    blockName = RecordReaderHelper.removeSpace(blockName)
    if (blockName !== `/${parentBlockName}`) {

    }
  }

};
