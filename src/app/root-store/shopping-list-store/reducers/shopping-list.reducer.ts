import { createReducer, on } from "@ngrx/store";
import { Ingredient } from "../../../shared/Ingredient.model";

import * as ShoppingListActions from '../../shopping-list-store/actions/shopping-list.actions';

export const shoppingListFeatureKey = 'shoppingList';

export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex : number;
}


export const initialState : ShoppingListState = {
  ingredients:  [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
}

export const shoppingListReducer = createReducer(
  initialState,
  on(ShoppingListActions.AddIngredient,(state, action)=> ({ ...state, ingredients: state.ingredients.concat(action.ingredient) }) ),

  on(ShoppingListActions.AddIngredients,(state, action)=> {
    return {
      ...state,
      ingredients : [...state.ingredients, ...action.ingredients]
    }
  }),

  on(ShoppingListActions.UpdateIngredient,(state, action)=> {
    const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.ingredient
      }
      const updatedIngredients = [ ...state.ingredients  ];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients : updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      }
  }),

  on(ShoppingListActions.DeleteIngredient,(state, action)=> {
    return {
      ...state,
      ingredients: state.ingredients.filter( (ig, igIndex) => {
        return igIndex !== state.editedIngredientIndex
      }),
      editedIngredient: null,
      editedIngredientIndex: -1
    }
  }),

  on(ShoppingListActions.StartEdit,(state, action)=> {
    return {
      ...state,
      editedIngredientIndex: action.index,
      editedIngredient:  {...state.ingredients[action.index]},
    }
  }),

  on(ShoppingListActions.StopEdit,(state, action)=> {
    return {
      ...state,
      editedIngredient: null,
      editedIngredientIndex: -1
    }
  }),

)
// export function shoppingListReducer(shoppingListState: State | undefined, shoppingListAction: Action) {
//   return createReducer(
//     initialState,
//     on(ShoppingListActions.addIngredient, (state, action) => ({ ...state, ingredients: state.ingredients.concat(action.ingredient) })),
//     on(ShoppingListActions.addIngredients, (state, action) => ({ ...state, ingredients: state.ingredients.concat(...action.ingredients) })),
//     on(ShoppingListActions.updateIngredient, (state, action) => ({ ...state, editIndex: -1, ingredients: state.ingredients.map((ingredient, index) => index === state.editIndex ? { ...action.ingredient } : ingredient) })),
//     on(ShoppingListActions.deleteIngredient, state => ({ ...state, editIndex: -1, ingredients: state.ingredients.filter((ingredient, index) => index !== state.editIndex) })),
//     on(ShoppingListActions.startEdit, (state, action) => ({ ...state, editIndex: action.index })),
//     on(ShoppingListActions.stopEdit, state => ({ ...state, editIndex: -1 }))
//   )(shoppingListState, shoppingListAction);
// }