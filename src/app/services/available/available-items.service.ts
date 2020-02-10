import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators'
import actions from "@angular/fire/schematics/deploy/actions";



export interface AvailableItem {
  name: string,
  priority: string
}

@Injectable({
  providedIn: 'root'
})

export class AvailableItemsService {

  private availableItemsCollection: AngularFirestoreCollection<AvailableItem>;
  private availableItems: Observable<AvailableItem[]>;

  constructor(db: AngularFirestore) {
    this.availableItemsCollection = db.collection<AvailableItem>('availableItems');

    this.availableItems = this.availableItemsCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data};
          });
        })
    );
  }

  getAvailableItems() {
    return this.availableItems;
  }

  addAvailableItems(availableItem: AvailableItem) {
    return this.availableItemsCollection.add(availableItem);
  }
}
