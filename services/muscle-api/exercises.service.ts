import { environment } from '~/environments'
import { Exercise } from '~/models'

class ExercisesService {
  exercisesUrl = environment.apiUrl + '/exercise'

  public async save(exercise: Exercise) {
    const response = await fetch(`${this.exercisesUrl}`, { method: 'POST', body: JSON.stringify(exercise) })
    return await this.manageResponse(response)
  }

  public async getAll() {
    const response = await fetch(`${this.exercisesUrl}`, { method: 'GET' })
    return await this.manageResponse(response)
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
