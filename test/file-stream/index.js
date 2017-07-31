import { expect } from 'chai'
import FileStream from '../../src/file-stream'

describe('File stream', () => {

  it('should return single character', (done) => {
    const fileStream = new FileStream({
      filePath: '/home/indix/Tools/Projects/raw-parser/test/resource/catalog.xml',
      mode: 'r',
    })
    const char = fileStream.read()
    expect(char).to.be.equal('<')
    done()
  })

  it('should return characters between specified characters', (done) => {
    const fileStream = new FileStream({
      filePath: '/home/indix/Tools/Projects/raw-parser/test/resource/catalog.xml',
      mode: 'r',
    })
    const chars = fileStream.readBetween('<', '>')
    expect(chars).to.be.equal('CATALOG')
    done()
  })

  it('should return characters before specified characters', (done) => {
    const fileStream = new FileStream({
      filePath: '/home/indix/Tools/Projects/raw-parser/test/resource/catalog.xml',
      mode: 'r',
    })
    const chars = fileStream.readBefore('>')
    expect(chars).to.be.equal('<CATALOG')
    done()
  })

})