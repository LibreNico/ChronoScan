import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EventComponent } from './event/event.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { EventListComponent } from './event-list/event-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './services/authentication.service';

import { ErrorInterceptor } from './interceptors/error.interceptor';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { FilterSubscriberPipe } from './subscribe/filterSubscriber.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CsvloadComponent } from './csvload/csvload.component';
import { FeaturesComponent } from './features/features.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { DataService } from "./services/data.service";


@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    SubscribeComponent,
    EventListComponent,
    LoginComponent,
    FilterSubscriberPipe,
    CsvloadComponent,
    FeaturesComponent,
    AboutComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [AuthenticationService,DataService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
