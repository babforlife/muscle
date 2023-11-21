import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
import { sessions, exercises } from '~/mock'
import { exercisesService, sessionsService } from '~/services'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  if (process.env.NODE_ENV !== 'development' && !config.public.mock) return
  return setupWorker(...sessionsHandlers, ...exercisesHandlers).start()
})

const sessionsHandlers = [
  http.get(sessionsService.sessionsUrl, () => HttpResponse.json([...sessions]))
]

const exercisesHandlers = [
  http.get(exercisesService.exercisesUrl, () => HttpResponse.json([...exercises]))
]
