import { expect } from 'chai'
import FileRecordReader from '../../src/record-reader'

describe('File stream', () => {

  it('should return single character', (done) => {
    let recordRead = 0
    const onFormat = result => {
      console.log(result)
      ++recordRead
      return true
    }
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
    const tree = fileRecordReader.read()
    console.log('records read = ', recordRead);
    done()
  })

})
