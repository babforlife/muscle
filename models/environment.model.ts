export class Environment {
  production = true
  apiUrl = 'https://muscle-api.onrender.com'

  constructor(data: Partial<Environment>) {
    Object.assign(this, data)
  }
}
