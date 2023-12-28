import { BaseService } from './base.service'
import { User } from '~/models'
import { environment } from '~/environments'
import { localStorageService } from '~/services'

class UsersService extends BaseService<User> {
  url = environment.apiUrl + '/users'

  public async login(email: string, password: string) {
    const response = await fetch(`${this.url}/login`, { method: 'POST', body: JSON.stringify({ email, password }) })
    const data = await this.manageResponse(response)
    localStorageService.setItem('accessToken', data.token)
    return data
  }
}

export const usersService = new UsersService(User)
