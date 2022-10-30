import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesResolverService } from "./recipes-resolver.service";
import { RecipesComponent } from "./recipes.component";

const recipesRoute: Routes = [
  { path:'',  component:RecipesComponent, canActivate:[AuthGuard], children:[
      {path:'' , component: RecipeStartComponent},
      {path:'new', component:RecipeEditComponent},
      {path:':id' , component: RecipeDetailComponent, resolve: [RecipesResolverService]},
      {path:':id/edit' , component: RecipeEditComponent, resolve: [RecipesResolverService]}
    ] 
  },
]
@NgModule({
  imports:[RouterModule.forChild(recipesRoute)],
  exports:[RouterModule]
})
export class RecipesRootingModule {

}