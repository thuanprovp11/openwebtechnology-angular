import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../../recipe.model';
import {RecipesService} from '../../../shared-service/recipes.service';
import {Subscription} from 'rxjs';
import {DataStorageService} from '../../../shared-service/data-storage.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipesSubscribe: Subscription;

  constructor(private recipeService: RecipesService, private dataStorageService: DataStorageService) {
  }

  ngOnInit() {
    this.dataStorageService.onFetchRecipes().subscribe();
    this.recipesSubscribe = this.recipeService.recipesBinding.subscribe((data) => {
      this.recipes = data;
    });
  }

  ngOnDestroy(): void {
    this.recipesSubscribe.unsubscribe();
  }
}
