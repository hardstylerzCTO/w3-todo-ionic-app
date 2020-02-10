import {Component, OnInit} from '@angular/core';
import {Item, ItemService} from "../services/item.service";
import {ActivatedRoute} from "@angular/router";
import {LoadingController, NavController} from "@ionic/angular";

@Component({
    selector: 'app-add-item',
    templateUrl: './add-item.component.html',
    styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {

    item: Item[] = [
        {
            id: 'Kdsjhdasjdjasjd',
            name: 'first Item',
            priority: 'high'
        },
        {
            id: 'asisdiasdiaszid22323kjkajsdkas',
            name: 'second Item',
            priority: 'low'
        },

    ];

    itemId = null;
    choosenItem: Item;


    constructor(private todoService: ItemService, private route: ActivatedRoute,
                private loadingController: LoadingController, private nav: NavController) {
    }

    ngOnInit() {
        this.itemId = this.route.snapshot.params['id'];
        if (this.itemId) {
            this.loadItem();
        }
    }

    async loadItem() {
        const loading = await this.loadingController.create({
            message: 'loading...'
        });
        await loading.present();

        this.todoService.getItem(this.itemId).subscribe(data => {
            loading.dismiss();
            this.choosenItem = data;
        });
    }

    async saveItem() {

        const loading = await this.loadingController.create({
            message: 'Saving Item...'
        });
        await loading.present();

        if (this.itemId) {
            this.todoService.updateItem(this.choosenItem, this.itemId).then(() => {
                loading.dismiss();
                this.nav.back();
            })
        } else {
            this.todoService.addItem(this.choosenItem).then(() => {
                loading.dismiss();
                this.nav.back();
            });
        }
    }

    showItem(item) {
        console.log('test');
        console.log(item.id);

        this.item.forEach(data => {
            console.log(data.id);
            if (item.id === data.id) {
                this.choosenItem = data;
                console.log(this.choosenItem);
                return;
            }
        });

    }

}
