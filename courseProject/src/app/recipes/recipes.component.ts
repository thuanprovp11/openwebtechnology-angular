import {Component, OnInit} from '@angular/core';
import {Recipe} from './recipe.model';
import {RecipesService} from '../shared-service/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
