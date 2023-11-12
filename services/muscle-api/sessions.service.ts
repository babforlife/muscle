import { environment } from '~/environments'
import { Session } from '~/models'

class SessionsService {
  sessionsUrl = environment.apiUrl + '/session'

  public async save(session: Session) {
    console.log(session)
    const response = await fetch(`${this.sessionsUrl}`, { method: 'POST', body: JSON.stringify(session) })
    return await this.manageResponse(response)
  }

  public async get(id: string): Promise<Session> {
    const response = await fetch(`${this.sessionsUrl}/${id}`, { method: 'GET' })
    const data = await this.manageResponse(response)
    return new Session(data)
  }

  public async getAll(): Promise<Session[]> {
    const response = await fetch(`${this.sessionsUrl}`, { method: 'GET' })
    const data = await this.manageResponse(response)
    return data.map((session: any) => new Session(session))
  }

  public async delete(session: Session) {
    const response = await fetch(`${this.sessionsUrl}/${session._id}`, { method: 'DELETE', body: JSON.stringify(session) })
    return await this.manageResponse(response)
  }

  private async manageResponse(response: any) {
    const data = await response.json()
    if (data.errorMessage) throw new Error(data.errorMessage)
    return data
  }
}
export const sessionsService = new SessionsService()
