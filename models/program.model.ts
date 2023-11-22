import { Exercise } from './exercise.model'

export class Program {
  _id = ''
  color = 0
  name = ''
  exercises: Exercise[] = []

  constructor(field: Partial<Program> = {}) {
    Object.assign(this, field)
    if (field.exercises) this.exercises = field.exercises.map(exercise => new Exercise(exercise))
  }
}
