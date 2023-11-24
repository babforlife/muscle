import { BaseService } from '~/services'
import { environment } from '~/environments'
import { Program } from '~/models'

class ProgramService extends BaseService {
  url = environment.apiUrl + '/program'

  public async save(program: Program) {
    const response = await fetch(`${this.url}`, { method: 'POST', body: JSON.stringify(program) })
    return await this.manageResponse(response)
  }

  public async get(id: string): Promise<Program> {
    const response = await fetch(`${this.url}/${id}`, { method: 'GET' })
    const data = await this.manageResponse(response)
    return new Program(data)
  }

  public async getAll(): Promise<Program[]> {
    const response = await fetch(`${this.url}`, { method: 'GET' })
    const data = await this.manageResponse(response)
    return data.map((program: any) => new Program(program))
  }

  public async delete(program: Program) {
    const response = await fetch(`${this.url}/${program._id}`, { method: 'DELETE', body: JSON.stringify(program) })
    return await this.manageResponse(response)
  }
}
export const programService = new ProgramService()
