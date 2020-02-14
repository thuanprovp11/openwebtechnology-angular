import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Recipe} from '../recipes/recipe.model';
import {RecipesService} from './recipes.service';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {BehaviorSubject, observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipesService: RecipesService, private authService: AuthService) {
  }

  onSaveNewRecipe(recipe: Recipe) {
    // console.log(recipe);
    return this.http.post('https://recipes-7d61d.firebaseio.com/recipes.json', recipe);
  }

  onSaveAllRecipes() {
    const recipes = this.recipesService.getRecipes();
    this.http.put('https://recipes-7d61d.firebaseio.com/recipes.json', recipes).subscribe(response => {
      console.log(response);
    });
  }

  onFetchRecipes() {
    // take() thiết lập chỉ subscribe (number) số lần. Sau khi nhận đủ số lần tự động unsubscribe
    // exhaustMap khi bạn muốn return 1 obsaverble với điều kiện observable đầu tiên phải chạy xong
    return this.http.get<Recipe[]>('https://recipes-7d61d.firebaseio.com/recipes.json',
    ).pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }),
      tap(response => {
        console.log(response);
        this.recipesService.assignRecipes(response);
      })
    );
  }
}
