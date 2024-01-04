export class Authentication {
  _id? = ''
  email? = ''
  password? = ''
  repeatPassword? = ''
  token? = ''

  constructor(field: Partial<Authentication> = {}) {
    Object.assign(this, field)
  }
}
