import { Component, OnInit } from '@angular/core';
import {Item, ItemService} from "../services/item.service";
import {ActivatedRoute} from "@angular/router";
import {LoadingController, NavController} from "@ionic/angular";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {

  item: Item = {
    name: 'first Item',
    priority: 'high'
  };

  itemId = null;


  constructor(private todoService: ItemService, private route: ActivatedRoute,
              private loadingController: LoadingController, private nav: NavController) { }

  ngOnInit() {
    this.itemId = this.route.snapshot.params['id'];
    if (this.itemId) {
      this.loadItem();
    }
  }

   async loadItem() {
    const loading  = await this.loadingController.create({
      content: 'loading...'
    });
    await loading.present();

    this.todoService.getItem(this.itemId).subscribe(data => {
      loading.dismiss();
      this.item = data;
    });
  }

  async saveItem() {

    const loading  = await this.loadingController.create({
      content: 'Saving Item...'
    });
    await loading.present();

    if (this.itemId) {
      this.todoService.updateItem(this.item, this.itemId).then(() => {
        loading.dismiss();
        this.nav.back();
      })
    } else {
      this.todoService.addItem(this.item).then(() => {
        loading.dismiss();
        this.nav.back();
      });
    }
  }

  showItem(item) {
    console.log(item);
  }

}
