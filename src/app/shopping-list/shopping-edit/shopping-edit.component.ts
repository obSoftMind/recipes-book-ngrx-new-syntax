import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/Ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild('f', {static: true}) slForm : NgForm;
  editedIngredient : Ingredient;
  subscription : Subscription;
  editMode = false;
 
  constructor(private store : Store<fromShoppingList.AppState>) {}

  ngOnInit(): void {
    this.subscription=  this.store.select('shoppingList').subscribe(
      (stateData) => {
        if(stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedIngredient = stateData.editedIngredient;
          this.slForm.setValue({
            'name': this.editedIngredient.name,
            'amount': this.editedIngredient.amount
          })
        }else{
          this.editMode= false
        }
      }
    )
  }
  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      //this.shoppingListService.updateIngredient(newIngredient, this.editedIngredientIndex)
      this.store.dispatch(new  ShoppingListActions.UpdateIngredient(newIngredient));
    }else {
      // this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient))
    }
    this.editMode = false;
   this.slForm.reset();
  }

  onDeleteIngredient(){
    // this.shoppingListService.deleteIngredient(this.editedIngredientIndex);
    this.store.dispatch(new  ShoppingListActions.DeleteIngredient())
    this.onClearItem();
  }

  onClearItem(){
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  ngOnDestroy(){
    if(this.subscription !== null) {
      this.subscription.unsubscribe();
      this.store.dispatch(new ShoppingListActions.StopEdit());
    }
  }
}
