import { Component, Input, OnInit, HostBinding } from '@angular/core';
import { Event } from './event.model'; 
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css' ]
})
export class EventComponent implements OnInit {

  @HostBinding('attr.class') cssClass = 'card';
  @Input() event: Event;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  isOwner(userId: string){
    if(!this.authenticationService.currentUserValue) return false;
    return  this.authenticationService.currentUserValue._id === userId;
  }

}
