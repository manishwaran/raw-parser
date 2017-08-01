import { expect } from 'chai'
import FileRecordReader from '../../src/record-reader'

describe('File stream', () => {

  it('should return single character', (done) => {
    let recordRead = 0
    const onFormat = result => {
      console.log(JSON.stringify(result, undefined, 2))
      ++recordRead
      return recordRead < 5
    }
    const fileRecordReader = new FileRecordReader({
      filePath: '/home/indix/Downloads/raw-parser-input.xml',
      mode: 'r',
      blockName: 'item_data',
      output: {
        onFormat
      }

    })
    try {
      const tree = fileRecordReader.read()
    } catch (error) {
      console.log(error);
    }
    console.log('records read = ', recordRead);
    done()
  })

})
