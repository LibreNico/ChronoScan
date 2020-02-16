import { Component, OnInit } from '@angular/core';
import { Event } from '../event/event.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Event[];

  constructor(private http: HttpClient) { 
  }

  ngOnInit() {
    this.http.get<Event[]>(`${environment.apiUrl}/events`).subscribe(data => 
      {console.log(data); this.events = data});
  }

}
