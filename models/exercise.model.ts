export class Exercise {
  _id = ''
  name = ''

  constructor(field: Partial<Exercise> = {}) {
    Object.assign(this, field)
  }
}
