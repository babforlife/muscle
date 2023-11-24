import { developpeArnold, developpeCouche, developpeIncline, developpeMilitaire, dips, elevationsLaterales, oiseau, rowingMenton, shrugs } from './exercises'
import { Activity, Series, SeriesExercise } from '~/models'

const developpeCoucheActivity = new SeriesExercise({
  exercise: developpeCouche,
  series: [
    new Series({ repetitions: 8, weight: 40 }),
    new Series({ repetitions: 7, weight: 41 }),
    new Series({ repetitions: 6, weight: 42 }),
    new Series({ repetitions: 5, weight: 43 }),
    new Series({ repetitions: 4, weight: 44 })
  ]
})

const developpeInclineActivity = new SeriesExercise({
  exercise: developpeIncline,
  series: [
    new Series({ repetitions: 8, weight: 18 }),
    new Series({ repetitions: 8, weight: 18 }),
    new Series({ repetitions: 8, weight: 18 }),
    new Series({ repetitions: 8, weight: 18 }),
    new Series({ repetitions: 8, weight: 18 })
  ]
})

const dipsActivity = new SeriesExercise({
  exercise: dips,
  series: [
    new Series({ repetitions: 8, weight: 0 }),
    new Series({ repetitions: 8, weight: 0 }),
    new Series({ repetitions: 8, weight: 0 }),
    new Series({ repetitions: 8, weight: 0 }),
    new Series({ repetitions: 12, weight: 0 })
  ]
})

const developeArnoldActivity = new SeriesExercise({
  exercise: developpeArnold,
  series: [
    new Series({ repetitions: 8, weight: 13 }),
    new Series({ repetitions: 8, weight: 13 }),
    new Series({ repetitions: 8, weight: 13 }),
    new Series({ repetitions: 8, weight: 13 }),
    new Series({ repetitions: 8, weight: 13 })
  ]
})

const elevationsLateralesActivity = new SeriesExercise({
  exercise: elevationsLaterales,
  series: [
    new Series({ repetitions: 8, weight: 8 }),
    new Series({ repetitions: 8, weight: 8 }),
    new Series({ repetitions: 8, weight: 8 }),
    new Series({ repetitions: 8, weight: 8 }),
    new Series({ repetitions: 8, weight: 8 }),
    new Series({ repetitions: 8, weight: 9 })
  ]
})

const developpeMilitaireActivity = new SeriesExercise({
  exercise: developpeMilitaire,
  series: [
    new Series({ repetitions: 8, weight: 13 }),
    new Series({ repetitions: 8, weight: 13 }),
    new Series({ repetitions: 8, weight: 13 }),
    new Series({ repetitions: 8, weight: 13 }),
    new Series({ repetitions: 8, weight: 13 }),
    new Series({ repetitions: 8, weight: 13 })
  ]
})

const oiseauActivity = new SeriesExercise({
  exercise: oiseau,
  series: [
    new Series({ repetitions: 8, weight: 8 }),
    new Series({ repetitions: 8, weight: 8 }),
    new Series({ repetitions: 8, weight: 8 }),
    new Series({ repetitions: 8, weight: 8 }),
    new Series({ repetitions: 8, weight: 8 })
  ]
})

const rowingMentonActivity = new SeriesExercise({
  exercise: rowingMenton,
  series: [
    new Series({ repetitions: 8, weight: 25 }),
    new Series({ repetitions: 8, weight: 25 }),
    new Series({ repetitions: 9, weight: 25 }),
    new Series({ repetitions: 8, weight: 25 }),
    new Series({ repetitions: 9, weight: 25 })
  ]
})

const shrugsActivity = new SeriesExercise({
  exercise: shrugs,
  series: [
    new Series({ repetitions: 9, weight: 45 }),
    new Series({ repetitions: 8, weight: 45 }),
    new Series({ repetitions: 8, weight: 45 }),
    new Series({ repetitions: 10, weight: 45 }),
    new Series({ repetitions: 8, weight: 45 })
  ]
})

export const pecsAct = new Activity({
  _id: '1',
  name: 'Pectoraux',
  start: new Date('2023-11-20T17:30:00'),
  session: [developpeCoucheActivity, developpeInclineActivity, dipsActivity]
})

export const epaulesAct = new Activity({
  _id: '2',
  name: 'Épaules',
  start: new Date('2023-11-21T17:45:00'),
  session: [developeArnoldActivity, elevationsLateralesActivity, developpeMilitaireActivity, oiseauActivity, rowingMentonActivity, shrugsActivity]
})

export const dosAct = new Activity({
  _id: '3',
  name: 'Dos',
  start: new Date('2023-11-22T18:00:00'),
  session: [developpeCoucheActivity]
})

export const activities = [pecsAct, epaulesAct, dosAct]
