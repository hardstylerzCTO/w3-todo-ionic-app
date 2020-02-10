import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {Item, ItemService} from "../services/item.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  public items: Item[];
  // public listItems;
  constructor(private itemService: ItemService) {}


  ngOnInit(): void {
    // this.listItems = [
    //   {title: 'hi1', description: 'test1'},
    //   {title: 'hi2', description: 'test2'},
    //   {title: 'hi3', description: 'test3'}
    // ];
    // console.log(this.listItems);

    this.itemService.getItems().subscribe(res => {
      this.items = res;
      console.log('my items:');
      console.log(this.items);
    });

  }




  deleteItem(item) {
    console.log(item);
    this.itemService.removeItem(item.id);

  }

  viewItem(item) {
    console.log(item);
  }
}
