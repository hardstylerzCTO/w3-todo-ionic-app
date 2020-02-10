import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {DetailComponent} from "./detail/detail.component";
import {AddItemComponent} from "./add-item/add-item.component";
import {ItemsResolverService} from "./resolver/items-resolver.service";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'details/:id',
    resolve: {
      item: ItemsResolverService
    },
    component: DetailComponent,
  },
  {
    path: 'details',
    component: AddItemComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
