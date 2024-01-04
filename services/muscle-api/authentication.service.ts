import { BaseService } from './base.service'
import { Authentication } from '~/models'
import { environment } from '~/environments'
import { localStorageService } from '~/services'

class AuthenticationService extends BaseService<Authentication> {
  url = environment.apiUrl + '/authentication'
  authorizationHeaders = false

  public async register(email: string, password: string, repeatPassword: string) {
    const data = await this.post({ email, password, repeatPassword }, '/register')
    localStorageService.setItem('accessToken', data.token)
    return data
  }

  public async login(email: string, password: string) {
    const data = await this.post({ email, password }, '/login')
    localStorageService.setItem('accessToken', data.token)
    return data
  }

  public logout() {
    localStorageService.removeItem('accessToken')
    window.location.href = '/login'
  }

  public async verify() {
    const token = localStorageService.getItem('accessToken')
    if (!token) throw new Error('no token to verify')
    return await this.post({ token }, '/verify')
  }
}

export const authenticationService = new AuthenticationService(Authentication)
