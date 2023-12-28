export class User {
  _id? = ''
  email = ''
  password = ''

  constructor(field: Partial<User> = {}) {
    Object.assign(this, field)
  }
}
