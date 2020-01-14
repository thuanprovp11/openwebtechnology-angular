import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  selectedItem = new Subject<number>();
  ingredients: Ingredient[] = [{name: '1', amount: 12}, {name: '2', amount: 12}, {name: '3', amount: 1}];
  defaultIngredient: Ingredient = {name: '', amount: 0};

  constructor() {
  }

  getIngredients() {
    return this.ingredients;
  }

  getIngredientById(id: number) {
    if (id >= this.ingredients.length) {
      return this.defaultIngredient;
    } else {
      return this.ingredients[id];
    }
  }

  addNewIngredient(ingredientData: Ingredient) {
    this.ingredients.push(ingredientData);
  }

  onSelectedItem(id: number) {
    this.selectedItem.next(id);
  }

  onUpdateIngredient(id: number, newIngredient: Ingredient) {
    this.ingredients[id] = newIngredient;
  }

  onRemoveIngredient(id: number) {
    console.log(id, this.ingredients);
    this.ingredients.splice(id, 1);
  }
}
