import { SeriesExercise } from '~/models'

export class Activity {
  _id = ''
  color = 0
  name = ''
  start: Date
  end: Date
  session: SeriesExercise[] = []

  constructor(field: Partial<Activity> = {}) {
    Object.assign(this, field)
    if (field.session) this.session = field.session.map(exercise => new SeriesExercise(exercise))
    this.start = new Date(field.start ?? 0)
    this.end = new Date(field.end ?? 0)
  }
}
