import { NgModule } from "@angular/core";
import * as fromState from '.';
import { StoreModule } from "@ngrx/store";

import { ShoppingListStoreModule } from "./shopping-list-store/shopping-list-store.module";

@NgModule({
  imports:[
    ShoppingListStoreModule,
    StoreModule.forRoot(fromState.shoppingListReducer, {metaReducers:fromState.metaReducers})
  ]
})
export class RootStoreModule {
}