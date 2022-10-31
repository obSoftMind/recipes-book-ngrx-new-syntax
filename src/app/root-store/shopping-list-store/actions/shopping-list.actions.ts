import { createAction, props } from "@ngrx/store";
import { Ingredient } from "src/app/shared/Ingredient.model";


export const AddIngredient = createAction('[Shopping list] Add Ingredient', props<{ingredient : Ingredient}>());
export const AddIngredients = createAction('[Shopping list] Add Ingredients',props<{ingredients : Ingredient[]}>());
export const UpdateIngredient = createAction('[Shopping list] Update Ingredient',props<{ingredient : Ingredient}>());
export const DeleteIngredient = createAction('[Shopping list] Delete Ingredient');
export const StartEdit = createAction('[Shopping list] Start Edit',props<{index: number}>())
export const StopEdit = createAction('[Shopping list] Stop edit');



