import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from './services/authentication.service';
import { User } from './services/user.model';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

const supportedLanguage = new Set(['fr', 'nl', 'en']);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;
  languageIcon = faGlobe;
  navbarCollapsed: any;



  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private translate: TranslateService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    const currentLanguage = this.translate.getBrowserLang();
    if (supportedLanguage.has(currentLanguage)) {
      translate.setDefaultLang(currentLanguage);
      translate.use(currentLanguage);
    } else {
      translate.setDefaultLang('fr');
      translate.use('fr');
    }
  }


  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  isLanguageActive(currentLanguage: String){
    return this.translate.currentLang==currentLanguage?'active':'';
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

}
