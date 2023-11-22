import { developpeCouche, developpeIncline, dips, ecarteCouche, rowingBarre, rowingHaltere, souleveDeTerre, tractions } from '.'

export const pectoraux = {
  _id: '1',
  name: 'Pectoraux',
  exercises: [developpeCouche, developpeIncline, dips, ecarteCouche]
}

export const dos = {
  _id: '2',
  name: 'Dos',
  color: 0.5,
  exercises: [tractions, rowingHaltere, rowingBarre, souleveDeTerre]
}

export const programs = [pectoraux, dos]
