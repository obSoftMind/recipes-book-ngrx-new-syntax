import { Ingredient } from "../../shared/Ingredient.model";
import * as ShoppingListActions from './shopping-list.actions';


export interface ShoppingListState {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex : number;
}

export interface AppState {
  shoppingList : ShoppingListState
}

const initialState : ShoppingListState = {
  ingredients:  [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
}

export function shoppingListReducer(state:ShoppingListState = initialState, action: ShoppingListActions.ShoppingListActions){
  switch (action.type){
    case ShoppingListActions.ADD_INGREDIENT : 
      return {
        ...state,
        ingredients : [ ...state.ingredients, action.payload]
      }

    case ShoppingListActions.ADD_INGREDIENTS : 
      return {
        ...state,
        ingredients : [...state.ingredients, ...action.payload]
      }

    case ShoppingListActions.UPDATE_INGREDIENT : 
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      }
      const updatedIngredients = [ ...state.ingredients  ];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients : updatedIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      }

    case ShoppingListActions.DELETE_INGREDIENT : 
      return {
        ...state,
        ingredients: state.ingredients.filter( (ig, igIndex) => {
          return igIndex !== state.editedIngredientIndex
        }),
        editedIngredient: null,
        editedIngredientIndex: -1
      }
    case ShoppingListActions.START_EDIT : 
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient:  {...state.ingredients[action.payload]},
      }

    case ShoppingListActions.STOP_EDIT : 
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      }
    default:
      return state;
  }
}

