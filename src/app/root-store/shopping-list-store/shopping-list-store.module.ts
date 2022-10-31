import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import * as fromShoppingList from './reducers/shopping-list.reducer';
@NgModule({
  imports:[
    StoreModule.forFeature(fromShoppingList.shoppingListFeatureKey, fromShoppingList.shoppingListReducer)
  ]
})
export class ShoppingListStoreModule{
}