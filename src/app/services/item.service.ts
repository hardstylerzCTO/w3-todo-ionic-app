import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators'
import actions from "@angular/fire/schematics/deploy/actions";


export interface Item {
  name: string,
  priority: string
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private itemsCollection: AngularFirestoreCollection<Item>;
  private items: Observable<Item[]>;

  constructor(db: AngularFirestore) {
    this.itemsCollection = db.collection<Item>('items');

    this.items = this.itemsCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data};
          });
        })
    );
  }

  getItems() {
    return this.items;
  }

  getItem(id) {
    return this.itemsCollection.doc<Item>(id).valueChanges();
  }

  updateItem(item: Item, id: string) {
    return this.itemsCollection.doc(id).update(item);
  }

  addItem(item: Item) {
    return this.itemsCollection.add(item);
  }

  removeItem(id) {
    this.itemsCollection.doc(id).delete();
  }
}
