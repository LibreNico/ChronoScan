import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Run } from '../subscribe/run.model'; 


@Injectable()
export class DataService {

  setCurrentRun(run: Run) {
    sessionStorage.setItem("run", JSON.stringify(run));
  }

  getCurrentRun():Run{
    return JSON.parse(sessionStorage.getItem("run")); 
  }

  clearCurrentRun(){
    sessionStorage.clear(); 
  }

}