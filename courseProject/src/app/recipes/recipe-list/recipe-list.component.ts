import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipesService} from '../../shared-service/recipes.service';
import {ActivatedRoute, Router, Routes} from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  constructor(private recipesService: RecipesService, private route: Router, private router: ActivatedRoute) {
  }

  ngOnInit() {
  }

  onSelectRecipe(id) {
    // this.recipesService.getRecipeSelect(recipesSelected);
    this.route.navigate([id], {relativeTo: this.router});
  }
}
