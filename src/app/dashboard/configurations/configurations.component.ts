import { Component, OnInit } from '@angular/core';
import { COMPANYID, CONFIG, CONFIG_OPTION } from 'src/constants';
import { Item } from 'src/models/item.model';
import { ItemService } from 'src/services/item.service';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss']
})
export class ConfigurationsComponent implements OnInit {
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;

  items: Item[];
  item: Item;
  message: string;
  heading: string;
  constructor(private itemService: ItemService
  ) { }

  ngOnInit() {
    this.getItems();
  }
  getItems() {
    this.itemService.getItems(COMPANYID, CONFIG, true).subscribe(data => {
      this.items = data;
    })
  }
  save() {
    if (this.item.CreateDate) {
      this.itemService.update(this.item).subscribe(data => {
        if (data && data.ItemId) {
          this.message = 'Item updated successfully.';
          this.getItems();
          this.closeAddExpenseModal.nativeElement.click();


        }
      })
    } else {
      this.itemService.add(this.item).subscribe(data => {
        if (data && data.ItemId) {
          // this.view(data);
          this.getItems();
          this.closeAddExpenseModal.nativeElement.click();


          this.message = 'Item created successfully.';
        }
      })
    }

  }

  onImageChangedEvent(url) {
    if (this.item) {
      this.item.ImageUrl = url;
    }
  }

  add(item: Item = null) {
    this.heading = `Add config`
    if (!item) {
      this.item = {
        ItemId: '',
        RelatedId: '',
        RelatedParentId: '',
        Name: '',
        ParentId: '',
        ItemType: CONFIG,
        CompanyId: COMPANYID,
        Description: '',
        OrderingNo: 1,
        Price: 0,
        ItemStatus: '',
        ItemCode: '',
        ImageUrl: '',
        ItemPin: '',
        ItemCategory: CONFIG,
        ItemSubCategory: '',
        CreateUserId: '',
        ModifyUserId: '',
        StatusId: 1
      }
      return;
    }

    if (item) {
      this.item = {
        ItemId: '',
        RelatedId: '',
        RelatedParentId: '',
        Name: '',
        ParentId: item.ItemId,
        ItemType: CONFIG_OPTION,
        CompanyId: COMPANYID,
        Description: '',
        OrderingNo: 1,
        Price: 0,
        ItemStatus: '',
        ItemCode: '',
        ImageUrl: '',
        ItemPin: '',
        ItemCategory: CONFIG_OPTION,
        ItemSubCategory: '',
        CreateUserId: '',
        ModifyUserId: '',
        StatusId: 1
      }
      return;
    }
  }

  view(item: Item) {
    this.heading = `Edit ${item.Name}`;
    this.item = item;
  }
}
