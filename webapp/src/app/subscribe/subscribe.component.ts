import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Subscriber } from './subscriber.model'; 
import { Run } from './run.model'; 
import { environment } from '../../environments/environment';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';


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
  subscriber : Subscriber;
  error: any;

  constructor(private route: ActivatedRoute, private modalService: NgbModal, private http: HttpClient) {
    this.idRun = this.route.snapshot.paramMap.get('id');
 
    
  }

  ngOnInit() {
    
    this.http.get<Run>(`${environment.apiUrl}/events/${this.idRun}`).subscribe(data => 
      {
        this.run = data; 
        console.log(data);
      });

  }

  saveClose(modal: NgbActiveModal,form: any): void {
    console.log('you submitted value:', form);
    
    const body = new Subscriber(form, this.run.event);
    console.log(body);
    
    this.http.post<Subscriber>(`${environment.apiUrl}/subscribers`, body).subscribe({
      next: data => this.subscriber = data,
      error: error => {this.error = error; console.error('There was an error!', error) }
   });

    modal.close();
  }

  open(content) {
    this.modalService
    .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' });
    return false;
  }

  closeSuccess(){
    this.subscriber = null;
  }


  closeError(){
    this.error= null;
  }

getIcon(active: boolean):any{
    return active?faCheck:faTimes;
  }

}
