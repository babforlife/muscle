import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
import { programs, exercises, pectoraux } from '~/mock'
import { exerciseService, programService } from '~/services'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  if (process.env.NODE_ENV !== 'development' || !config.public.mock) return
  return setupWorker(...programsHandlers, ...exercisesHandlers).start({
    onUnhandledRequest(request, print) {
      const excludedRequests = ['/favicon.ico', '/_nuxt/']
      if (excludedRequests.some(exc => request.url.includes(exc))) return
      print.warning()
    }
  })
})

const programsHandlers = [
  http.get(programService.programsUrl, () => HttpResponse.json([...programs])),
  http.get(`${programService.programsUrl}/1`, () => HttpResponse.json(pectoraux)),
  http.get(`${programService.programsUrl}/2`, () => HttpResponse.json(dos)),
  http.get(`${programService.programsUrl}/*`, () => HttpResponse.json(pectoraux))
]

const exercisesHandlers = [
  http.get(exerciseService.exercisesUrl, () => HttpResponse.json([...exercises]))
]
