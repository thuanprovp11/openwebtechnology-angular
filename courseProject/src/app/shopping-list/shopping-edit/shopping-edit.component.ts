import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ShoppingListService} from '../../shared-service/shopping-list.service';
import {NgForm} from '@angular/forms';
import {Ingredient} from '../../shared/ingredient.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  followSelectedItem: Subscription;
  editedItemIndex: number;
  editMode = false;
  @ViewChild('myForm', {static: true}) myForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.followSelectedItem = this.shoppingListService.selectedItem.subscribe((id: number) => {
      this.editedItemIndex = id;
      this.editMode = true;
      const data = this.shoppingListService.getIngredientById(id);
      this.myForm.setValue({
        name: data.name,
        amount: data.amount
      });
    });
  }

  ngOnDestroy(): void {
    this.followSelectedItem.unsubscribe();
  }

  addNewIngredient() {
    if (this.myForm.invalid) {
      alert('field not empty');
    } else {
      if (this.editMode) {
        const newIngredient: Ingredient = {name: this.myForm.value.name, amount: this.myForm.value.amount};
        this.shoppingListService.onUpdateIngredient(this.editedItemIndex, newIngredient);
      } else {
        this.shoppingListService.addNewIngredient({name: this.myForm.value.name, amount: this.myForm.value.amount});
      }
    }
  }

  onClearForm() {
    this.myForm.reset();
    this.editMode = false;
  }

  onDeleteIngredient() {
    this.shoppingListService.onRemoveIngredient(this.editedItemIndex);
    this.onClearForm();
  }

}
