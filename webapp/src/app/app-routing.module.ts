import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { EventListComponent } from './event-list/event-list.component';
import { LoginComponent } from './login/login.component';
import { CsvloadComponent } from './csvload/csvload.component';
import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';


const routes: Routes = [
  { path: '', component: EventListComponent },
  { path: 'run/:id', component: SubscribeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'bankload/:id', component: CsvloadComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
