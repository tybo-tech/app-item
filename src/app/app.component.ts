import { Component } from '@angular/core';
import { ADMIN } from 'src/constants';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-item';
  user: User;
  ADMIN = ADMIN;
  constructor(private accountService: AccountService) {
    accountService.user.subscribe(data => {
      this.user = data;
      if (this.user && this.user.UserType === ADMIN) {

      }
      else {

      }
    })
  }

  
  logout() {
    this.accountService.logout();
  }
}
