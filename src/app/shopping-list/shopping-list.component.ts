import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/Ingredient.model';
import {Store} from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

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
    // this.shoppingListService.startedEditingIngredient.next(index)
    this.store.dispatch(new ShoppingListActions.StartEdit(index))
  }

}
