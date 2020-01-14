import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Recipe} from '../recipe.model';
import {RecipesService} from '../../shared-service/recipes.service';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {DataStorageService} from '../../shared-service/data-storage.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  currentRecipe: Recipe;
  allowEdit = false;
  recipeForm: FormGroup;
  currentId: number;

  constructor(private routerActive: ActivatedRoute,
              private recipeService: RecipesService,
              private router: Router,
              private dataStorageService: DataStorageService) {
  }

  ngOnInit() {
    console.log(this.routerActive.snapshot.params.id);
    this.routerActive.params.subscribe((params: Params) => {
      this.currentId = +params.id;
      this.currentRecipe = this.recipeService.getRecipeById(+this.currentId);
      this.allowEdit = (params.id != null);
      console.log(this.allowEdit, this.currentId);
      this.initForm();
    });
  }

  private initForm() {
    const defaultField = {
        name: '',
        imageURL: '',
        description: '',
        ingredients: new FormArray([])
      }
    ;
    if (this.allowEdit) {
      defaultField.name = this.currentRecipe.name;
      defaultField.imageURL = this.currentRecipe.imageURL;
      defaultField.description = this.currentRecipe.description;
      for (const ing of this.currentRecipe.ingredients) {
        defaultField.ingredients.push(new FormGroup({
          name: new FormControl(ing.name, Validators.required),
          amount: new FormControl(ing.amount, [Validators.required, Validators.min(1)])
        }));
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(defaultField.name, Validators.required),
      imageURL: new FormControl(defaultField.imageURL, Validators.required),
      description: new FormControl(defaultField.description, Validators.required),
      ingredients: defaultField.ingredients,
    });
  }

  onAddNewIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.min(1)])
    }));
  }

  getControl() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onRemoveIngredient(i) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(i);
  }

  onSubmit() {
    console.log(this.recipeForm);
    if (this.allowEdit) {
      this.recipeService.updateRecipe(this.currentId, this.recipeForm.value);
      this.router.navigate(['../'], {relativeTo: this.routerActive});
    } else {
      // this.dataStorageService.onSaveRecipe(this.recipeForm.value).subscribe((data) => {
      //   console.log('success');
      // });
      this.recipeService.addNewRecipe(this.recipeForm.value);
      this.router.navigate(['../'], {relativeTo: this.routerActive});
    }
  }

}
