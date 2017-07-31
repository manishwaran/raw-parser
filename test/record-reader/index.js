import { expect } from 'chai'
import FileRecordReader from '../../src/record-reader'

describe('File stream', () => {

  it('should return single character', (done) => {
    const onFormat = result => console.log(result);
    const fileRecordReader = new FileRecordReader({
      filePath: '/home/manish/Tools/Projects/raw-parser/test/resource/catalog.xml',
      mode: 'r',
      blockName: 'CD',
      output: {
        fields: {
          title: 'CD.TITLE',
          country: 'CD.COUNTRY'
        },
        onFormat
      }

    })
    const tree = fileRecordReader.moveToRecordBlock()
    done()
  })

})
