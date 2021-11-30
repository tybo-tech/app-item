import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ADMIN, COMPANYID, SERVICE,CUSTOMER } from 'src/constants';
import { Item } from 'src/models/item.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { ItemService } from 'src/services/item.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CarsComponent implements OnInit {

  items: Item[];
  ADMIN = ADMIN;
  CUSTOMER = CUSTOMER;
  user: User

  constructor(private itemService: ItemService,
    private accountService: AccountService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.accountService.user.subscribe(data => {
      this.user = data;
    })
    this.itemService.getItems(COMPANYID, SERVICE).subscribe(data => {
      this.items = data;
    })
  }
  add() {
    this.router.navigate([`/cars/add`])
  }
  view(item: Item) {
    this.router.navigate([`/cars/${item.ItemId}`]);
  }
  book(item: Item) {
    this.router.navigate([`/book/${item.ItemId}`]);
  }
}
