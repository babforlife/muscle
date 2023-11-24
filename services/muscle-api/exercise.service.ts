import { BaseService } from './base.service'
import { environment } from '~/environments'
import { Exercise } from '~/models'

class ExerciseService extends BaseService {
  url = environment.apiUrl + '/exercise'

  public async save(exercise: Exercise) {
    const response = await fetch(`${this.url}`, { method: 'POST', body: JSON.stringify(exercise) })
    return await this.manageResponse(response)
  }

  public async getAll(): Promise<Exercise[]> {
    const response = await fetch(`${this.url}`, { method: 'GET' })
    const data = await this.manageResponse(response)
    return data.map((exercise: any) => new Exercise(exercise))
  }

  public async delete(exercise: Exercise) {
    const response = await fetch(`${this.url}/${exercise._id}`, { method: 'DELETE', body: JSON.stringify(exercise) })
    return await this.manageResponse(response)
  }
}
export const exerciseService = new ExerciseService()
