import { localStorageService } from '../local-storage-service.service'

interface ApiService<T> {
  url: string
  getAll(): Promise<T[]>
  get(id: string): Promise<T>
  delete(id: string): Promise<void>
  post(data: T): Promise<T>
}

const headers = () => ({ Authorization: `Bearer ${localStorageService.getItem('accessToken')}` })

export abstract class BaseService<T> implements ApiService<T> {
  url = ''
  // eslint-disable-next-line no-useless-constructor
  constructor(private Model: new (data: any) => T) {}

  public async getAll(url?: string): Promise<T[]> {
    const response = await fetch(url ?? this.url, { method: 'GET', headers: headers() })
    const data = await this.manageResponse(response)
    return data.map((item: any) => new this.Model(item))
  }

  public async get(id: string, url?: string): Promise<T> {
    const response = await fetch(url ?? `${this.url}/${id}`, { method: 'GET', headers: headers() })
    const data = await this.manageResponse(response)
    return new this.Model(data)
  }

  public async post(data: T, url?: string) {
    const response = await fetch(url ?? `${this.url}`, { method: 'POST', body: JSON.stringify(data), headers: headers() })
    return await this.manageResponse(response)
  }

  public async delete(id: string) {
    const response = await fetch(`${this.url}/${id}`, { method: 'DELETE', headers: headers() })
    return await this.manageResponse(response)
  }

  protected async manageResponse(response: Response) {
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const data = await response.json()
    if (data.errorMessage) throw new Error(`Data error message :' ${data.errorMessage}`)
    return data
  }
}
