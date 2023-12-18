import { BaseService } from './base.service'
import { SeriesExercise } from '~/models'
import { environment } from '~/environments'

class SeriesExerciseService extends BaseService<SeriesExercise> {
  url = environment.apiUrl + '/exercise'

  public async getFromExercise(id: string): Promise<SeriesExercise[]> {
    return await this.getAll(`${this.url}/${id}/activities`)
  }
}
export const seriesExerciseService = new SeriesExerciseService(SeriesExercise)
