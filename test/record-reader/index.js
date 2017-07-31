import { expect } from 'chai'
import FileRecordReader from '../../src/record-reader'

describe('File stream', () => {

  it('should return single character', (done) => {
    const fileRecordReader = new FileRecordReader({
      filePath: '/home/indix/Tools/Projects/raw-parser/test/resource/catalog.xml',
      mode: 'r',
      blockName: 'CD'
    })
    const tree = fileRecordReader.moveToRecordBlock()
    // expect(char).to.be.equal('<')
    console.log(JSON.stringify(tree, undefined, 2));
    done()
  })

})