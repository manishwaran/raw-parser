import FileStream from '../file-stream';
import OutputFormatter from '../output-formatter';
import RecordReaderHelper from './record-reader-helper';

export default class RecordReader {

  constructor(props) {
    this.fileStream = new FileStream(props)
    this.recordBlockName = props.blockName
    RecordReader.output = props.output
  }

  moveToRecordBlock() {
    while(this.fileStream.trimedRead(this.fileStream.readBetween, '<', '>') !== this.recordBlockName);
    const tree = {}
    this.formDOMTree(tree, this.recordBlockName)
    return new OutputFormatter(RecordReader.output).process()
  }

  formDOMTree(tree, currentBlock) {
    tree[currentBlock] = tree[currentBlock] || {}
    const data = this.fileStream.trimedRead(this.fileStream.readBefore, '<')
    if (data) {
      tree[currentBlock] = data
    }
    while (1) {
      let nextBlock = RecordReaderHelper.removeSpace(this.fileStream.readBefore('>'))
      if (nextBlock === `/${currentBlock}`) return
      this.formDOMTree(tree[currentBlock], nextBlock)
      this.fileStream.readBefore('<')
    }
  }

};
