import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscriber } from './subscriber.model';
import { Run } from './run.model';
import { environment } from '../../environments/environment';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DataService } from "../services/data.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../services/authentication.service';


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
  currentSubscriber: Subscriber;
  
  constructor(private route: ActivatedRoute
    , private http: HttpClient
    , private dataService: DataService,
    private modalService: NgbModal,
    private authenticationService: AuthenticationService) {
    this.idRun = this.route.snapshot.paramMap.get('id');


  }

  ngOnInit() {

    this.http.get<Run>(`${environment.apiUrl}/events/${this.idRun}`).subscribe(data => {
      this.run = data;
      this.dataService.saveRun(this.run);
    });



  }

  getIcon(active: boolean): any {
    return active ? faCheck : faTimes;
  }


  open(content, subscribe) {
    this.currentSubscriber = subscribe;
    this.modalService
    .open(content, { ariaLabelledBy: 'modal-basic-title'});
    return false;
  }

  isOwner(userId: string){
    if(!this.authenticationService.currentUserValue) return false;
    return  this.authenticationService.currentUserValue._id === userId;
  }


}
