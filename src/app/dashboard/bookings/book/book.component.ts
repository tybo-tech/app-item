import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SERVICE, COMPANYID, CONFIG } from 'src/constants';
import { Item } from 'src/models/item.model';
import { User } from 'src/models/user.model';
import { AccountService } from 'src/services/account.service';
import { ItemService } from 'src/services/item.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  item: Item;
  message: string;
  itemId: string;
  user: User;
  heading: string;
  items: Item[];
  constructor(
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private router: Router,
  ) {

    this.activatedRoute.params.subscribe(r => {
      this.itemId = r.id;
      this.user = accountService.currentUserValue;
      if (this.itemId === 'add') {
        this.heading = `Adding a grade`

        this.item = {
          ItemId: '',
          RelatedId: '',
          RelatedParentId: '',
          Name: '',
          ParentId: '',
          ItemType: SERVICE,
          CompanyId: COMPANYID,
          Description: '',
          OrderingNo: 1,
          Price: 0,
          ItemStatus: '',
          ItemCode: '',
          ImageUrl: '',
          ItemPin: '',
          ItemCategory: SERVICE,
          ItemSubCategory: '',
          CreateUserId: '',
          ModifyUserId: '',
          StatusId: 1
        }
      } else {
        this.getItem();
      }

    });

  }

  ngOnInit() {


  }
  back(){
    this.router.navigate(['/'])
  }
  getItem() {
    this.itemService.getItem(this.itemId).subscribe(data => {
      if (data && data.ItemId) {
        this.item = data;
        this.getItems();
        this.heading = `Car details`
      }

    });
  }

  getItems() {
    this.itemService.getItems(COMPANYID, CONFIG, true).subscribe(data => {

      this.items = data || [];
      if (this.items && this.items.length) {
        this.item.Children.forEach(itemOption => {
          const parentItem = this.items.find(x => x.ItemId === itemOption.RelatedParentId);
          if (parentItem) {
            const childItem = parentItem.Children.find(x => x.ItemId === itemOption.RelatedId);
            if (childItem) {
              parentItem.SelectedItemId = childItem.ItemId;
            }
          }
        })
      }
    })
  }
  save() {

    if (this.item.CreateDate) {
      this.itemService.update(this.item).subscribe(data => {
        if (data && data.ItemId) {
          this.message = 'Item updated successfully.';
          this.saveOptions();

        }
      })
    } else {
      this.itemService.add(this.item).subscribe(data => {
        if (data && data.ItemId) {
          this.message = 'Item created successfully.';
          this.saveOptions();
        }
      })
    }

  }
  saveOptions() {
    const options = this.items.filter(x => x.SelectedItemId);
    console.log(options);

    const optionsToCreate = [];
    options.forEach(item => {

      const selectedChild = item.Children.find(x => x.ItemId === item.SelectedItemId);
      if (selectedChild) {
        selectedChild.ImageUrl = item.ImageUrl;
        selectedChild.ParentId = this.item.ItemId;
        selectedChild.RelatedParentId = item.ItemId;
        selectedChild.RelatedId = selectedChild.ItemId;
        optionsToCreate.push(selectedChild);
      }

    });
    console.log(options);
    if (options.length) {
      this.itemService.addRange(optionsToCreate).subscribe(data => {
        console.log(data);
        // this.getItem();

      })
    }

  }
  onImageChangedEvent(url) {
    if (this.item) {
      this.item.ImageUrl = url;
    }
  }


}
