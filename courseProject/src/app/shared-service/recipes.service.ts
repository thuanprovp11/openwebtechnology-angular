import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from '../recipes/recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  defaultRecipe: Recipe = {
    name: '',
    description: '',
    imageURL: '',
    ingredients: []
  };
  recipesBinding = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   {
  //     name: 'phở',
  //     description: 'món ăn truyền thống của người việt nam',
  //     imageURL: 'http://tapchicongthuong.vn/images/19/6/6/khi-nao-an-pho-ngon-nhat.jpg',
  //     ingredients: [new Ingredient('meat', 1), new Ingredient('noddle', 20)]
  //   },
  //   {
  //     name: 'bún thịt nướng',
  //     description: 'món ăn phổ biến của người miền trung',
  //     imageURL: 'https://img.taste.com.au/-yDJ_2Dl/taste/2016/11/vietnamese-recipes-116939-1.jpg',
  //     ingredients: [new Ingredient('meat', 4), new Ingredient('noddle', 15), new Ingredient('chill', 2)]
  //   },
  //   {
  //     name: 'cơm tấm',
  //     description: 'cơm ngon ăn mỗi ngày',
  //     imageURL: 'https://img-global.cpcdn.com/recipes/a9b651b21ea75cd5/1200x630cq70/photo.jpg',
  //     ingredients: [new Ingredient('rice', 34), new Ingredient('meat', 5)]
  //   }];
  private recipes: Recipe[] = [];

  constructor() {
  }

  getRecipes() {
    return this.recipes;
  }

  assignRecipes(newRecipes: Recipe[]) {
    this.recipes = newRecipes;
    this.recipesBinding.next(this.recipes);
  }

  getRecipeById(id: number) {
    if (id >= this.recipes.length) {
      return this.defaultRecipe;
    } else {
      return this.recipes[id];
    }
  }

  addNewRecipe(recipe: Recipe) {
    console.log(recipe);
    this.recipes.push(recipe);
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
  }
}
