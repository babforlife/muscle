import { Exercise } from './exercise.model'

export class Series {
  repetitions = 0
  weight = 0

  constructor(field: Partial<Series> = {}) {
    Object.assign(this, field)
  }
}

export class RunningExercise {
  exercise = new Exercise()
  series: Series[] = []

  constructor(field: Partial<RunningExercise> = {}) {
    Object.assign(this, field)
    if (field.series) this.series = field.series.map(series => new Series(series))
  }
}

export class RunningSession {
  active = new RunningExercise()
  finished: RunningExercise[] = []
  remaining: Exercise[] = []
  start = new Date()

  constructor(field: Partial<RunningSession> = {}) {
    Object.assign(this, field)
    if (field.finished) this.finished = field.finished.map(exercise => new RunningExercise(exercise))
    if (field.remaining) this.remaining = field.remaining.map(exercise => new Exercise(exercise))
  }

  next() {
    if (this.active.exercise._id) this.finished.push(this.active)
    this.active = new RunningExercise(this.remaining.length === 0 ? {} : { exercise: this.remaining.shift() })
  }
}
