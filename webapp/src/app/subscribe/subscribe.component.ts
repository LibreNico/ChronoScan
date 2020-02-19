import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscriber } from './subscriber.model'; 
import { Run } from './run.model'; 
import { environment } from '../../environments/environment';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DataService } from "../services/data.service";


@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {
  idRun: string;
  closeResult: string;
  faCheck = faCheck;
  faTimes = faTimes;

  run: Run;

  searchText: string;

  constructor(private route: ActivatedRoute
    , private http: HttpClient
    ,private dataService: DataService) {
    this.idRun = this.route.snapshot.paramMap.get('id');
 
    
  }

  ngOnInit() {
    
    this.http.get<Run>(`${environment.apiUrl}/events/${this.idRun}`).subscribe(data => 
      {
        this.run = data; 
        this.dataService.saveRun(this.run);
      });

      

  }

getIcon(active: boolean):any{
    return active?faCheck:faTimes;
  }

}
