import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ICreateResponse, ITask} from './types';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as moment from 'moment';

@Injectable({providedIn: 'root'})
export class TasksService {
  static url = 'https://angular-practice-organizer.firebaseio.com/tasks'

  constructor(private http: HttpClient) {}

  load(date: moment.Moment): Observable<ITask[]> {
    return this.http
      .get<ITask[]>(`${TasksService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(
        map(tasks => {
          if(!tasks) {
            return []
          }
          return Object.keys(tasks).map(key => ({...tasks[key], id: key}))
        })
      )
  }

  create(task: ITask): Observable<ITask> {
    return this.http
      .post<ICreateResponse>(`${TasksService.url}/${task.date}.json`, task)
      .pipe(
        map(res => {
          return {...task, id: res.name}
        })
      )
  }

  remove(task: ITask): Observable<void> {
    return this.http
      .delete<void>(`${TasksService.url}/${task.date}/${task.id}.json`)
  }
}
