import { BaseService } from './base.service'
import { environment } from '~/environments'
import { Exercise, SeriesExercise } from '~/models'

class ExerciseService extends BaseService {
  url = environment.apiUrl + '/exercise'

  public async save(exercise: Exercise) {
    const response = await fetch(`${this.url}`, { method: 'POST', body: JSON.stringify(exercise) })
    return await this.manageResponse(response)
  }

  public async get(id: string): Promise<Exercise> {
    const response = await fetch(`${this.url}/${id}`, { method: 'GET' })
    const data = await this.manageResponse(response)
    return new Exercise(data)
  }

  public async getActivities(id: string): Promise<SeriesExercise[]> {
    const response = await fetch(`${this.url}/${id}/activities`, { method: 'GET' })
    const data = await this.manageResponse(response)
    return data.map((activity: any) => new SeriesExercise(activity))
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
