import { BaseService } from './base.service'
import { Activity, Session } from '~/models'
import { environment } from '~/environments'

class ActivityService extends BaseService<Activity> {
  url = environment.apiUrl + '/activity'

  public async saveWithSession(session: Session) {
    const activity = new Activity({ start: session.start, session: session.finished, end: new Date(), name: session.name })
    return await this.save(activity)
  }
}
export const activityService = new ActivityService(Activity)
