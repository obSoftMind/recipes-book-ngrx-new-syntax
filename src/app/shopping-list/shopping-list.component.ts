import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/Ingredient.model';
import { Store} from '@ngrx/store';
import * as fromShoppingList from '../root-store/index';
import { StartEdit } from '../root-store/shopping-list-store/actions/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients : Observable<{ ingredients : Ingredient[] }>;
  ingredientsSubscription : Subscription
  constructor(private store : Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  onEditIngredient(index : number) {
    // this.shoppingListService.startedEditingIngredient.next(index); ----> recipe-book
    //this.store.dispatch(new ShoppingListActions.StartEdit(index));  ----> recipes-book-ngrx(old syntax)
    this.store.dispatch(StartEdit({index})); // --------------------------> recipes-book-ngrx(new syntax)
  }
}
