import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Run } from '../subscribe/run.model'; 


@Injectable()
export class DataService {

  private subscriberSource = new BehaviorSubject<Run>(new Run);
  currentRun = this.subscriberSource.asObservable();

  constructor() { }

  saveRun(run: Run) {
    this.subscriberSource.next(run)
  }

}