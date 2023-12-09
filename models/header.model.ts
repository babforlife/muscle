export class Header {
  edit = false
  hidden = false
  navigation = false
  search = false
  title = ''

  constructor(fields: Partial<Header> = {}) {
    Object.assign(this, fields)
  }
}
