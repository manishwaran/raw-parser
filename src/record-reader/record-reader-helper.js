export default class RecordReaderHelper {

  static removeSpace(string) {
    return string.replace(/ |\n|\t|\r/g, '')
  }

};
