import { BaseService } from './base.service'
import { environment } from '~/environments'
import { Exercise } from '~/models'

class ExerciseService extends BaseService<Exercise> {
  url = environment.apiUrl + '/exercise'
}
export const exerciseService = new ExerciseService(Exercise)
