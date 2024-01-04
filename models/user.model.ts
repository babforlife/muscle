export class User {
  _id? = ''
  email = ''
  password = ''
  repeatPassword?: string

  constructor(field: Partial<User> = {}) {
    Object.assign(this, field)
  }
}
