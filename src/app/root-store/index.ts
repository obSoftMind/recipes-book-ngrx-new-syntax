import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as fromShoppingListState from './shopping-list-store/reducers/shopping-list.reducer'

export interface AppState {
  shoppingList : fromShoppingListState.ShoppingListState
}

export const shoppingListReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingListState.shoppingListReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [debug] : [];

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    /* eslint no-console: 0 */
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}