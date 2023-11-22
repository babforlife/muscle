import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
import { sessions, exercises, pectoraux } from '~/mock'
import { exercisesService, sessionsService } from '~/services'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  if (process.env.NODE_ENV !== 'development' || !config.public.mock) return
  return setupWorker(...sessionsHandlers, ...exercisesHandlers).start({
    onUnhandledRequest(request, print) {
      const excludedRequests = ['/favicon.ico', '/_nuxt/']
      if (excludedRequests.some(exc => request.url.includes(exc))) return
      print.warning()
    }
  })
})

const sessionsHandlers = [
  http.get(sessionsService.sessionsUrl, () => HttpResponse.json([...sessions])),
  http.get(`${sessionsService.sessionsUrl}/1`, () => HttpResponse.json(pectoraux)),
  http.get(`${sessionsService.sessionsUrl}/2`, () => HttpResponse.json(dos)),
  http.get(`${sessionsService.sessionsUrl}/*`, () => HttpResponse.json(pectoraux))
]

const exercisesHandlers = [
  http.get(exercisesService.exercisesUrl, () => HttpResponse.json([...exercises]))
]
