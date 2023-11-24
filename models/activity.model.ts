import { SeriesExercise } from '~/models'

export class Activity {
  _id?: string
  name: string
  start: Date
  session: SeriesExercise[]

  constructor(field: Partial<Activity> = {}) {
    Object.assign(this, field)
    if (field.session) this.session = field.session.map(exercise => new SeriesExercise(exercise))
    this.start = new Date(field.start ?? 0)
  }
}
