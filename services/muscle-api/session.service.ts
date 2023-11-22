import { BaseService } from './base.service'
import { environment } from '~/environments'

class SessionService extends BaseService {
  sessionUrl = environment.apiUrl + '/recap'
}
export const sessionService = new SessionService()
