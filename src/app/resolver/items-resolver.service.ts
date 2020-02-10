import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AvailableItemsService} from "../services/available/available-items.service";
import {Item, ItemService} from "../services/item.service";

@Injectable({
  providedIn: 'root'
})
export class ItemsResolverService implements Resolve<any> {

  constructor(private itemService: ItemService) { }

  resolve (route: ActivatedRouteSnapshot) {
    const itemId = route.paramMap.get('id');

    return this.itemService.getItem(itemId).subscribe(data => {
      return data;
    })
  }
}
