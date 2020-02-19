import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Subscriber } from '../subscribe/subscriber.model'; 
import { environment } from '../../environments/environment';
import { DataService } from "../services/data.service";
import { Run } from '../subscribe/run.model'; 



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  subscriber : Subscriber;
  error: any;
  idRun: string;
  run: Run;



  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute, 
      private http: HttpClient ,
      private dataService: DataService
  ) { 

    this.idRun = this.route.snapshot.paramMap.get('id');


  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: ['', Validators.required],
        dateOfBirth: ['', [Validators.required,Validators.pattern('^[1-2]{1}[0-9]{3}$')]],
        email: ['', Validators.required],
        postalCode: ['', Validators.required],
        healthOk: ['', Validators.required],
        club: [''],
        challenge: [''],
      });

      this.dataService.currentRun.subscribe(run => this.run = run)

  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }



    console.log(this.registerForm);
    
    const body = new Subscriber(this.registerForm.value, this.idRun);


    
    this.http.post<Subscriber>(`${environment.apiUrl}/subscribers`, body).subscribe({
      next: data => this.subscriber = data,
      error: error => {this.error = error; console.error('There was an error!', error) }
   });


      // this.authenticationService.login(this.f.email.value, this.f.password.value)
      //     .pipe(first())
      //     .subscribe(
      //         data => {
      //             this.router.navigate([this.returnUrl]);
      //         },
      //         error => {
      //             this.error = error;
      //             this.loading = false;
      //         });
  }

}
