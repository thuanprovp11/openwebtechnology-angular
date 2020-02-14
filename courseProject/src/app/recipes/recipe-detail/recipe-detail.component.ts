import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Recipe} from '../recipe.model';
import {ShoppingListService} from '../../shared-service/shopping-list.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipesService} from '../../shared-service/recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  currentRecipeDetail: Recipe;
  currentRecipeId: number;
  @ViewChild('source', {static: true}) Element: ElementRef;
  @ViewChild('follow', {static: true}) onShow: ElementRef;

  constructor(private rederer: Renderer2, private shoppingListService: ShoppingListService,
              private router: ActivatedRoute, private recipeService: RecipesService, private route: Router) {
  }

  ngOnInit() {
    this.currentRecipeDetail = this.recipeService.getRecipeById(+this.router.snapshot.params.id);
    console.log(this.currentRecipeDetail);
    this.router.params.subscribe((params: Params) => {
      this.currentRecipeId = +params.id;
      this.currentRecipeDetail = this.recipeService.getRecipeById(+params.id);
    });

  }

  onShowMenu() {
    if (!(this.Element.nativeElement as HTMLElement).classList.contains('show')) {
      this.rederer.addClass(this.onShow.nativeElement, 'show');
    } else {
      this.rederer.removeClass(this.onShow.nativeElement, 'show');
    }
  }

  onAddToShoppingList(ingredients) {
    console.log(ingredients);
    for (const ingredient of ingredients) {
      this.shoppingListService.addNewIngredient(ingredient);
    }
  }

  onEditRecipe() {
    this.route.navigate(['edit'], {queryParamsHandling: 'preserve', relativeTo: this.router});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.currentRecipeId);
    this.route.navigate(['../'], {relativeTo: this.router});
  }
}
