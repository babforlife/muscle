import { localStorageService } from '../local-storage-service.service'
import { authenticationService } from './authentication.service'

interface ApiService<T> {
  url: string
  getAll(): Promise<T[]>
  get(id: string): Promise<T>
  delete(id: string): Promise<void>
  post(data: T): Promise<T>
}

export abstract class BaseService<T> implements ApiService<T> {
  url = ''
  authorizationHeaders = true

  // eslint-disable-next-line no-useless-constructor
  constructor(private Model: new (data: any) => T) {}

  public async getAll(endpoint = ''): Promise<T[]> {
    const response = await fetch(this.url + endpoint, { method: 'GET', headers: this.generateHeaders() })
    const data = await this.manageResponse(response)
    return data.map((item: any) => new this.Model(item))
  }

  public async get(id: string, endpoint = ''): Promise<T> {
    const response = await fetch(`${this.url}${endpoint}/${id}`, { method: 'GET', headers: this.generateHeaders() })
    const data = await this.manageResponse(response)
    return new this.Model(data)
  }

  public async post(data: T, endpoint = '') {
    const response = await fetch(this.url + endpoint, { method: 'POST', body: JSON.stringify(data), headers: this.generateHeaders() })
    return await this.manageResponse(response)
  }

  public async delete(id: string) {
    const response = await fetch(`${this.url}/${id}`, { method: 'DELETE', headers: this.generateHeaders() })
    return await this.manageResponse(response)
  }

  protected generateHeaders() {
    const headers: HeadersInit = { 'Content-Type': 'application/json' }
    if (this.authorizationHeaders) headers.Authorization = `Bearer ${localStorageService.getItem('accessToken')}`
    return headers
  }

  protected async manageResponse(response: Response) {
    const data = await response.json()
    if (response.status === 401) {
      if (this.authorizationHeaders) await this.handleUnauthorized()
      throw new Error(data.errorMessage)
    }
    return data
  }

  protected async handleUnauthorized() {
    return await authenticationService.verify().catch(() => authenticationService.logout())
  }
}
