import * as moment from 'moment';

export interface IDay {
  value: moment.Moment
  active: boolean
  disabled: boolean
  selected: boolean
}

export interface IWeek {
  days: IDay[]
}
