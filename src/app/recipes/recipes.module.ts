import { NgModule } from "@angular/core";
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RecipesComponent } from "./recipes.component";
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { SharedModule } from "../shared/shared.module";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RouterModule } from "@angular/router";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesRootingModule } from "./recipes-routing.module";

@NgModule({
    declarations:[
        RecipesComponent, 
        RecipeListComponent, 
        RecipeItemComponent, 
        RecipeDetailComponent,
        RecipeStartComponent,
        RecipeEditComponent
       ],
    imports:[
        HttpClientModule,
        RouterModule,
        FormsModule,    
        ReactiveFormsModule,
        RecipesRootingModule,
        SharedModule
    ],
    providers:[]
})
export class RecipesModule {

}