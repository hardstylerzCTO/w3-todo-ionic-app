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
  constructor(private itemService: ItemService) {}


  ngOnInit(): void {
    this.itemService.getItems().subscribe(res => {
      this.items = res;
    });
  }

  deleteItem(item) {
    this.itemService.removeItem(item.id);
  }
}
