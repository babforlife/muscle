export class Environment {
  production = true
  apiUrl = 'api-url'

  constructor(data: Partial<Environment>) {
    Object.assign(this, data)
  }
}
