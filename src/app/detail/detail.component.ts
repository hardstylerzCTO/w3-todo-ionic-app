import { Component, OnInit } from '@angular/core';
import {Item, ItemService} from "../services/item.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  public choosedItem;

  constructor(private itemService: ItemService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.choosedItem = this.route.snapshot.data['item'];

    console.log('after request:');
    console.log(this.choosedItem);


  }

}
