import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
import { programs, exercises, pectoraux, activities, pecsAct, dosAct, epaulesAct } from '~/mock'
import { exerciseService, programService, activityService } from '~/services'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  if (process.env.NODE_ENV !== 'development' || !config.public.mock) return
  return setupWorker(...programsHandlers, ...exercisesHandlers, ...activitiesHandlers).start({
    onUnhandledRequest(request, print) {
      const excludedRequests = ['/favicon.ico', '/_nuxt/']
      if (excludedRequests.some(exc => request.url.includes(exc))) return
      print.warning()
    }
  })
})

const programsHandlers = [
  http.get(programService.url, () => HttpResponse.json([...programs])),
  http.get(`${programService.url}/1`, () => HttpResponse.json(pectoraux)),
  http.get(`${programService.url}/2`, () => HttpResponse.json(dos)),
  http.get(`${programService.url}/*`, () => HttpResponse.json(pectoraux))
]

const exercisesHandlers = [
  http.get(exerciseService.url, () => HttpResponse.json([...exercises]))
]

const activitiesHandlers = [
  http.get(activityService.url, () => HttpResponse.json([...activities])),
  http.get(`${activityService.url}/1`, () => HttpResponse.json(pecsAct)),
  http.get(`${activityService.url}/2`, () => HttpResponse.json(epaulesAct)),
  http.get(`${activityService.url}/3`, () => HttpResponse.json(dosAct)),
  http.get(`${activityService.url}/*`, () => HttpResponse.json(pecsAct))
]
