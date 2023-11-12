import { environment } from '~/environments'
import { Exercise } from '~/models'

class ExercisesService {
  exercisesUrl = environment.apiUrl + '/exercise'

  public async save(exercise: Exercise) {
    const response = await fetch(`${this.exercisesUrl}`, { method: 'POST', body: JSON.stringify(exercise) })
    return await this.manageResponse(response)
  }

  public async getAll(): Promise<Exercise[]> {
    const response = await fetch(`${this.exercisesUrl}`, { method: 'GET' })
    const data = await this.manageResponse(response)
    return data.map((exercise: any) => new Exercise(exercise))
  }

  public async delete(exercise: Exercise) {
    const response = await fetch(`${this.exercisesUrl}/${exercise._id}`, { method: 'DELETE', body: JSON.stringify(exercise) })
    return await this.manageResponse(response)
  }

  private async manageResponse(response: any) {
    const data = await response.json()
    if (data.errorMessage) throw new Error(data.errorMessage)
    return data
  }
}
export const exercisesService = new ExercisesService()
