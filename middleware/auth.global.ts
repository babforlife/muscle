import { localStorageService } from '~/services'

export default defineNuxtRouteMiddleware((to, _from) => {
  if (process.server) return
  const publicRoutes = ['/login', '/signup']
  if (publicRoutes.some(route => to.path.includes(route))) return
  if (!localStorageService.getItem('accessToken')) return navigateTo('/login')
})
