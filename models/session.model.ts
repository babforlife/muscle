import { Exercise } from './exercise.model'

export class Series {
  repetitions = 0
  weight = 0

  constructor(field: Partial<Series> = {}) {
    Object.assign(this, field)
  }
}

export class SeriesExercise {
  _id?: string
  exercise = new Exercise()
  series: Series[] = []

  constructor(field: Partial<SeriesExercise> = {}) {
    Object.assign(this, field)
    if (field.series) this.series = field.series.map(series => new Series(series))
  }
}

export class Session {
  active = new SeriesExercise()
  finished: SeriesExercise[] = []
  name = ''
  remaining: Exercise[] = []
  start = new Date()

  constructor(field: Partial<Session> = {}) {
    Object.assign(this, field)
    if (field.finished) this.finished = field.finished.map(exercise => new SeriesExercise(exercise))
    if (field.remaining) this.remaining = field.remaining.map(exercise => new Exercise(exercise))
  }

  next() {
    if (this.active.exercise._id) this.finished.push(this.active)
    this.active = new SeriesExercise(this.remaining.length === 0 ? {} : { exercise: this.remaining.shift() })
  }

  get total() {
    return this.finished?.length + this.remaining?.length + (this.active?.exercise._id ? 1 : 0)
  }
}
