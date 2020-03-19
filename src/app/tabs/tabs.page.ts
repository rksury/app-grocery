import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private router: Router) {}

  category() {
    this.router.navigate(['tabs/category']);
  }
  offer() {
    this.router.navigate(['tabs/offer']);
  }
  cart() {
    this.router.navigate(['tabs/cart']);
  }
  profile() {
    this.router.navigate(['tabs/profile']);
  }
  login() {
    this.router.navigate(['tabs/login']);
  }
  signup() {
    this.router.navigate(['tabs/signup']);
  }

}
