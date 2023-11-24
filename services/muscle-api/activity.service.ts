import { BaseService } from './base.service'
import { Activity, Session } from '~/models'
import { environment } from '~/environments'

class ActivityService extends BaseService {
  url = environment.apiUrl + '/activity'

  public async getAll(): Promise<Activity[]> {
    const response = await fetch(`${this.url}`, { method: 'GET' })
    const data = await this.manageResponse(response)
    return data.map((activity: any) => new Activity(activity))
  }

  public async get(id: string): Promise<Activity> {
    const response = await fetch(`${this.url}/${id}`, { method: 'GET' })
    const data = await this.manageResponse(response)
    return new Activity(data)
  }

  public async save(session: Session) {
    const activity = new Activity({ start: session.start, session: session.finished })
    const response = await fetch(`${this.url}`, { method: 'POST', body: JSON.stringify(activity) })
    return await this.manageResponse(response)
  }
}
export const activityService = new ActivityService()
