import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service'
import { AccountService } from './services/account.service'
import { SearchService } from './services/search.service'
import { SharedService } from './services/shared.service'
import { PagerService } from './services/pager.service'
import { ArticleService } from './services/article.service'
import { AppConfig } from './app.config'


@Component({
  selector: 'ss-app',
  template: `<div>
                <ss-navbar></ss-navbar>
                <router-outlet></router-outlet>
              </div>`,
  providers: [AuthenticationService, AccountService, AppConfig, SearchService, SharedService, PagerService, ArticleService]
})

export class AppComponent {
  name = 'ShareSci';
}
